import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputFormik from "../input/InputFormik";
import RadioFormik from "../radio/RadioFormik";
import DropdownFormik from "../dropdown/DropdownFormik";
import CheckboxFormik from "../checkbox/CheckboxFormik";

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

const RegisterFormik = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        gender: "male",
        job: "",
        term: false,
      }}
      validationSchema={Yup.object({
        username: Yup.string().required("Please enter your username"),
        email: Yup.string()
          .email("Please enter valid email address")
          .required("Please enter your email"),
        password: Yup.string()
          .min(8, "Password must be at least eight character")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            {
              message:
                "Password must be contain at least one uppercase letter, one lowercase letter, one number and one special character",
            }
          )
          .required("Please enter your password"),
        gender: Yup.string()
          .required("Please choose your gender")
          .oneOf(["male", "female"], "You can only choose male or female"),
        job: Yup.string().required("Please choose your job"),
        term: Yup.boolean().oneOf(
          [true],
          "Please check the terms and conditions"
        ),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log(values);
          setSubmitting(false);
          resetForm();
        }, 3000);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="max-w-[300px] mx-auto my-10">
          <InputFormik
            name="username"
            type="text"
            label="Username"
            placeholder="Enter your username"
          ></InputFormik>
          <InputFormik
            name="email"
            type="email"
            label="Email address"
            placeholder="Enter your email address"
          ></InputFormik>
          <InputFormik
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
          ></InputFormik>
          <div className="flex flex-col gap-3 mb-5">
            <label>Gender</label>
            <div className="flex items-center gap-5">
              <RadioFormik
                name="gender"
                value="male"
                label="Male"
                checked={values.gender === "male"}
              ></RadioFormik>
              <RadioFormik
                name="gender"
                value="female"
                label="Female"
                checked={values.gender === "female"}
              ></RadioFormik>
            </div>
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <DropdownFormik
              name="job"
              data={dataDropdown}
              dropdownLabel="Select your job"
              dropdownValue={values.job}
            ></DropdownFormik>
          </div>
          <CheckboxFormik
            name="term"
            text="I accept the terms and conditions"
          ></CheckboxFormik>
          <button
            type="submit"
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
        </Form>
      )}
    </Formik>
  );
};

export default RegisterFormik;
