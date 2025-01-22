import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {PostType} from "@/types";
import CarouselComponent from "@/components/carousel/carousel.component.tsx";
import CommentModalComponent from "@/components/modals/commentModalComponent.tsx";

const PostComponent = ({post}: { post: PostType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={''}>{post.title}</CardTitle>
      </CardHeader>
      <CardContent className={'flex-1'}>
        <div>
          {post.body}
          <div className={'p-8'}>
            {post.photos && <CarouselComponent photos={post.photos}/>}
          </div>
        </div>
      </CardContent>
      <CardFooter className={'flex justify-center [&>button]:w-full mt-auto'}>
        <CommentModalComponent dialogTitle={'Comments'} postId={post.id}/>
      </CardFooter>
    </Card>
  );
};

export default PostComponent;