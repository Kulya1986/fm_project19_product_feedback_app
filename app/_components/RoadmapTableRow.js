const tasksPerStage = { planned: 2, inProgress: 3, live: 1 };

function RoadmapTableRow({ stage, color, count }) {
  return (
    <div className="grid gap-4 grid-cols-[8px_auto_36px] items-center">
      <div
        className={`rounded-full w-2 h-2 ${
          color === "red"
            ? "bg-roadmap-red"
            : color === "blue"
            ? "bg-roadmap-blue"
            : "bg-roadmap-purple"
        }`}
      ></div>
      <p className="text-base text-blue-grey-500 capitalize">{stage}</p>
      <p className="text-base font-bold text-blue-grey-500  text-right">
        {count}
      </p>
    </div>
  );
}

export default RoadmapTableRow;
