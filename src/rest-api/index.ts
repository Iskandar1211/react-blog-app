import {CommentType, PhotosType, PostType} from "@/types";

export const getPosts = async (): Promise<PostType[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return await response.json()
}

export const getCommentsById = async (postId: number): Promise<CommentType[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return await response.json()
}

export const getPhotos = async (): Promise<PhotosType[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
  return await response.json()
}
