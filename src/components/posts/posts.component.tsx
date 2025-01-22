import {getPhotos, getPhotosFake, getPosts} from "@/rest-api";
import {useQuery} from "@tanstack/react-query";
import {PhotosType, PostType} from "@/types";
import PostComponent from "@/components/posts/post.component.tsx";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PaginationComponent from "@/components/pagination/pagination.component.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const PostsComponent = () => {
  const [searchParams] = useSearchParams();
  const postId = parseInt(searchParams.get("postId") || "1", 10);
  const [postTitle, setPostTitle] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);

  const {data: posts} = useQuery<PostType[]>({queryKey: ['posts'], queryFn: getPosts});
  const {data: photos} = useQuery<PhotosType[]>({queryKey: ['photos'], queryFn: getPhotos});
  const {data: photosFake} = useQuery<PhotosType[]>({queryKey: ['photosFake'], queryFn: getPhotosFake});
  const [postsPerPage, setPostsPerPage] = useState(10);
  const indexOfLastPost = postId * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost).map(post => ({
    ...post,
    photos: postId > 2 ? photosFake?.filter(photo => photo.id === post.id).map(photo => ({...photo, image: photo.url})) : photos?.filter(photo => photo.id === post.id)
  }));

  useEffect(() => {
    if (!posts) return
    setFilteredPosts(posts)
  }, [posts])

  const filteredPostsByName = () => {
    if (!posts) return
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(postTitle.toLowerCase()))
    setFilteredPosts(filteredPosts)
  }

  if (!posts) return <div>No posts available</div>

  return (
    <div className={'container mx-auto flex flex-col h-screen'}>
      <h1 className={'text-2xl font-bold text-center'}>Posts</h1>
      <div className={'flex gap-2 w-fit'}>
        <Input placeholder={'Search...'} className={'rounded'} onChange={(event) => setPostTitle(event.target.value)}/>
        <Button onClick={() => filteredPostsByName()}>Search</Button>
      </div>
      <div className={'grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 p-5 gap-4 flex-1'}>
        {currentPosts && currentPosts.length > 0 && currentPosts.map(post => {
          return <PostComponent key={post.id} post={post}/>
        })}
      </div>
      <div className={'col-span-4 sticky bottom-0 py-2 bg-white'}>
        <PaginationComponent
          postsPerPage={postsPerPage}
          posts={posts}
          setPostsPerPage={setPostsPerPage}
        />
      </div>
    </div>
  );
};

export default PostsComponent;
