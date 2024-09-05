import { db } from "@services/firebase-config"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc
} from "firebase/firestore"

export const lectureService = {
  /**
   * Recupera todas as palestras de uma lição específica em um curso, com paginação.
   * @param {string} courseId - O ID do curso ao qual a lição pertence.
   * @param {string} lessonId - O ID da lição cujas palestras devem ser recuperadas.
   * @param {number} pageLimit - O número máximo de palestras a serem recuperadas por página.
   * @param {DocumentSnapshot | null} lastVisible - A última palestra visível da página anterior para paginação.
   * @returns {Promise<ResponseWithPagination<"lectures", Lecture>>} Uma Promise que resolve para uma lista de palestras paginada.
   * @throws {Error} Se ocorrer um erro durante a recuperação das palestras.
   */
  async getLectures(
    courseId: string,
    lessonId: string,
    pageLimit: number = 10,
    lastVisible: DocumentSnapshot | null = null
  ): Promise<ResponseWithPagination<"lectures", Lecture>> {
    try {
      const lecturesRef = collection(
        db,
        "course",
        courseId,
        "lessons",
        lessonId,
        "lectures"
      )

      let lecturesQuery = query(lecturesRef, orderBy("title"), limit(pageLimit))

      if (lastVisible) {
        lecturesQuery = query(lecturesQuery, startAfter(lastVisible))
      }

      const lecturesSnapshot = await getDocs(lecturesQuery)
      const newLastVisible =
        lecturesSnapshot.docs[lecturesSnapshot.docs.length - 1]

      const lectures = lecturesSnapshot.docs.map((doc) => {
        const lectureData = doc.data() as Lecture
        lectureData.id = doc.id // Adiciona o ID da palestra
        return lectureData
      })

      const snapshot = await getCountFromServer(lecturesRef)
      const total = snapshot.data().count

      const pagination = {
        total,
        lastVisible: newLastVisible,
        pageLimit
      }

      return {
        lectures,
        pagination
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Recupera uma palestra específica de uma lição em um curso.
   * @param {string} courseId - O ID do curso ao qual a lição pertence.
   * @param {string} lessonId - O ID da lição que contém a palestra.
   * @param {string} lectureId - O ID da palestra a ser recuperada.
   * @returns {Promise<Lecture>} Uma Promise que resolve para a palestra solicitada.
   * @throws {Error} Se a palestra não for encontrada ou se ocorrer um erro durante a recuperação.
   */
  async getLecture(
    courseId: string,
    lessonId: string,
    lectureId: string
  ): Promise<Lecture> {
    try {
      const lectureRef = doc(
        db,
        "course",
        courseId,
        "lessons",
        lessonId,
        "lectures",
        lectureId
      )
      const lectureSnapshot = await getDoc(lectureRef)

      if (!lectureSnapshot.exists()) {
        throw new Error("Palestra não encontrada")
      }

      return { ...lectureSnapshot.data(), id: lectureSnapshot.id } as Lecture
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Cria uma nova palestra para uma lição específica em um curso.
   * @param {string} courseId - O ID do curso ao qual a lição pertence.
   * @param {string} lessonId - O ID da lição para a qual a palestra será criada.
   * @param {Partial<Lecture>} data - Dados da palestra a ser criada.
   * @returns {Promise<Lecture>} Uma Promise que resolve para a palestra criada.
   * @throws {Error} Se o título ou a duração da palestra não forem fornecidos ou se ocorrer um erro durante a criação.
   */
  async createLecture(
    courseId: string,
    lessonId: string,
    data: Partial<Lecture>
  ): Promise<Lecture> {
    if (!data.title || !data.duration) {
      throw new Error("O título e a duração da palestra são obrigatórios")
    }

    try {
      const lecturesRef = collection(
        db,
        "course",
        courseId,
        "lessons",
        lessonId,
        "lectures"
      )
      const response = await addDoc(lecturesRef, data)
      return { ...data, id: response.id } as Lecture
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Atualiza uma palestra existente em uma lição de um curso.
   * @param {string} courseId - O ID do curso ao qual a lição pertence.
   * @param {string} lessonId - O ID da lição que contém a palestra.
   * @param {string} lectureId - O ID da palestra a ser atualizada.
   * @param {Partial<Lecture>} data - Dados da palestra a serem atualizados.
   * @returns {Promise<Lecture>} Uma Promise que resolve para a palestra atualizada.
   * @throws {Error} Se ocorrer um erro durante a atualização da palestra.
   */
  async updateLecture(
    courseId: string,
    lessonId: string,
    lectureId: string,
    data: Partial<Lecture>
  ): Promise<Lecture> {
    if (!courseId || !lessonId || !lectureId) {
      throw new Error("O ID do curso, da lição e da palestra são obrigatórios")
    }

    delete data.lessonId
    delete data.id

    const lectureRef = doc(
      db,
      "course",
      courseId,
      "lessons",
      lessonId,
      "lectures",
      lectureId
    )
    console.log(lectureRef)

    try {
      await updateDoc(lectureRef, data)
      return { ...data, id: lectureId } as Lecture
    } catch (error) {
      console.error("Erro ao atualizar a palestra:", error)
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Deleta uma palestra específica de uma lição em um curso.
   * @param {string} courseId - O ID do curso ao qual a lição pertence.
   * @param {string} lessonId - O ID da lição que contém a palestra.
   * @param {string} lectureId - O ID da palestra a ser deletada.
   * @returns {Promise<string>} Uma Promise que resolve para o ID da palestra deletada.
   * @throws {Error} Se ocorrer um erro durante a exclusão da palestra.
   */
  async deleteLecture(
    courseId: string,
    lessonId: string,
    lectureId: string
  ): Promise<string> {
    if (!courseId || !lessonId || !lectureId) {
      throw new Error("O ID do curso, da lição e da palestra são obrigatórios")
    }

    const lectureRef = doc(
      db,
      "course",
      courseId,
      "lessons",
      lessonId,
      "lectures",
      lectureId
    )

    try {
      await deleteDoc(lectureRef)
      return lectureId
    } catch (error) {
      console.error("Erro ao deletar a palestra:", error)
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  }
}
