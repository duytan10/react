import { useController } from "react-hook-form";

const RadioHook = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: props.value,
  });
  return (
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
  );
};

export default RadioHook;
