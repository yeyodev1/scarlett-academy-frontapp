import APIBase from './httpBase'
import type { ApiResponse } from './authService'

export interface PreparePaymentResponse {
  paymentId: string
  payWithCard: string
  clientTransactionId: string
}

export interface PaymentBoxConfig {
  token: string
  storeId: string
  /** Monto total en centavos, tal como lo espera el SDK de Payphone. */
  amount: number
  amountWithoutTax: number
  amountWithTax: number
  tax: number
  service: number
  tip: number
  currency: string
  clientTransactionId: string
  reference: string
  responseUrl: string
  lang: string
  timeZone: number
  email: string
  /** Monto en dólares para mostrar en la UI. */
  displayAmount: number
  /** true si se aplicó el precio de preventa. */
  isPresale: boolean
  accessMonths: number
  environment: 'test' | 'prod'
}

export interface ConfirmPaymentResponse {
  status: string
  transactionId?: number
  isNewUser?: boolean
  plainPassword?: string
  emailSent?: boolean
  email?: string
}

class PaymentService extends APIBase {
  /**
   * Redirección a la pasarela de Payphone.
   * El precio y las credenciales las decide el backend según el Origin.
   */
  async prepare(payload: { email: string; name: string; lastName: string }) {
    return this.post<ApiResponse<PreparePaymentResponse>>('payments/prepare', payload)
  }

  /** Config para el Payment Box embebido de Payphone. */
  async prepareBox(payload: { email: string; name: string; lastName: string }) {
    return this.post<ApiResponse<PaymentBoxConfig>>('payments/prepare-box', payload)
  }

  async confirmPayment(id: string, clientTransactionId: string) {
    return this.get<ApiResponse<ConfirmPaymentResponse>>('payments/confirm', undefined, {
      params: { id, clientTransactionId },
    })
  }

  async resendWelcome(clientTransactionId: string) {
    return this.post<ApiResponse<{ email: string }>>('payments/resend-welcome-public', { clientTransactionId })
  }

  async history() {
    return this.get<ApiResponse<{ history: Array<{
      id: string
      type: 'manual' | 'payphone'
      plan: 'reto' | 'monthly' | 'annual'
      amount: number
      currency: 'USD'
      status: string
      receiptImage?: string
      notes?: string
      payphoneTransactionId?: number | null
      clientTransactionId?: string
      createdAt: string
    }> }>>('payments/history')
  }

  async cancelPending() {
    return this.post<ApiResponse<{ canceled: number }>>('payments/cancel-pending', {})
  }

  async cancelSubscription() {
    return this.post<ApiResponse<{ email: string; subscriptionStatus: string }>>('payments/cancel-subscription', {})
  }
}

export const paymentService = new PaymentService()
export default PaymentService
