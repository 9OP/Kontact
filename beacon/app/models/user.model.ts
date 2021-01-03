export interface IMembership {
  id: string,
  name: string
}

export interface IUser {
  id: string,
  email: string,
  name: string,
  access: string,
  memberships: IMembership[],
  token: string | null,
}
