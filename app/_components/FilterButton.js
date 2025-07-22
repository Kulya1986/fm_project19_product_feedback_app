function FilterButton({ filterClick, isClicked, noHover, children }) {
  const bgColor = isClicked
    ? " disabled:bg-blue disabled:text-white disabled:hover:bg-blue disabled:hover:text-white disabled:hover:cursor-default"
    : noHover
    ? " disabled:bg-blue-grey-200  disabled:hover:bg-blue-grey-200"
    : !noHover
    ? " disabled:bg-blue-grey-200  disabled:hover:bg-blue-grey-200 disabled:hover:cursor-default"
    : " ";
  const base =
    "py-1.5 text-blue font-semibold px-4 capitalize text-[13px] rounded-card-corner bg-blue-grey-200  hover:bg-blue-grey-400 hover:cursor-pointer " +
    bgColor;

  return (
    <button
      className={base}
      onClick={(e) => {
        e.stopPropagation();
        filterClick();
      }}
      disabled={isClicked || noHover || noHover === false}
    >
      {children}
    </button>
  );
}

export default FilterButton;
