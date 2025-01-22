export type PostType = {
  userId: number,
  id: number,
  title: string,
  body: string
  photos?: PhotosType[]
}

export type CommentType = {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string
}

export type PhotosType = {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}