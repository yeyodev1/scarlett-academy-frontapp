import APIBase from './httpBase'
import type { ApiResponse } from './authService'

export interface PresaleStatus {
  /** Fin de la preventa (ISO). */
  deadline: string
  /** true mientras la preventa siga vigente. */
  isActive: boolean
  /** Precio que se cobrará ahora mismo (67 en preventa, 87 después). */
  currentPrice: number
  presalePrice: number
  regularPrice: number
  /** Duración del reto en meses. */
  accessMonths: number
  whatsappNumber: string
}

class PresaleService extends APIBase {
  async getStatus() {
    return this.get<ApiResponse<PresaleStatus>>('presale/status')
  }
}

export const presaleService = new PresaleService()
export default PresaleService
