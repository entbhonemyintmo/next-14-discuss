import CommentShow from '@/components/comments/comment-show';
import { CommentWithAuthor } from '@/db/queries/comment';

interface CommentListProps {
  comments: CommentWithAuthor[];
}

export default function CommentList({ comments }: CommentListProps) {
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
