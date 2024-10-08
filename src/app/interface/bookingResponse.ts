export interface CustomerBookingResponse {
  payload: Payload
  errorBean: any
  status: string
}

export interface Payload {
  customerName: string
  customerId : string
  customerPhone: number
  serviceHistory: ServiceHistory[]
}

export interface ServiceHistory {
  vendorName: string
  vendorId: string
  bookingId: string
  vendorPhone: number
  vendorAddress: string
  date: string
  services: Service[]
}

export interface Service {
  serviceName: string
  vendorServiceKey: number
  time: string
  price: number
}
