"use client";
import RoadmapItem from "./RoadmapItem";
import { useRoadmapTab } from "./RoadmapTabContext";

export default function RoadmapColumn({
  feedbackItems,
  count,
  heading,
  copy,
  votes,
}) {
  const { activeTab } = useRoadmapTab();

  if (activeTab === heading.toLowerCase() || activeTab === "all")
    return (
      <div className="flex flex-col gap-y-6 md:gap-6 lg:gap-8">
        <div className="flex flex-col gap-1 items-start">
          <p className="text-lg tracking-[-0.25px] font-bold leading-[26px] text-blue-grey-700">{`${heading} (${count})`}</p>
          <p className="text-[13px] md:text-base text-blue-grey-500">{copy}</p>
        </div>
        <div className="flex flex-col justify-start gap-4  lg:gap-6">
          {feedbackItems.map((feedback) => (
            <RoadmapItem
              feedback={feedback}
              key={feedback.id}
              voted={votes.includes(feedback.id)}
            />
          ))}
        </div>
      </div>
    );
}

RoadmapColumn;
