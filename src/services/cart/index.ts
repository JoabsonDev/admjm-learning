import { FIREBASE_ERROR_MESSAGES } from "@constants/firebase-error-messages"
import { courseService } from "@services/course"
import { db } from "@services/firebase-config"
import { FirebaseError } from "firebase/app"
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore"

const { getCoursesByIds } = courseService

export const cartService = {
  /**
   * Adiciona um curso ao carrinho do usuário.
   * @param {string} userId - O ID do usuário.
   * @param {string} courseId - O ID do curso a ser adicionado ao carrinho.
   * @returns {Promise<void>} Uma Promise que resolve quando o curso for adicionado ao carrinho.
   * @throws {FirebaseError} Se ocorrer um erro ao adicionar o curso ao carrinho.
   */
  async addItemToCart(userId: string, courseId: string): Promise<void> {
    try {
      const userDocRef = doc(db, "users", userId)
      await updateDoc(userDocRef, {
        cart: arrayUnion(courseId)
      })
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(
          FIREBASE_ERROR_MESSAGES[
            error.code as keyof typeof FIREBASE_ERROR_MESSAGES
          ] || `Erro ao adicionar item ao carrinho: ${error.message}`
        )
      }
      throw new Error("Erro desconhecido ao adicionar item ao carrinho.")
    }
  },

  /**
   * Remove um curso do carrinho do usuário.
   * @param {string} userId - O ID do usuário.
   * @param {string} courseId - O ID do curso a ser removido do carrinho.
   * @returns {Promise<void>} Uma Promise que resolve quando o curso for removido do carrinho.
   * @throws {FirebaseError} Se ocorrer um erro ao remover o curso do carrinho.
   */
  async removeItemFromCart(userId: string, courseId: string): Promise<void> {
    try {
      const userDocRef = doc(db, "users", userId)
      await updateDoc(userDocRef, {
        cart: arrayRemove(courseId)
      })
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(
          FIREBASE_ERROR_MESSAGES[
            error.code as keyof typeof FIREBASE_ERROR_MESSAGES
          ] || `Erro ao remover item do carrinho: ${error.message}`
        )
      }
      throw new Error("Erro desconhecido ao remover item do carrinho.")
    }
  },

  /**
   * Recupera o carrinho do usuário.
   * @param {string} userId - O ID do usuário.
   * @returns {Promise<string[]>} Uma Promise que resolve para uma lista de IDs dos cursos no carrinho.
   * @throws {FirebaseError} Se ocorrer um erro ao recuperar o carrinho do usuário.
   */
  async getCart(userId: string): Promise<string[]> {
    try {
      const userDocRef = doc(db, "users", userId)
      const userDoc = await getDoc(userDocRef)

      if (!userDoc.exists()) {
        throw new Error("Usuário não encontrado.")
      }

      const userData = userDoc.data()
      return userData.cart || []
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(
          FIREBASE_ERROR_MESSAGES[
            error.code as keyof typeof FIREBASE_ERROR_MESSAGES
          ] || `Erro ao recuperar o carrinho: ${error.message}`
        )
      }
      throw new Error("Erro desconhecido ao recuperar o carrinho.")
    }
  },

  /**
   * Recupera os detalhes dos cursos no carrinho do usuário.
   * @param {string} userId - O ID do usuário.
   * @returns {Promise<Course[]>} Uma Promise que resolve para uma lista de cursos no carrinho.
   * @throws {Error} Se ocorrer um erro durante a recuperação dos cursos do carrinho.
   */
  async getCartCourses(userId: string): Promise<Course[]> {
    try {
      const cart = await cartService.getCart(userId)

      if (!cart || cart.length === 0) return []

      return await getCoursesByIds(cart)
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  }
}
