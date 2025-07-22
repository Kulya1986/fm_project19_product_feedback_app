import Reply from "./Reply";

export default function RepliesList({ replies }) {
  return (
    <div className="flex flex-row md:block">
      {replies.length > 0 && (
        <div className="block  w-[1px] opacity-10 bg-blue-grey-500 grow absolute translate-y-[8px] translate-x-[-23px] h-(--replies-line-mobile) md:hidden"></div>
      )}
      <div className="flex flex-col grow">
        {replies.map((reply) => (
          <Reply reply={reply} key={reply.id} />
        ))}
      </div>
    </div>
  );
}
