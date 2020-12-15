interface Ichannel {
  id: string,
  name: string,
  membersCount: number,
}

export interface IUser {
  id: string,
  email: string,
  name: string,
  access: string,
  channels?: Ichannel[],
  token?: string,
}
