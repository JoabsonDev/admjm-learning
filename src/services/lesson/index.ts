import { calculateTotalDuration } from "@helpers/calculate-total-duration"
import { db } from "@services/firebase-config"
import { lectureService } from "@services/lecture"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc
} from "firebase/firestore"

const { getLectures } = lectureService

export const lessonService = {
  /**
   * Recupera todas as lições de um curso específico e carrega as palestras associadas a cada lição.
   * @param {string} courseId - O ID do curso cujas lições devem ser recuperadas.
   * @returns {Promise<Lesson[]>} Uma Promise que resolve para uma lista de lições com suas palestras associadas.
   * @throws {Error} Se ocorrer um erro durante a recuperação das lições ou das palestras.
   */
  async getLessons(courseId: string): Promise<Lesson[]> {
    try {
      const courseRef = doc(db, "course", courseId)
      const lessonsRef = collection(courseRef, "lessons")
      const lessonsSnapshot = await getDocs(lessonsRef)

      const lessons = await Promise.all(
        lessonsSnapshot.docs.map(async (doc) => {
          const lessonData = doc.data() as Lesson
          lessonData.id = doc.id // Adiciona o ID da lição
          const lectures = await getLectures(courseId, doc.id)
          lessonData.lectures = lectures
          lessonData.duration = calculateTotalDuration(
            lessonData.lectures
          ).formated
          return lessonData
        })
      )

      return lessons
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Recupera uma lição específica de um curso e carrega as palestras associadas a ela.
   * @param {string} courseId - O ID do curso ao qual a lição pertence.
   * @param {string} lessonId - O ID da lição a ser recuperada.
   * @returns {Promise<Lesson>} Uma Promise que resolve para a lição com suas palestras associadas.
   * @throws {Error} Se a lição não for encontrada ou se ocorrer um erro durante a recuperação.
   */
  async getLesson(courseId: string, lessonId: string): Promise<Lesson> {
    try {
      const lessonRef = doc(db, "course", courseId, "lessons", lessonId)
      const lessonSnapshot = await getDoc(lessonRef)

      if (!lessonSnapshot.exists()) {
        throw new Error("Lição não encontrada")
      }

      const lessonData = lessonSnapshot.data() as Lesson
      lessonData.id = lessonSnapshot.id // Adiciona o ID da lição
      const lectures = await getLectures(courseId, lessonId)
      lessonData.lectures = lectures

      return lessonData
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Cria uma nova lição para um curso específico.
   * @param {string} courseId - O ID do curso ao qual a lição será adicionada.
   * @param {Partial<Lesson>} data - Dados da lição a ser criada.
   * @returns {Promise<Lesson>} Uma Promise que resolve para o ID da lição criada.
   * @throws {Error} Se o título da lição não for fornecido ou se ocorrer um erro durante a criação.
   */
  async createLesson(courseId: string, data: Partial<Lesson>): Promise<Lesson> {
    if (!data.title) {
      throw new Error("O título da lição é obrigatório")
    }

    try {
      const lessonsRef = collection(db, "course", courseId, "lessons")
      const response = await addDoc(lessonsRef, data)
      return { ...data, id: response.id } as Lesson
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Atualiza uma lição existente em um curso específico.
   * @param {string} courseId - O ID do curso ao qual a lição pertence.
   * @param {string} lessonId - O ID da lição a ser atualizada.
   * @param {Partial<Lesson>} data - Dados da lição a serem atualizados.
   * @returns {Promise<Lesson>} Uma Promise que resolve para a lição atualizada.
   * @throws {Error} Se ocorrer um erro durante a atualização da lição.
   */
  async updateLesson(
    courseId: string,
    lessonId: string,
    data: Partial<Lesson>
  ): Promise<Lesson> {
    if (!courseId || !lessonId) {
      throw new Error("O ID do curso e da lição são obrigatórios")
    }

    const lessonRef = doc(db, "course", courseId, "lessons", lessonId)

    try {
      await updateDoc(lessonRef, data)
      return { ...data, id: lessonId } as Lesson
    } catch (error) {
      console.error("Erro ao atualizar a lição:", error)
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Deleta uma lição específica de um curso e retorna o ID da lição deletada.
   * @param {string} courseId - O ID do curso ao qual a lição pertence.
   * @param {string} lessonId - O ID da lição a ser deletada.
   * @returns {Promise<string>} Uma Promise que resolve para o ID da lição deletada.
   * @throws {Error} Se ocorrer um erro durante a exclusão da lição.
   */
  async deleteLesson(courseId: string, lessonId: string): Promise<string> {
    if (!courseId || !lessonId) {
      throw new Error("O ID do curso e da lição são obrigatórios")
    }

    const lessonRef = doc(db, "course", courseId, "lessons", lessonId)

    try {
      await deleteDoc(lessonRef)
      return lessonId // Retorna o ID da lição deletada
    } catch (error) {
      console.error("Erro ao deletar a lição:", error)
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  }
}
