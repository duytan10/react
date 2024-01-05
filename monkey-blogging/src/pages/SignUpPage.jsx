import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { Field } from "../components/field";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { useEffect, useState } from "react";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";

const SignUpPageStyles = styled.div`
    min-height: 100vh;
    padding: 40px;
    .logo {
        margin: 0 auto 20px;
    }
    .heading {
        text-align: center;
        color: ${(props) => props.theme.primary};
        font-weight: bold;
        font-size: 40px;
        margin-bottom: 60px;
    }
`;

const schema = yup.object({
    fullName: yup.string().required("Please enter your full name"),
    email: yup.string().email("Please enter valid email address").required("Please enter your email"),
    password: yup.string().min(8, "Your password must be at least 8 characters or greater").required("Please enter your password"),
});

const SignUpPage = () => {
    const [togglePassword, setTogglePassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        watch,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const handleSignUp = async (values) => {
        if (!isValid) return;
        const user = await createUserWithEmailAndPassword(auth, values.email, values.password);
        await updateProfile(auth.currentUser, {
            displayName: values.fullName,
        });
        const colRef = collection(db, "users");
        await addDoc(colRef, {
            name: values.fullName,
            email: values.email,
            password: values.password,
        });
        toast.success("Register successfully!");
    };

    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
            });
        }
    }, [errors]);

    return (
        <SignUpPageStyles>
            <div className="container">
                <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
                <h1 className="heading">Monkey Blogging</h1>
                <form onSubmit={handleSubmit(handleSignUp)} className="form">
                    <Field>
                        <Label htmlFor="fullName">Full name</Label>
                        <Input name="fullName" type="text" placeholder="Enter your full name" control={control} />
                    </Field>
                    <Field>
                        <Label htmlFor="email">Email address</Label>
                        <Input name="email" type="email" placeholder="Enter your email" control={control} />
                    </Field>
                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            name="password"
                            type={togglePassword ? "text" : "password"}
                            placeholder="Enter your password"
                            control={control}
                        >
                            {!togglePassword ? (
                                <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
                            ) : (
                                <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
                            )}
                        </Input>
                    </Field>
                    <Button type="submit" className="w-full max-w-[300px] mx-auto" isLoading={isSubmitting} disabled={isSubmitting}>
                        Sign Up
                    </Button>
                </form>
            </div>
        </SignUpPageStyles>
    );
};

export default SignUpPage;
