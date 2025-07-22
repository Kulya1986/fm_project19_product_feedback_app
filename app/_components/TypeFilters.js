"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterButton from "./FilterButton";
import { useMobileMenu } from "./MobileMenuContext";

export default function TypeFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const { setOpen } = useMobileMenu();

  const activeButtton = searchParams.get("type");

  function handleTypeClick(type) {
    const params = new URLSearchParams(searchParams);
    params.set("type", type);
    router.replace(`${path}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="pl-6 pr-4 pt-6 pb-6 gap-x-2 gap-y-3.5 flex flex-row flex-wrap bg-white rounded-card-corner content-start md:items-start lg:p-6">
      <FilterButton
        filterClick={() => {
          handleTypeClick("all");
          setOpen(false);
        }}
        isClicked={activeButtton === "all"}
      >
        All
      </FilterButton>
      <FilterButton
        filterClick={() => {
          handleTypeClick("UI");
          setOpen(false);
        }}
        isClicked={activeButtton === "UI"}
      >
        UI
      </FilterButton>
      <FilterButton
        filterClick={() => {
          handleTypeClick("UX");
          setOpen(false);
        }}
        isClicked={activeButtton === "UX"}
      >
        UX
      </FilterButton>
      <FilterButton
        filterClick={() => {
          handleTypeClick("enhancement");
          setOpen(false);
        }}
        isClicked={activeButtton === "enhancement"}
      >
        Enhancement
      </FilterButton>
      <FilterButton
        filterClick={() => {
          handleTypeClick("bug");
          setOpen(false);
        }}
        isClicked={activeButtton === "bug"}
      >
        Bug
      </FilterButton>
      <FilterButton
        filterClick={() => {
          handleTypeClick("feature");
          setOpen(false);
        }}
        isClicked={activeButtton === "feature"}
      >
        Feature
      </FilterButton>
    </div>
  );
}
