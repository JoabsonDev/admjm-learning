import { FIREBASE_ERROR_MESSAGES } from "@constants/firebase-error-messages"
import { auth, db } from "@services/firebase-config"
import useAuthStore from "@store/auth"
import { FirebaseError } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  linkWithPopup,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

const provider = new GoogleAuthProvider()
const authStore = useAuthStore.getState()

export const authService = {
  /**
   * Faz login de um usuário com email e senha.
   * @param {string} email - O email do usuário.
   * @param {string} password - A senha do usuário.
   * @returns {Promise<UserCredential>} Uma Promise que resolve para o credencial do usuário autenticado.
   * @throws {FirebaseError} Se ocorrer um erro durante o login.
   */
  async login(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      // Atualiza o estado global com os dados do usuário logado
      authStore.setUser(user)

      // Verifica se a tabela (documento) existe
      const userDocRef = doc(db, "users", user.uid)
      const userDoc = await getDoc(userDocRef)

      if (!userDoc.exists()) {
        // Cria a tabela (documento) com o UID do usuário como ID
        await setDoc(userDocRef, {
          createdAt: new Date()
        })
      }

      return userCredential
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(
          FIREBASE_ERROR_MESSAGES[
            error.code as keyof typeof FIREBASE_ERROR_MESSAGES
          ] || `Erro ao fazer login: ${error.message}`
        )
      }
      throw new Error("Erro desconhecido ao fazer login.")
    }
  },

  /**
   * Registra um novo usuário com email e senha.
   * @param {string} email - O email do usuário.
   * @param {string} password - A senha do usuário.
   * @returns {Promise<UserCredential>} Uma Promise que resolve para o credencial do usuário registrado.
   * @throws {FirebaseError} Se ocorrer um erro durante o registro.
   */
  async register(email: string, password: string): Promise<UserCredential> {
    try {
      return await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(
          FIREBASE_ERROR_MESSAGES[
            error.code as keyof typeof FIREBASE_ERROR_MESSAGES
          ] || `Erro ao registrar usuário: ${error.message}`
        )
      }
      throw new Error("Erro desconhecido ao registrar usuário.")
    }
  },

  /**
   * Envia um email para recuperação de senha.
   * @param {string} email - O email do usuário para o qual o email de recuperação será enviado.
   * @returns {Promise<void>} Uma Promise que resolve quando o email de recuperação for enviado.
   * @throws {FirebaseError} Se ocorrer um erro ao enviar o email de recuperação.
   */
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(
          FIREBASE_ERROR_MESSAGES[
            error.code as keyof typeof FIREBASE_ERROR_MESSAGES
          ] || `Erro ao enviar email de recuperação: ${error.message}`
        )
      }
      throw new Error("Erro desconhecido ao enviar email de recuperação.")
    }
  },

  /**
   * Faz logout do usuário autenticado.
   * @returns {Promise<void>} Uma Promise que resolve quando o logout for concluído.
   * @throws {FirebaseError} Se ocorrer um erro durante o logout.
   */
  async logout(): Promise<void> {
    try {
      await signOut(auth)
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(`Erro ao fazer logout: ${error.message}`)
      }
      throw new Error("Erro desconhecido ao fazer logout.")
    }
  },

  /**
   * Faz login com o Google.
   * @returns {Promise<UserCredential>} Uma Promise que resolve para o credencial do usuário autenticado com o Google.
   * @throws {FirebaseError} Se ocorrer um erro durante o login com o Google.
   */
  async loginWithGoogle(): Promise<UserCredential> {
    try {
      const userCredential = await signInWithPopup(auth, provider)
      const user = userCredential.user

      // Atualiza o estado global com os dados do usuário logado
      authStore.setUser(user)

      // Verifica se a tabela (documento) existe
      const userDocRef = doc(db, "users", user.uid)
      const userDoc = await getDoc(userDocRef)

      if (!userDoc.exists()) {
        // Cria a tabela (documento) com o UID do usuário como ID
        await setDoc(userDocRef, {
          createdAt: new Date()
        })
      }

      return userCredential
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(`Erro ao fazer login com o Google: ${error.message}`)
      }
      throw new Error("Erro desconhecido ao fazer login com o Google.")
    }
  },

  /**
   * Vincula a conta Google ao usuário autenticado.
   * @returns {Promise<void>} Uma Promise que resolve quando a conta for vinculada.
   * @throws {FirebaseError} Se ocorrer um erro durante a vinculação da conta.
   */
  async linkGoogleAccount(): Promise<void> {
    try {
      if (auth.currentUser) {
        await linkWithPopup(auth.currentUser, provider)
      } else {
        throw new Error("Usuário não autenticado.")
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(`Erro ao vincular conta Google: ${error.message}`)
      }
      throw new Error("Erro desconhecido ao vincular conta Google.")
    }
  }
}
