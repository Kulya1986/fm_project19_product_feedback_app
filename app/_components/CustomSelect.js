"use client";

import Image from "next/image";
import { useState } from "react";
import { useOutsideClick } from "@/app/_lib/useOutsideClick";

function CustomSelect({
  label,
  controlBG,
  arrowColor,
  selectOptions,
  selectedOption,
  handleOption,
}) {
  const buttonBg = "bg-" + controlBG;
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
    <div className="flex flex-row items-center gap-2" ref={ref}>
      {label && (
        <p
          className="text-[13px] md:text-sm font-normal tracking-normal text-blue-grey-200"
          aria-label="select-button"
        >
          {label}
        </p>
      )}

      <button
        onClick={(e) => dropdownToggle(e)}
        className={`${buttonBg} flex flex-row items-center gap-2 hover:cursor-pointer`}
        role="combobox"
        aria-label="select-button"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="select-dropdown"
      >
        <p className="text-blue-grey-200 font-bold text-[13px] md:text-sm capitalize">
          {selectedOption}
        </p>
        {!showDropdown && (
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1l4 4 4-4"
              stroke={arrowColor}
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
              stroke={arrowColor}
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
        } absolute translate-y-3/4 min-w-[255px] shadow-app rounded-card-corner bg-white list-none transition duration-300 ease-in-out z-10`}
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

export default CustomSelect;
