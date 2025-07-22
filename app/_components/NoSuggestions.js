import EmptySuggestions from "@/public/illustration-empty.svg";
import Image from "next/image";
import FormButton from "./FormButton";

function NoSuggestions() {
  return (
    <div className="h-[460px] py-[76px] px-6 md:px-0 md:py-0 md:h-[600px] flex flex-col items-center justify-center rounded-card-corner bg-white">
      <Image src={EmptySuggestions} alt="No suggestions" />
      <h1 className="text-center text-blue-grey-700 mt-[54px] mb-4">
        There is no feedback yet
      </h1>
      <p className="text-center text-blue-grey-500 text-base font-normal">
        Got a suggestion? Found a bug that needs to be squashed?
      </p>
      <p className="text-center text-blue-grey-500 text-base font-normal mb-12">
        {" "}
        We love hearing about new ideas to improve our app.
      </p>
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

export default NoSuggestions;
