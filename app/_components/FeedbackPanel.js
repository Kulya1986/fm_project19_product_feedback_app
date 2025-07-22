import Image from "next/image";
import FormButton from "./FormButton";
import CustomSelect from "./CustomSelect";
import Filter from "./Filter";
import { getFeedbackFilteredSorted } from "@/app/_lib/data-service";

async function FeedbackPanel() {
  const { count } = await getFeedbackFilteredSorted({ status: "suggestion" });

  return (
    <div className="flex flex-row  px-6 py-2 text-white justify-between items-center mb-8 md:mb-6 bg-blue-grey-800 md:rounded-card-corner md:px-4 md:py-3.5">
      <div className="md:grid md:grid-cols-[24px_1fr_180px] items-center gap-6">
        <Image
          src="/icon-suggestions.svg"
          width={24}
          height={24}
          alt="Suggestions"
          className="ml-2 hidden md:block"
        />

        <h3 className="hidden md:block">
          <span className="text-sm">{count}</span>
          <span> Suggestions</span>
        </h3>
        <Filter />
      </div>
      <FormButton type="purple" destination={"/feedback/add"}>
        <Image
          src="/icons/icon-plus.svg"
          width={9}
          height={9}
          alt="Add feedback"
        />

        <span className="ml-2">Add feedback</span>
      </FormButton>
    </div>
  );
}

export default FeedbackPanel;
