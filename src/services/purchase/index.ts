import { db } from "@services/firebase-config"
import axios from "axios"
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc
} from "firebase/firestore"

// Interface para o carrinho do usuário
type CartItem = Course & {}

/**
 * Função que registra a compra de um usuário, remove os itens do carrinho e
 * cria uma preferência de pagamento no Mercado Pago.
 *
 * @param {string} userId - ID do usuário que está fazendo a compra.
 * @param {CartItem[]} cartItems - Lista de itens no carrinho do usuário.
 * @returns {Promise<string>} - URL de redirecionamento para o checkout do Mercado Pago.
 * @throws {Error} - Lança um erro se houver problemas ao processar a compra ou criar a preferência de pagamento.
 */
export async function registerPurchase(
  userId: string,
  cartItems: CartItem[]
): Promise<string> {
  try {
    // Obter referência ao usuário
    const userRef = doc(db, "users", userId)

    // Obter informações do usuário
    const userDoc = await getDoc(userRef)
    if (!userDoc.exists()) {
      throw new Error("Usuário não encontrado")
    }

    // Mapear os itens do carrinho para os dados da compra
    const purchaseItems = cartItems.map((item) => ({
      courseId: item.id,
      title: item.title,
      price: item.price || 0,
      description: item.description
    }))

    // Calcular o valor total da compra
    const totalAmount = purchaseItems.reduce((acc, item) => acc + item.price, 0)

    // Criar a compra no Firebase
    const purchaseRef = await addDoc(collection(userRef, "purchases"), {
      createdAt: serverTimestamp(),
      paymentStatus: "pending",
      totalAmount,
      updatedAt: serverTimestamp()
    })

    // Adicionar os itens à subcollection 'items' da compra
    const itemsCollection = collection(purchaseRef, "items")
    for (const item of purchaseItems) {
      await addDoc(itemsCollection, item)
    }

    // Apagar o carrinho do usuário
    await updateDoc(userRef, {
      cart: []
    })

    // Configuração do request para o Mercado Pago
    const preferenceData = {
      items: purchaseItems.map((item) => ({
        id: item.courseId,
        title: item.title,
        unit_price: item.price,
        quantity: 1,
        currency_id: "BRL"
      })),
      // TODO: pensar nessas rotas de retorno
      back_urls: {
        success: `${window.location.origin}?success`,
        failure: `${window.location.origin}?failure`,
        pending: `${window.location.origin}?pending`
      },
      auto_return: "approved",
      payment_methods: {
        installments: 1
      },
      // TODO: criar o endpoint de notificação no functions do firebase
      notification_url: "https://www.notificacao.com.br"
    }

    // Criar a preferência de pagamento no Mercado Pago
    try {
      const { data } = await axios.post<PreferenceResponse>(
        "https://api.mercadopago.com/checkout/preferences",
        preferenceData,
        {
          headers: {
            // TODO: substituir pelo token de acesso do usuário... talvez criar por environment variable
            Authorization: `Bearer APP_USR-286691588459706-090520-d3ed793dfb3ea9b36c520365cb230f71-1978843226`,
            "Content-Type": "application/json"
          }
        }
      )

      // Retornar a URL de redirecionamento para o checkout do Mercado Pago
      return data.init_point
    } catch (error) {
      console.error(
        "Erro ao criar preferência de pagamento no Mercado Pago:",
        error
      )
      throw new Error(
        "Falha ao criar preferência de pagamento. Tente novamente mais tarde."
      )
    }
  } catch (error) {
    console.error("Erro ao registrar a compra:", error)
    throw new Error("Erro ao processar a compra. Por favor, tente novamente.")
  }
}
