export type IUser = {
  phoneNumber: string
  role: string
  password: string
  name: {
    firstName: string
    lastName: string
  }
  address: string
  budget: number
  income: number
}
