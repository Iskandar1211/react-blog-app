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
  tags: string[]
  selectedTag: string,
  setFilteredByTag: (tag: string) => void
}

export const usePostsStore = create<PostState>()((set, getState) => ({
  posts: [],
  filteredPosts: [],
  postTitle: '',
  postsPerPage: 10,
  setPosts: (posts: PostType[]) => {
    const addRandomTag = (post: PostType) => {
      const tags = getState().tags
      const randomTag = tags[Math.floor(Math.random() * tags.length)];
      if (!post.tags) {
        post.tags = [];
      }
      post.tags.push(randomTag);
      return post;
    };
    const updatedPosts = posts.map(addRandomTag);
    set({posts: updatedPosts, filteredPosts: updatedPosts});
  },
  setPostTitle: (title) => set({postTitle: title}),
  setFilteredPosts: () => set((state) =>
    ({filteredPosts: state.posts.filter(post => post.title.toLowerCase().includes(state.postTitle.toLowerCase()))})),
  setPostsPerPage: (perPage) => set({postsPerPage: perPage}),
  tags: ['javascript', 'data science', 'machine learning', 'web development', 'frontend', 'backend', 'fullstack', 'devops'],
  selectedTag: '',
  setFilteredByTag: (tag) => {
    getState().selectedTag = tag
    set((state) =>
      ({filteredPosts: state.posts.filter(filteredPost => filteredPost.tags.includes(tag))}))
  },
}));

