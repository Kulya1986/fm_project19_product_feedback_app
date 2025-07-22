import RoadmapItemsTable from "@/app/_components/RoadmapItemsTable";
import NavigationLink from "@/app/_components/NavigationLink";
import FormButton from "@/app/_components/FormButton";
import Image from "next/image";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";

export default function Page() {
  return (
    <div className="flex flex-col md:gap-8 lg:gap-12 grow">
      <div className="h-[100px] flex flex-row text-white bg-blue-grey-800 px-6 py-[26px] md:h-[113px] md:rounded-card-corner md:px-8 md:py-7 justify-between items-center">
        <div>
          <NavigationLink type="link" page="roadmap">
            Go Back
          </NavigationLink>
          <h1>Roadmap</h1>
        </div>

        <FormButton type="purple" destination="/feedback/add">
          <Image
            src="/icons/icon-plus.svg"
            width={9}
            height={9}
            alt="Add feedback"
          />

          <span className="ml-2">Add feedback</span>
        </FormButton>
      </div>
      <Suspense fallback={<Spinner />}>
        <RoadmapItemsTable />
      </Suspense>
    </div>
  );
}
