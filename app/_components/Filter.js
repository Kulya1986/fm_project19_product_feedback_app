"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import CustomSelect from "./CustomSelect";

const selectOptions = [
  "most votes",
  "less votes",
  "most comments",
  "less comments",
];

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const selectedOption =
    searchParams.get("sortby")?.replace("-", " ") ?? "most votes";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("sortby", filter?.toLowerCase()?.replace(" ", "-"));
    router.replace(`${path}?${params.toString()}`, { scroll: false });
  }
  return (
    <CustomSelect
      label="Sort by :"
      controlBG="transparent"
      arrowColor="#ffffff"
      selectOptions={selectOptions}
      selectedOption={selectedOption}
      handleOption={handleFilter}
    />
  );
}

export default Filter;
