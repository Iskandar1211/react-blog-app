import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx";
import {PostType} from "@/types";
import {useSearchParams} from "react-router-dom";
import {usePostsStore} from "@/store/store.ts";

const PaginationComponent = ({posts}: {
  posts: PostType[],
}) => {
  const postStore = usePostsStore(state => state)
  const totalPages = posts?.length ? Math.ceil(posts.length / postStore.postsPerPage) : 0;
  const [searchParams, setSearchParams] = useSearchParams();
  const postId = parseInt(searchParams.get("postId") || "1", 10);

  const handlePageChange = (page: number) => {
    setSearchParams({postId: String(page)});
  };
  const handlePostsPerPageChange = (value: number) => {
    postStore.setPostsPerPage(value);
    setSearchParams({postId: "1"});
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className={'cursor-pointer'}>
          <PaginationPrevious
            onClick={() => handlePageChange(postId > 1 ? postId - 1 : 1)}
          />
        </PaginationItem>
        <PaginationItem>
          <Select value={String(postStore.postsPerPage)} onValueChange={(event) => handlePostsPerPageChange(parseInt(event))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select per page"/>
            </SelectTrigger>
            <SelectContent className={'bg-white'}>
              <SelectGroup>
                <SelectLabel>Posts per page</SelectLabel>
                <SelectItem value="10">10 posts per page</SelectItem>
                <SelectItem value="20">20 posts per page</SelectItem>
                <SelectItem value="50">30 posts per page</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isActive={true}
          >
            {postId}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className={'cursor-pointer'}>
          <PaginationNext
            onClick={() => handlePageChange(postId < totalPages ? postId + 1 : totalPages)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;