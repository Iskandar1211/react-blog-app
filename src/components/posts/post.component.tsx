import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {PostType} from "@/types";

const PostComponent = ({post}: { post: PostType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {post.body}
      </CardContent>
    </Card>
  );
};

export default PostComponent;