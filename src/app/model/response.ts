export interface Vendor {
    payload: Payload[]
    errorBean: any
    status: string
  }
  
  export interface Payload {
    id: number
    vendorOutletName: string
    userId: string
    services: Service[]
    state: string
    city: string
    pinCode: number
    openingTime: string
    closingTime: string
    noOfStaff: number
    createdAt: string
    lastUpdatedAt: string
    isActive: number
  }

  export interface Service {
    id: number
    serviceEntity: ServiceEntity
    price: number
    noOfSeats: number
    createdAt: string
    lastUpdatedAt: string
    isActive: number
  }
  
  export interface ServiceEntity {
    id: number
    serviceName: string
    createdAt: string
    lastUpdatedAt: string
    isActive: number
  }