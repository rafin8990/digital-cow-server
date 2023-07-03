export type IUserRole = 'seller' | 'buyer' | 'admin'
export const UserRole: IUserRole[] = ['seller', 'buyer', 'admin']
export const UsersSearchableFields = ['name', 'phoneNumber', 'address', 'role']
export const UsersFilterableFields = ['searchTerm', 'title', 'code', 'year']
