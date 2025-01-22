import {getPosts} from "@/rest-api";
import {useQuery} from "@tanstack/react-query";
import {PostType} from "@/types";
import PostComponent from "@/components/posts/post.component.tsx";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";
import PaginationComponent from "@/components/pagination/pagination.component.tsx";

const PostsComponent = () => {

  const [searchParams] = useSearchParams();
  const postId = parseInt(searchParams.get("postId") || "1", 10);
  const {data: posts} = useQuery<PostType[]>({queryKey: ['posts'], queryFn: getPosts});
  const [postsPerPage, setPostsPerPage] = useState(10);
  const indexOfLastPost = postId * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  if (!posts) return <div>No posts available</div>

  return (
    <div className={'container mx-auto flex flex-col h-screen'}>
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
