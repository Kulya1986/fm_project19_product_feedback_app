import { getComments } from "@/app/_lib/data-service";
import Comment from "./Comment";

async function CommentsList({ feedbackId, replyTo }) {
  const comments = await getComments(feedbackId);

  if (comments.length === 0) return;

  return (
    <div className="flex flex-col px-6 md:px-8 py-4 rounded-card-corner bg-white">
      <h3 className="py-2 mb-4 text-lg tracking-[-0.25px] md:mb-5 text-blue-grey-700">
        {`${comments.length} comment${comments.length === 1 ? "" : "s"}`}
      </h3>
      {comments.map(
        (comment) =>
          comment.parentCommentId === null && (
            <Comment comment={comment} key={comment.id} replyTo={replyTo} />
          )
      )}
    </div>
  );
}

export default CommentsList;
