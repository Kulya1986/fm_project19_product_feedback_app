import Image from "next/image";
// import prodFeedDesktop from "@/public/background-header-desktop.png";
// import prodFeedTablet from "@/public/background-header-tablet.png";
// import prodFeedMobile from "@/public/background-header-mobile.png";

import SuggestionsList from "@/app/_components/SuggestionsList";
import FeedbackPanel from "@/app/_components/FeedbackPanel";

import Spinner from "./_components/Spinner";
import { Suspense } from "react";
import RoadmapTable from "@/app/_components/RoadmapTable";
import SpinnerMini from "@/app/_components/SpinnerMini";
import TypeFilters from "@/app/_components/TypeFIlters";
import { MobileMenuProvider } from "./_components/MobileMenuContext";
import { getFeedbackFilteredSorted } from "./_lib/data-service";
import MobileMenuToggle from "@/app/_components/MobileMenuToggle";
import SideBar from "@/app/_components/SideBar";

export const revalidate = 3600;

export default async function Page({ searchParams }) {
  const urlParams = await searchParams;
  const sortOrder = urlParams?.sortby?.replace("-", " ") ?? "most votes";
  const typeFilter = urlParams?.type ?? "all";

  const { count: planned } = await getFeedbackFilteredSorted({
    status: "planned",
  });
  const { count: inProgress } = await getFeedbackFilteredSorted({
    status: "in-progress",
  });
  const { count: live } = await getFeedbackFilteredSorted({ status: "live" });

  return (
    <MobileMenuProvider>
      <div className="flex flex-col content-start md:gap-[40px] lg:gap-[30px] grow lg:flex-row ">
        <div className=" gap-2.5 md:grid md:grid-cols-[1fr_2fr] lg:flex lg:flex-col lg:gap-6 lg:w-[255px] lg:min-w-[255px]">
          <div className="h-[72px] px-6 py-4 flex justify-between items-center md:justify-start bg-cover bg-[url(/background-header-mobile.png)] md:w-auto md:h-[178px]  md:py-6  md:items-end md:rounded-card-corner  md:bg-[url(/background-header-tablet.png)] lg:h-[137px]  lg:bg-[url(/background-header-desktop.png)]">
            <div className="flex flex-col">
              <h2 className="text-white">Frontend Mentor</h2>
              <p className="text-white  text-[13px] md:text-[15px] font-medium">
                Feedback Board
              </p>
            </div>
            <MobileMenuToggle />
          </div>
          <SideBar>
            <TypeFilters />

            <RoadmapTable
              planned={planned}
              inProgress={inProgress}
              live={live}
            />
          </SideBar>
        </div>
        <div className="flex flex-col grow">
          <Suspense fallback={<Spinner />} key={`${sortOrder}_${typeFilter}`}>
            <FeedbackPanel />
            <SuggestionsList typeFilter={typeFilter} sortOrder={sortOrder} />
          </Suspense>
        </div>
      </div>
    </MobileMenuProvider>
  );
}
