export interface OfficialRol {
  readonly _id: string
  readonly name: string
}

export interface PrivateUser {
  readonly _id: string
  readonly name: string
  readonly role: OfficialRol[]
}
