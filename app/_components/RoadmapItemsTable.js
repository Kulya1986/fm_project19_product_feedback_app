import {
  getFeedbackFilteredSorted,
  getUserVotes,
} from "@/app/_lib/data-service";
import RoadmapColumn from "./RoadmapColumn";
import RoadmapItemsTableHeaderMobile from "./RoadmapItemsTableHeaderMobile";
import { RoadmapTabProvider } from "./RoadmapTabContext";

export default async function RoadmapItemsTable() {
  const { data: plannedItems, count: planned } =
    await getFeedbackFilteredSorted({
      status: "planned",
    });
  const { data: inProgressItems, count: inProgress } =
    await getFeedbackFilteredSorted({
      status: "in-progress",
    });
  const { data: liveItems, count: live } = await getFeedbackFilteredSorted({
    status: "live",
  });

  const roughVotes = await getUserVotes("b075af20-5627-44d0-b96c-3c20d842ed34");
  const votes = roughVotes.map((item) => item.feedbackId);

  return (
    <RoadmapTabProvider>
      <div>
        <RoadmapItemsTableHeaderMobile
          planned={planned}
          inProgress={inProgress}
          live={live}
        />
        <div className="px-6 pt-6 grid-cols-1 md:p-0 grid md:grid-cols-3 gap-x-[10px] lg:gap-x-[30px]">
          <RoadmapColumn
            feedbackItems={plannedItems}
            count={planned}
            heading="Planned"
            copy="Ideas prioritized for research"
            votes={votes}
          />
          <RoadmapColumn
            feedbackItems={inProgressItems}
            count={inProgress}
            heading="In-Progress"
            copy="Currently being developed"
            votes={votes}
          />
          <RoadmapColumn
            feedbackItems={liveItems}
            count={live}
            heading="Live"
            copy="Released features"
            votes={votes}
          />
        </div>
      </div>
    </RoadmapTabProvider>
  );
}
