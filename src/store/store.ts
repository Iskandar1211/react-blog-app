import {create} from 'zustand'
import {PostType} from "@/types";

interface PostState {
  posts: PostType[] | []
  addPosts: (posts: PostType[]) => void
}

export const usePostsStore = create<PostState>()((set) => ({
  posts: [],
  addPosts: (posts: PostType[]) => set(state => ({posts: [...state.posts, ...posts]})),
}));