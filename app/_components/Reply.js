import Image from "next/image";
import ReplyLink from "./ReplyLink";

export default function Reply({ reply }) {
  const { content, author, id } = reply;
  const { avatar, nickname, user_name } = author;

  const receiverNickname = reply?.receiver?.nickname;

  return (
    <div className={`flex flex-col`}>
      <div className={`flex flex-row gap-8 items-start py-2 md:py-4`}>
        <div className="hidden md:block relative rounded-full w-10 h-10 min-w-10 ">
          <Image
            src={avatar}
            alt={nickname}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4 grow">
          <div className="flex flex-row grow justify-between items-center">
            <div className="flex flex-row gap-4">
              <div className=" md:hidden relative rounded-full w-10 h-10 min-w-10 ">
                <Image
                  src={avatar}
                  alt={nickname}
                  fill
                  className="rounded-full object-cover"
                />
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
          <div className="text-blue-grey-500 text-[15px]">
            {receiverNickname ? (
              <span className="font-bold text-purple mr-1">{`@${receiverNickname}`}</span>
            ) : null}
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
