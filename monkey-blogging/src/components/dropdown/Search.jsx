// eslint-disable-next-line react/prop-types
const Search = ({ placeholder, onChange, ...props }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-4 border border-gray-200 rounded outline-none"
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Search;
