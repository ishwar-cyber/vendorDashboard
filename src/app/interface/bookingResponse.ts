export interface CustomerBookingResponse {
    payload: Payload
    errorBean: any
    status: string
  }
  
  export interface Payload {
    customerName: string
    customerPhone: number
    serviceHistory: ServiceHistory[]
  }
  
  export interface ServiceHistory {
    vendorName: string
    vendorPhone: number
    vendorAddress: any
    date: string
    services: Service[]
  }
  
  export interface Service {
    serviceName: string
    time: string
    price: number
  }
  