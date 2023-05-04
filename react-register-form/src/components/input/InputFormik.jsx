import { useField } from "formik";

const InputFormik = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-3 mb-5">
      <label className="cursor-pointer">
        {label}
        <input
          {...field}
          {...props}
          className="p-4 w-full border border-gray-100 rounded-lg bg-white outline-none transition-all focus:border-blue-500"
        />
      </label>
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputFormik;
