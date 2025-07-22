import Image from "next/image";
import Link from "next/link";
import { getComment, getReplies } from "@/app/_lib/data-service";
import RepliesList from "./RepliesList";
import ReplyForm from "./ReplyForm";
import ReplyLink from "./ReplyLink";

export default async function Comment({ comment, replyTo }) {
  const { content, author, id, feedbackId, authorId } = comment;
  const { avatar, nickname, user_name } = author;
  const replies = await getReplies(id);
  const repliesIds = replies.map((reply) => reply.id);
  const replyToComment = await getComment(replyTo);

  return (
    <div
      className={`flex flex-col  border-b-[1px] border-[#8C92B3] last:border-b-0 pt-4 nth-2:pt-0 ${
        replies.length > 0 ? " pb-0" : " pb-4"
      } last:pb-4`}
    >
      <div
        className={`flex flex-col md:flex-row ${
          replies.length > 0 ? "" : "gap-8 "
        } md:items-start py-2 md:py-4`}
      >
        <div className="hidden md:flex md:flex-col ">
          <div className="relative rounded-full w-10 h-10 min-w-10">
            <Image
              src={avatar}
              alt={nickname}
              fill
              className="rounded-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-row relative grow">
          {replies.length > 0 && (
            <div className="hidden md:block w-[1px] opacity-10 bg-blue-grey-500 grow absolute   md:translate-x-[-20px] md:translate-y-[68px] h-(--replies-line)"></div>
          )}
          <div
            className={`flex flex-col ${
              replies.length > 0 ? "gap-4" : ""
            } grow`}
          >
            <div
              className={`flex flex-col gap-4 grow ${
                replies.length > 0 ? "md:pl-8" : ""
              }`}
            >
              <div className="flex flex-row grow justify-between items-center">
                <div className="flex flex-row grow gap-4">
                  <div className="flex md:hidden flex-col ">
                    <div className="relative rounded-full w-10 h-10 min-w-10">
                      <Image
                        src={avatar}
                        alt={nickname}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold text-sm tracking-[-0.19px] text-blue-grey-700">
                      {user_name}
                    </p>
                    <p className="text-sm text-blue-grey-500">{`@${nickname}`}</p>
                  </div>
                </div>
                <ReplyLink commentId={id} />
              </div>
              <div className="text-blue-grey-500 text-[15px]">{content}</div>
            </div>

            <div
              className={`flex flex-col ml-[23px] md:ml-0 ${
                replies.length > 0 ? " mb-4" : ""
              }`}
            >
              {replies.length > 0 && <RepliesList replies={replies} />}
              {id === replyTo ? (
                <ReplyForm
                  parentCommentId={id}
                  feedbackId={feedbackId}
                  receiverId={authorId}
                  shift={replies.length > 0}
                />
              ) : repliesIds.includes(replyTo) ? (
                <ReplyForm
                  parentCommentId={id}
                  feedbackId={feedbackId}
                  receiverId={replyToComment[0]?.authorId}
                  shift={replies.length > 0}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
