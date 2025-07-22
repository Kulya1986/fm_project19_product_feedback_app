function VoteButton({ page, voteClick, isClicked, children }) {
  const votesFlex =
    page === "roadmap"
      ? " py-1.5 px-3.5 md:py-3 md:px-4 "
      : " py-1.5 flex-col px-2 md:min-w-[40px]";

  const base =
    "flex text-blue-grey-700 font-bold tracking-[-0.18px] gap-2 items-center text-[13px] rounded-card-corner  bg-blue-grey-200 hover:bg-blue-grey-400 hover:cursor-pointer disabled:hover:cursor-default  disabled:bg-blue disabled:text-white disabled:hover:bg-blue disabled:hover:text-white" +
    votesFlex;

  return (
    <button
      className={base}
      onClick={async () => {
        await voteClick();
      }}
      disabled={isClicked}
    >
      {children}
    </button>
  );
}

export default VoteButton;
