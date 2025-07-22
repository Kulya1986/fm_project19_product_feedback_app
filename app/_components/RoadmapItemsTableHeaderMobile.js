"use client";
import { useEffect } from "react";
import { useRoadmapTab } from "./RoadmapTabContext";

export default function RoadmapItemsTableHeaderMobile({
  planned,
  inProgress,
  live,
}) {
  const { activeTab, setActiveTab } = useRoadmapTab();

  useEffect( function () {
    const handleResize = () => {
      if (window.innerWidth >= 768) setActiveTab("all");
      else setActiveTab("planned");
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial rtab vie wof Roadmap page
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid grid-cols-3 md:hidden">
      <div
        className={`pt-5 pb-4 flex flex-col gap-1 items-center justify-center ${
          activeTab === "planned"
            ? " border-roadmap-red border-b-4"
            : "border-b-1 border-[#8C92B366]"
        }`}
        onClick={() => setActiveTab("planned")}
      >
        <h3
          className={`${
            activeTab === "planned"
              ? "text-blue-grey-700"
              : "text-blue-grey-faded-700"
          }`}
        >{`Planned (${planned})`}</h3>
      </div>
      <div
        className={`pt-5 pb-4 flex flex-col gap-1 items-center justify-center ${
          activeTab === "in-progress"
            ? " border-roadmap-purple border-b-4"
            : "border-b-1 border-[#8C92B366]"
        }`}
        onClick={() => setActiveTab("in-progress")}
      >
        <h3
          className={`${
            activeTab === "in-progress"
              ? "text-blue-grey-700"
              : "text-blue-grey-faded-700"
          }`}
        >{`In-Progress (${inProgress})`}</h3>
      </div>
      <div
        className={`pt-5 pb-4 flex flex-col gap-1 items-center justify-center ${
          activeTab === "live"
            ? " border-roadmap-blue border-b-4"
            : "border-b-1 border-[#8C92B366]"
        }`}
        onClick={() => setActiveTab("live")}
      >
        <h3
          className={`${
            activeTab === "live"
              ? "text-blue-grey-700"
              : "text-blue-grey-faded-700"
          }`}
        >{`Live (${live})`}</h3>
      </div>
    </div>
  );
}
