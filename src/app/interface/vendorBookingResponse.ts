export interface VendorBookingResponse {
    payload: Payload
    errorBean: any
    status: string
  }
  
  export interface Payload {
    vendorName: string
    vendorPhone: number
    serviceHistory: ServiceHistory[]
  }
  
  export interface ServiceHistory {
    customerName: string
    customerPhone: number
    date: string
    services: Service[]
  }
  
  export interface Service {
    serviceName: string
    time: string
    price: number
  }
  