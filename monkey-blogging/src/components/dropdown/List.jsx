import { useDropdown } from "./dropdown-context";

// eslint-disable-next-line react/prop-types
const List = ({ children }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && <div className="absolute left-0 w-full bg-white shadow-sm top-full">{children}</div>}
    </>
  );
};

export default List;
