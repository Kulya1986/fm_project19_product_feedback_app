"use client";
import { useMobileMenu } from "./MobileMenuContext";
import RoadmapTableRow from "./RoadmapTableRow";
import Link from "next/link";

export default function RoadmapTable({ planned, inProgress, live }) {
  const { setOpen } = useMobileMenu();
  return (
    <div className="px-6 py-5 flex flex-col bg-white rounded-card-corner">
      <div className="grid grid-cols-[3fr_1fr] gap-5 mb-6 items-center ">
        <h3 className="text-blue-grey-700">Roadmap</h3>
        <Link
          href="/roadmap"
          className="text-semibold text-blue text-[13px] underline text-right"
          onClick={() => setOpen(false)}
        >
          View
        </Link>
      </div>
      <div className="grid gap-2">
        <RoadmapTableRow stage="planned" color="red" count={planned} />
        <RoadmapTableRow stage="inProgress" color="purple" count={inProgress} />
        <RoadmapTableRow stage="live" color="blue" count={live} />
      </div>
    </div>
  );
}
