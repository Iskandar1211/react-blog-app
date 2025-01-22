import {getPosts} from "@/rest-api";
import {useQuery} from "@tanstack/react-query";
import {PostType} from "@/types";
import PostComponent from "@/components/posts/post.component.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {useSearchParams} from "react-router-dom";

const PostsComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const postId = parseInt(searchParams.get("postId") || "1", 10);
  const {data: posts} = useQuery<PostType[]>({queryKey: ['posts'], queryFn: getPosts});
  const postsPerPage = 10;

  const indexOfLastPost = postId * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = posts?.length ? Math.ceil(posts.length / postsPerPage) : 0;

  const handlePageChange = (page: number) => {
    setSearchParams({postId: String(page)});
  };

  if(!posts) return <div>No posts available</div>

  return (
    <div className={'container mx-auto flex flex-col h-screen'}>
      <div className={'grid grid-cols-4 p-5 gap-4 flex-1 border'}>
        {currentPosts && currentPosts.length > 0 && currentPosts.map(post => {
          return <PostComponent key={post.id} post={post}/>
        })}
      </div>

      <div className={'col-span-4 border'}>
        {posts && <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(postId > 1 ? postId - 1 : 1)}
              />
            </PaginationItem>
                <PaginationItem >
                  <PaginationLink
                    isActive={true}
                  >
                    {postId}
                  </PaginationLink>
                </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(postId < totalPages ? postId + 1 :totalPages)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>}
      </div>
    </div>
  );
};

export default PostsComponent;
