import {create} from 'zustand'
import {PostType} from "@/types";

interface PostState {
  posts: PostType[] | []
  filteredPosts: PostType[] | []
  postTitle: string
  postsPerPage: number
  setPosts: (posts: PostType[]) => void
  setPostTitle: (title: string) => void
  setFilteredPosts: (filteredPosts: PostType[]) => void
  setPostsPerPage: (perPage: number) => void
}

export const usePostsStore = create<PostState>()((set) => ({
  posts: [],
  filteredPosts: [],
  postTitle: '',
  postsPerPage: 10,
  setPosts: (posts) => set({posts: posts, filteredPosts: posts}),
  setPostTitle: (title) => set({postTitle: title}),
  setFilteredPosts: () => set((state) => ({filteredPosts: state.posts.filter(post => post.title.toLowerCase().includes(state.postTitle.toLowerCase()))})),
  setPostsPerPage: (perPage) => set({postsPerPage: perPage}),
}));

