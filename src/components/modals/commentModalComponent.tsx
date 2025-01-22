import {Button} from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {useQuery} from "@tanstack/react-query";
import {CommentType} from "@/types";
import {getCommentsById} from "@/rest-api";

const CommentModalComponent = ({dialogTitle, postId}: {
  dialogTitle: string,
  postId: number
}) => {
  const {data: comments} = useQuery<CommentType[]>({
    queryKey: ['comment', postId],
    queryFn: () => getCommentsById(postId)
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={'font-bold text-2xl'}>{dialogTitle}</DialogTitle>
        </DialogHeader>
        {comments && comments.map(comment => <div>
          <h2 className={'font-medium'}>{comment.name}</h2>
          <p className={'text-blue-400'}>{comment.email}</p>
          <DialogDescription key={comment.id}>{comment.body}</DialogDescription>
        </div>)}
      </DialogContent>
    </Dialog>
  );
};

export default CommentModalComponent;