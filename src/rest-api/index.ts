import {PostType} from "@/types";

export const getPosts = async (): Promise<PostType[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return  await response.json()
}