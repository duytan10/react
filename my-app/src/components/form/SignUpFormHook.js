import React from "react";
import { Controller, useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schemaValidation = Yup.object({
  firstName: Yup.string()
    .required("Please enter your first name")
    .max(10, "Must be 10 characters or less"),
});

const SignUpFormHook = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: yupResolver(schemaValidation), mode: "onChange" });
  const watchShowAge = watch("showAge", false);
  const onSubmit = async (values) => {
    return new Promise((resolve) => {
      if (isValid) {
        setTimeout(() => {
          resolve();
          reset({
            firstName: "",
            lastName: "",
            email: "",
          });
          console.log(values);
        }, 5000);
      }
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="p-10 w-full max-w-[500px] mx-auto"
    >
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="firstName">First Name</label>
        <MyInput
          control={control}
          name="firstName"
          id="firstName"
          placeholder="Enter your first name"
        ></MyInput>
        {/* <input
          type="text"
          id="firstName"
          placeholder="Enter your first name"
          className="p-4 rounded-md border border-gray-100"
          {...register("firstName", { required: true, maxLength: 10 })}
        /> */}
        {errors?.firstName && (
          <div className="text-sm text-red-500">
            {errors.firstName?.message}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter your first name"
          className="p-4 rounded-md border border-gray-100"
          {...register("lastName")}
        />
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          id="email"
          placeholder="Enter your email address"
          className="p-4 rounded-md border border-gray-100"
          {...register("email")}
        />
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <input type="checkbox" {...register("showAge")} />
        {watchShowAge && <input type="number" placeholder="Enter your age" />}
      </div>
      <div>
        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg"
        >
          {isSubmitting ? (
            <div className="mx-auto w-5 h-5 border-2 border-white border-t-2 border-t-transparent animate-spin rounded-full"></div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

const MyInput = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <input
      {...field}
      {...props}
      className="p-4 rounded-md border border-gray-100"
    />
  );
};

export default SignUpFormHook;
