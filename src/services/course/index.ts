import { calculateTotalDuration } from "@helpers/calculate-total-duration"
import { formatDuration } from "@helpers/formate-duration"
import { db, storage } from "@services/firebase-config"
import { lessonService } from "@services/lesson"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where
} from "firebase/firestore"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable
} from "firebase/storage"

const { getLessons } = lessonService

export const courseService = {
  /**
   * Recupera todos os cursos do Firestore com filtros opcionais e ordenação opcional.
   * @param {string} titleFilter - Texto para filtrar o título do curso (semelhante ao SQL LIKE).
   * @param {("asc" | "desc")} [order] - Define a ordenação pelo título como ascendente ou descendente. Se não for fornecido, não aplica ordenação.
   * @returns {Promise<Course[]>} Uma Promise que resolve para uma lista de cursos com suas lições associadas.
   * @throws {Error} Se ocorrer um erro durante a recuperação dos cursos ou das lições.
   */
  async getCourses(
    titleFilter: string = "",
    order: "asc" | "desc" | null = null
  ): Promise<Course[]> {
    try {
      // Cria a referência para a coleção de cursos
      const coursesRef = collection(db, "course")

      // Inicializa a query com possíveis filtros
      let coursesQuery = query(coursesRef)

      if (titleFilter) {
        // Aplica o filtro semelhante ao LIKE do SQL
        coursesQuery = query(
          coursesRef,
          where("title", ">=", titleFilter),
          where("title", "<=", titleFilter + "\uf8ff")
        )
      }

      // Aplica a ordenação, se especificada
      if (order) {
        coursesQuery = query(coursesQuery, orderBy("title", order))
      }

      // Executa a query
      const coursesSnapshot = await getDocs(coursesQuery)

      const courses = await Promise.all(
        coursesSnapshot.docs.map(async (doc) => {
          const courseData = doc.data() as Course
          courseData.id = doc.id

          // Carrega as lições associadas ao curso
          const lessons = await getLessons(doc.id)
          const duration = lessons.reduce((acc, { lectures }) => {
            acc = acc + calculateTotalDuration(lectures).total
            return acc
          }, 0)

          courseData.duration = formatDuration(duration, "hh:mm:ss")

          return courseData
        })
      )

      return courses
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Recupera um curso específico pelo ID do Firestore e carrega as lições associadas a ele.
   * @param {string} id - O ID do curso a ser recuperado.
   * @returns {Promise<Course>} Uma Promise que resolve para o curso com suas lições associadas.
   * @throws {Error} Se o curso não for encontrado ou se ocorrer um erro durante a recuperação.
   */
  async getCourse(id: string): Promise<Course> {
    try {
      const courseRef = doc(db, "course", id)
      const courseSnapshot = await getDoc(courseRef)

      if (!courseSnapshot.exists()) {
        throw new Error("Curso não encontrado")
      }

      const courseData = courseSnapshot.data() as Course

      // Carrega as lições associadas ao curso
      const lessons = await getLessons(id)
      courseData.lessons = lessons

      return courseData
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Cria um novo curso e, se uma miniatura for fornecida, faz o upload da miniatura para o Firebase Storage.
   * @param {Partial<Course>} data - Dados do curso a ser criado, incluindo título, descrição e preço.
   * @param {function(number):void} [onProgress] - Função opcional que é chamada com o progresso do upload da miniatura.
   * @returns {Promise<string|undefined>} Uma Promise que resolve para o ID do curso criado, ou undefined se não houver dados suficientes.
   * @throws {Error} Se ocorrer um erro durante a criação do curso ou o upload da miniatura.
   */
  async createCourse(
    data: Partial<Course>,
    onProgress?: (progress: number) => void
  ): Promise<string | undefined> {
    const courseRef = collection(db, "course")

    if (!data.title && !data.description && !data.price) return

    const thumbnail = (data.thumbnail as unknown as FileList)?.[0]

    try {
      let thumbnailData: { url: string; ref: string } | null = null

      if (thumbnail) {
        // Adiciona a miniatura ao Firebase Storage
        const storageRef = ref(storage, `images/${thumbnail.name}`)
        const uploadThumbnail = uploadBytesResumable(storageRef, thumbnail)

        await new Promise<void>((resolve, reject) => {
          uploadThumbnail.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100

              if (onProgress) onProgress(progress)
            },
            (error) => {
              console.error("Erro ao fazer upload da miniatura:", error)
              reject(error)
            },
            async () => {
              try {
                // Obtém o caminho e a URL da miniatura no Firebase Storage
                const thumbnailRef = uploadThumbnail.snapshot.ref.fullPath
                const thumbnailUrl = await getDownloadURL(
                  uploadThumbnail.snapshot.ref
                )
                thumbnailData = {
                  url: thumbnailUrl,
                  ref: thumbnailRef
                }
                resolve()
              } catch (error) {
                reject(
                  new Error(
                    error instanceof Error ? error.message : String(error)
                  )
                )
              }
            }
          )
        })
      }

      // Adiciona o curso com os dados da miniatura
      const response = await addDoc(courseRef, {
        ...data,
        thumbnail: thumbnailData
      })

      return response.id
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Atualiza um curso existente e, se uma nova miniatura for fornecida, faz o upload da nova miniatura para o Firebase Storage.
   * @param {string} id - O ID do curso a ser atualizado.
   * @param {Partial<Course>} data - Dados do curso a serem atualizados.
   * @param {function(number):void} [onProgress] - Função opcional que é chamada com o progresso do upload da nova miniatura.
   * @returns {Promise<void>} Uma Promise que resolve quando a atualização for concluída.
   * @throws {Error} Se ocorrer um erro durante a atualização do curso ou o upload da miniatura.
   */
  async updateCourse(
    id: string,
    data: Partial<Course>,
    onProgress?: (progress: number) => void
  ): Promise<void> {
    if (!id) return

    const courseRef = doc(db, "course", id)

    try {
      const thumbnail =
        typeof data.thumbnail === "string"
          ? data.thumbnail
          : (data.thumbnail as unknown as FileList)?.[0]

      if (thumbnail && thumbnail instanceof File) {
        // Se houver uma nova miniatura, faça o upload
        const storageRef = ref(storage, `images/${thumbnail.name}`)
        const uploadThumbnail = uploadBytesResumable(storageRef, thumbnail)

        await new Promise<void>((resolve, reject) => {
          uploadThumbnail.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              if (onProgress) onProgress(progress)
            },
            (error) => {
              console.log(error)
              reject(error)
            },
            async () => {
              try {
                // Obtém o caminho e a URL da nova miniatura no Firebase Storage
                const thumbnailRef = uploadThumbnail.snapshot.ref.fullPath
                const thumbnailUrl = await getDownloadURL(
                  uploadThumbnail.snapshot.ref
                )
                const thumbnailData = {
                  url: thumbnailUrl,
                  ref: thumbnailRef
                }
                // Atualiza o curso com o novo caminho e URL da miniatura
                await updateDoc(courseRef, {
                  ...data,
                  thumbnail: thumbnailData
                })
                resolve()
              } catch (error) {
                reject(
                  new Error(
                    error instanceof Error ? error.message : String(error)
                  )
                )
              }
            }
          )
        })
      } else {
        await updateDoc(courseRef, data)
      }
    } catch (error) {
      console.error("Erro ao atualizar o curso:", error)
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Deleta um curso do Firestore e, se houver uma miniatura associada, remove-a do Firebase Storage.
   * @param {string} id - O ID do curso a ser deletado.
   * @returns {Promise<string>} Uma Promise que resolve para o ID do curso deletado.
   * @throws {Error} Se ocorrer um erro durante a exclusão do curso ou da miniatura.
   */
  async deleteCourse(id: string): Promise<string> {
    if (!id) {
      throw new Error("ID do curso não fornecido") // Lança um erro se o ID não for fornecido
    }

    const courseRef = doc(db, "course", id)

    try {
      const courseSnapshot = await getDoc(courseRef)

      if (!courseSnapshot.exists()) {
        throw new Error("Curso não encontrado") // Lança um erro se o curso não for encontrado
      }

      const courseData = courseSnapshot.data() as Course
      const thumbnailRef = courseData.thumbnail?.ref

      await deleteDoc(courseRef) // Deleta o curso do Firestore

      if (thumbnailRef) {
        const storageRef = ref(storage, thumbnailRef)
        await deleteObject(storageRef) // Deleta a miniatura do Firebase Storage, se existir
      }

      return id // Retorna o ID do curso deletado (resolvido como uma Promise)
    } catch (error) {
      console.error("Erro ao deletar o curso:", error)
      throw new Error(error instanceof Error ? error.message : String(error)) // Rejeita a Promise com um erro
    }
  },
  /**
   * Recupera uma lista de cursos com base nos IDs fornecidos.
   * @param {string[]} courseIds - Os IDs dos cursos a serem recuperados.
   * @returns {Promise<Course[]>} Uma Promise que resolve para uma lista de cursos.
   * @throws {Error} Se ocorrer um erro durante a recuperação dos cursos.
   */
  async getCoursesByIds(courseIds: string[]): Promise<Course[]> {
    try {
      const coursesRef = collection(db, "course")
      const coursesQuery = query(coursesRef, where("__name__", "in", courseIds))

      const coursesSnapshot = await getDocs(coursesQuery)

      const courses = await Promise.all(
        coursesSnapshot.docs.map(async (doc) => {
          const courseData = doc.data() as Course
          courseData.id = doc.id

          // Carrega as lições associadas ao curso, se necessário
          const lessons = await getLessons(doc.id)
          courseData.lessons = lessons

          return courseData
        })
      )

      return courses
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  }
}
