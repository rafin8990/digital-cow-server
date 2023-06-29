export type IUser = {
  phoneNumber: string
  role: 'seller' | 'buyer'
  password: string
  name: {
    firstName: string
    lastName: string
  }
  address: string
  budget: number
  income: number
}

export type IUsersFilters = {
  searchTerm?: string
}
