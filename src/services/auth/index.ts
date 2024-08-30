import { auth } from "@services/firebase-config"
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

const provider = new GoogleAuthProvider()

export const authService = {
  /**
   * Faz login de um usuário com email e senha.
   * @param {string} email - O email do usuário.
   * @param {string} password - A senha do usuário.
   * @returns {Promise<UserCredential>} Uma Promise que resolve para o credencial do usuário autenticado.
   * @throws {Error} Se ocorrer um erro durante o login.
   */
  async login(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Registra um novo usuário com email e senha.
   * @param {string} email - O email do usuário.
   * @param {string} password - A senha do usuário.
   * @returns {Promise<UserCredential>} Uma Promise que resolve para o credencial do usuário registrado.
   * @throws {Error} Se ocorrer um erro durante o registro.
   */
  async register(email: string, password: string): Promise<UserCredential> {
    try {
      return await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Envia um email para recuperação de senha.
   * @param {string} email - O email do usuário para o qual o email de recuperação será enviado.
   * @returns {Promise<void>} Uma Promise que resolve quando o email de recuperação for enviado.
   * @throws {Error} Se ocorrer um erro ao enviar o email de recuperação.
   */
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Faz logout do usuário autenticado.
   * @returns {Promise<void>} Uma Promise que resolve quando o logout for concluído.
   * @throws {Error} Se ocorrer um erro durante o logout.
   */
  async logout(): Promise<void> {
    try {
      await signOut(auth)
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Faz login com o Google.
   * @returns {Promise<UserCredential>} Uma Promise que resolve para o credencial do usuário autenticado com o Google.
   * @throws {Error} Se ocorrer um erro durante o login com o Google.
   */
  async loginWithGoogle(): Promise<UserCredential> {
    try {
      return await signInWithPopup(auth, provider)
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  },

  /**
   * Vincula a conta Google ao usuário autenticado.
   * @returns {Promise<void>} Uma Promise que resolve quando a conta for vinculada.
   * @throws {Error} Se ocorrer um erro durante a vinculação da conta.
   */
  async linkGoogleAccount(): Promise<void> {
    try {
      if (auth.currentUser) {
        await linkWithPopup(auth.currentUser, provider)
      } else {
        throw new Error("Usuário não autenticado")
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  }
}
