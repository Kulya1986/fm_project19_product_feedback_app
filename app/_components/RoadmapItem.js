"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { addVote } from "@/app/_lib/actions";
import VoteButton from "./VoteButton";
import FilterButton from "./FilterButton";

function RoadmapItem({ feedback, voted }) {
  const { id, title, type, status, description, votes, comments_count } =
    feedback;
  const router = useRouter();

  const navigateToDetails = () => {
    router.push(`/feedback/${id}`);
  };

  const voteData = {
    feedbackId: id,
    votes,
    userId: "b075af20-5627-44d0-b96c-3c20d842ed34",
  };

  const addVoteWithData = addVote.bind(null, voteData);

  return (
    <div
      className={`flex flex-col gap-4 py-6 px-6 md:px-5  lg:p-8 items-start rounded-[5px] bg-white border-t-[6px] ${
        status === "planned"
          ? "border-roadmap-red"
          : status === "in-progress"
          ? "border-roadmap-purple"
          : "border-roadmap-blue"
      } hover:cursor-pointer`}
    >
      <div className="flex flex-col gap-4" onClick={navigateToDetails}>
        <div className="flex flex-col gap-2 items-start">
          <div className="flex flex-row gap-4 items-center">
            <div
              className={`w-2 h-2 rounded-full ${
                status === "planned"
                  ? "bg-roadmap-red"
                  : status === "in-progress"
                  ? "bg-roadmap-purple"
                  : "bg-roadmap-blue"
              }`}
            ></div>
            <p className="text-[13px] md:text-base text-blue-grey-500 capitalize">
              {status}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-blue-grey-700 hover:text-blue">{title}</h3>
            <p className="text-[13px] md:text-base text-blue-grey-500">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-2 lg:mt-0">
          <FilterButton noHover={true}>{type}</FilterButton>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center self-stretch grow">
        <VoteButton
          page="roadmap"
          isClicked={voted}
          voteClick={addVoteWithData}
        >
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 6l4-4 4 4"
              stroke={voted ? "#fff" : "#4661E6"}
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
          <span>{votes}</span>
        </VoteButton>
        <div className="flex flex-row gap-2 self-center items-center justify-between">
          <Image
            src="/icons/icon-comments.svg"
            width={16}
            height={18}
            alt={`${comments_count} comments`}
          />
          <p className="text-[13px] tracking-[-0.18px] md:text-base font-bold md:tracking-[-0.22px] text-blue-grey-700">
            {comments_count}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoadmapItem;
