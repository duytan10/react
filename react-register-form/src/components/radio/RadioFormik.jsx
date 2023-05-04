import { useField } from "formik";

const RadioFormik = (props) => {
  const [field] = useField(props);
  return (
    <div className="flex items-center gap-x-3">
      <label className="cursor-pointer custom-radio">
        <input
          type="radio"
          {...field}
          value={props.value}
          checked={props.checked}
          className="hidden"
        />
        <div className="w-full h-full bg-white rounded-full"></div>
      </label>
      <span>{props.label}</span>
    </div>
  );
};

export default RadioFormik;
