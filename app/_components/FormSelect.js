"use client";

import Image from "next/image";
import { useState } from "react";
import { useOutsideClick } from "@/app/_lib/useOutsideClick";

function FormSelect({
  selectOptions,
  selectedOption,
  handleOption,
  disabled,
  labeledBy,
}) {
  const [showDropdown, setShowDropDown] = useState(false);

  const close = (e) => {
    setShowDropDown(false);
  };
  const ref = useOutsideClick(close, false);

  function handleOptionSelect(value) {
    handleOption(value);
    setShowDropDown(false);
  }

  function dropdownToggle(e) {
    e.preventDefault();
    setShowDropDown((curr) => !curr);
  }

  return (
    <div className="" ref={ref} aria-labelledby={labeledBy ? labeledBy : ""}>
      <button
        onClick={(e) => dropdownToggle(e)}
        className={`bg-blue-grey-100 rounded-[5px] h-[48px] px-6 py-[13px] flex flex-row items-center gap-2 hover:cursor-pointer w-full justify-between  hover:outline-blue hover:outline-1 active:border-blue focus-visible:outline-blue focus-visible:outline-1 focus:outline-blue  focus:outline-1 disabled:pointer-events-none disabled:text-blue-grey-500`}
        role="combobox"
        aria-label="select-button"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="select-dropdown"
        disabled={disabled}
      >
        <p className="text-blue-grey-700 text-[13px] md:text-[15px] capitalize">
          {selectedOption}
        </p>
        {!showDropdown && (
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1l4 4 4-4"
              stroke={disabled ? "#647196" : "#4661e6"}
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        )}
        {showDropdown && (
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 6l4-4 4 4"
              stroke={disabled ? "#647196" : "#4661e6"}
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        )}
      </button>

      <ul
        className={`${
          showDropdown ? "" : "hidden"
        } absolute translate-y-[16px] min-w-[255px] w-(--select-dropdown-mobile) md:w-(--select-dropdown) shadow-app rounded-card-corner bg-white list-none transition duration-300 ease-in-out z-10`}
        role="listbox"
        id="select-dropdown"
        aria-labelledby="select-button"
      >
        {selectOptions.map((option) => (
          <li
            key={option}
            onClick={(e) => handleOptionSelect(e.target.innerText)}
            className="flex flex-row items-center justify-between last:border-b-0 py-3 px-6 border-b-blue-grey-700 border-b-[0.5px] text-blue-grey-500 font-normal text-sm md:text-base capitalize hover:text-purple hover:cursor-pointer"
          >
            {option}
            {option === selectedOption && (
              <div>
                <Image
                  src="/icons/icon-check.svg"
                  width={13}
                  height={11}
                  alt="selected"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormSelect;
