import EditForm from "@/app/_components/EditForm";
import NavigationLink from "@/app/_components/NavigationLink";
import { getFeedback } from "@/app/_lib/data-service";
import Image from "next/image";

export const revalidate = 60;

export default async function Page({ params }) {
  const { feedbackId } = await params;
  const data = await getFeedback(feedbackId);
  const feedback = data[0];

  return (
    <div className="w-auto mx-6 mt-8 mb-20 md:w-[540px] md:mx-auto flex flex-col lg:mt-3">
      <div className="flex flex-row justify-between items-center mb-[55px] md:mb-[68px]">
        <NavigationLink type="link">Go back</NavigationLink>
      </div>
      <div className="bg-white rounded-card-corner px-6 pb-6 pt-[44px] md:px-[42px] md:pt-[52px] md:pb-10 relative">
        <Image
          src={"/icons/icon-edit-feedback.svg"}
          alt="Add feedback"
          width={56}
          height={56}
          className="absolute -translate-y-[64px] md:-translate-y-[80px] w-10 h-10 md:w-14 md:h-14"
        />
        <h1 className="text-blue-grey-700  mb-6 md:mb-10">{`Editing '${feedback.title}'`}</h1>
        <EditForm feedback={feedback} />
      </div>
    </div>
  );
}
