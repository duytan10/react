import { useForm } from "react-hook-form";
import InputHook from "../input/InputHook";
import RadioHook from "../radio/RadioHook";
import CheckboxHook from "../checkbox/CheckboxHook";
import DropdownHook from "../dropdown/DropdownHook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required("Please enter your username"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email"),
    password: yup
      .string()
      .min(8, "Password must be at least eight character")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must be contain at least one uppercase letter, one lowercase letter, one number and one special character",
        }
      )
      .required("Please enter your password"),
    gender: yup
      .string()
      .required("Please choose your gender")
      .oneOf(["male", "female"], "You can only choose male or female"),
    job: yup.string().required("Please choose your job"),
    terms: yup.boolean().required("Please accept the terms"),
  })
  .required();

const dataDropdown = [
  {
    id: 1,
    value: "developer",
    text: "Developer",
  },
  {
    id: 2,
    value: "doctor",
    text: "Doctor",
  },
  {
    id: 3,
    value: "designer",
    text: "Designer",
  },
  {
    id: 4,
    value: "singer",
    text: "Singer",
  },
];

const RegisterHook = () => {
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    setValue,
    reset,
    watch,
  } = useForm({ resolver: yupResolver(schema), defaultValues: "male" });
  const onSubmitHandler = (values) => {
    if (!isValid) return;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        reset({
          username: "",
          email: "",
          password: "",
          gender: "male",
          job: "",
          terms: false,
        });
        console.log(values);
      }, 3000);
    });
  };
  const watchGender = watch("gender");
  console.log("file: RegisterHook.jsx:86 ~ watchGender:", watchGender);
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="max-w-[300px] mx-auto my-10"
    >
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="username" className="cursor-pointer">
          Username
        </label>
        <InputHook
          name="username"
          placeholder="Enter your username"
          id="username"
          control={control}
          type="text"
        ></InputHook>
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="email" className="cursor-pointer">
          Email address
        </label>
        <InputHook
          name="email"
          placeholder="Enter your email"
          id="email"
          control={control}
          type="text"
        ></InputHook>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="password" className="cursor-pointer">
          Password
        </label>
        <InputHook
          name="password"
          placeholder="Enter your password"
          id="password"
          control={control}
          type="text"
        ></InputHook>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label>Gender</label>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-x-3">
            <RadioHook
              name="gender"
              control={control}
              value="male"
              checked={watchGender === "male"}
            ></RadioHook>
            <span>Male</span>
          </div>
          <div className="flex items-center gap-x-3">
            <RadioHook
              name="gender"
              control={control}
              value="female"
              checked={watchGender === "female"}
            ></RadioHook>
            <span>Female</span>
          </div>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label>Are you</label>
        <DropdownHook
          control={control}
          setValue={setValue}
          name="job"
          data={dataDropdown}
          dropdownLabel="Select your job"
        ></DropdownHook>
        {errors.job && (
          <p className="text-red-500 text-sm">{errors.job.message}</p>
        )}
      </div>
      <div>
        <CheckboxHook
          control={control}
          text="I accept the terms and conditions"
          name="terms"
        ></CheckboxHook>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}
      </div>
      <button
        className={`w-full p-5 bg-blue-500 text-white rounded-lg mt-5 font-semibold ${
          isSubmitting ? "opacity-50" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin mx-auto"></div>
        ) : (
          "Submmit"
        )}
      </button>
    </form>
  );
};

export default RegisterHook;
