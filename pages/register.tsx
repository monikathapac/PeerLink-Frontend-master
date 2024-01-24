import { yupResolver } from "@hookform/resolvers/yup";
import Footer from "components/Layout/Footer";
import { Navbar } from "components/Layout/Navbar";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Digital, Dots } from "react-activity";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import styles from "styles/Login.module.css";
import { RegistrationSchema } from "validations/SignUp";

const Register = () => {
  const { status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(RegistrationSchema),
  });

  const getMessage = (message: any) => {
    return message ? message : null;
  };

  const submitForm = async (data: any) => {
    setIsLoading(true);
    var res: any = await fetch("https://api.offshare.online/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      setIsLoading(false);
      toast.success("SignUp successful! Please Login now!");
      router.push("/login");
    } else if (res.status === 400) {
      setIsLoading(false);
      res.text().then((e: any) => {
        if (e === "aae")
          toast.error("Account already exist with this email address!");
        else toast.error("Something went wrong!");
      });
    } else toast.error("Internal server error!");
    setIsLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated") router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Navbar />
      </div>
      <div className={styles.login}>
        <div className={styles.overlay}>
          <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
            <div className={styles.heading}>
              <h1>Sign Up</h1>
              <p>Enter your account details below</p>
              {status === "loading" && (
                <div>
                  <Digital color="#03045e" size={20} />
                  <p>Checking you info!</p>
                </div>
              )}
            </div>

            <div className={styles.input}>
              <input
                className={styles.field}
                type="text"
                placeholder="First Name"
                {...register("firstName")}
              />
              <div className={styles.error}>
                {getMessage(errors.firstName?.message)}
              </div>
            </div>
            <div className={styles.input}>
              <input
                className={styles.field}
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
              />
              <div className={styles.error}>
                {getMessage(errors.lastName?.message)}{" "}
              </div>
            </div>

            <div className={styles.input}>
              <input
                className={styles.field}
                type="text"
                placeholder="Address"
                {...register("address")}
              />
              <div className={styles.error}>
                {getMessage(errors.address?.message)}{" "}
              </div>
            </div>

            <div className={styles.input}>
              <input
                className={styles.field}
                type="text"
                placeholder="Phone Number"
                {...register("phoneNumber")}
              />
              <div className={styles.error}>
                {getMessage(errors.phoneNumber?.message)}{" "}
              </div>
            </div>

            <div className={styles.input}>
              <input
                className={styles.field}
                type="text"
                placeholder="Email Address"
                {...register("email")}
              />
              <div className={styles.error}>
                {getMessage(errors.email?.message)}{" "}
              </div>
            </div>

            <div className={styles.input}>
              <input
                className={styles.field}
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <div className={styles.error}>
                {getMessage(errors.password?.message)}{" "}
              </div>
            </div>

            <div className={styles.input}>
              <input
                className={styles.field}
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              <div className={styles.error}>
                {errors.confirmPassword && "Password didn't match!"}
              </div>
            </div>
            <button className={styles.button}>
              {isLoading ? <Dots color="white" size={20} /> : "Register"}
            </button>
          </form>
          <div className={styles.gifContainer}>
            <Image
              src={require("assets/peerlink_into_gif.gif")}
              alt="Hero"
              className={styles.image}
              unoptimized={true}
            />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Register;
