export type PlaceCard = {
  likes: User[],
  _id: string,
  name: string,
  link: string,
  owner: User,
  createdAt: string
}

export type User = {
  about: string,
  avatar: string,
  _id: string,
  email?: string,
  name: string
}

