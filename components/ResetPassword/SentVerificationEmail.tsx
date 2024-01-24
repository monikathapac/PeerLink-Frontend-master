import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Digital, Dots } from "react-activity";
import toast from "react-hot-toast";
import styles from "styles/Login.module.css";

const SentVerificationEmail: React.FC = () => {
  const router = useRouter();

  const { status } = useSession();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<string>(
    "sentVerificationEmail"
  );
  const [verificationCode, setVerificationCode] = useState<number | string>("");

  const handleVerificationEmailSubmit = async () => {
    if (email === "") {
      toast.error("Please enter an email address");
    } else {
      setIsLoading(true);
      console.log(email);

      await axios
        .post("https://api.offshare.online/auth/get-otp", {
          email: email,
        })
        .then((response) => {
          toast.success("Verification code sent successfully!");
          setCurrentStep("verifyCode");
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);

          toast.error("there is no account associated with this email");
        });

      setIsLoading(false);
    }
  };
  const handleVerificationCodeSubmit = async () => {
    setIsLoading(true);

    console.log(verificationCode);

    await axios
      .post("https://api.offshare.online/auth/verify-otp", {
        email: email,
        otp: verificationCode,
      })
      .then((response) => {
        toast.success("code verified successfully");

        setCurrentStep("resetPassword");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);

        toast.error("Please enter the valid code");
      });

    // If verification is successful, move to the next step
    setIsLoading(false);
  };
  const handleResetPasswordSubmit = async () => {
    setIsLoading(true);

    await axios
      .post("https://api.offshare.online/auth/reset-pass", {
        email: email,
        otp: verificationCode,
        password: password,
      })
      .then((response) => {
        toast.success("passsword updated sucessfully");

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);

        toast.error("Error in updating the password");
      });
    // If reset is successful, you can redirect the user to the login page or handle it as needed
    // For example, you can show a success message and reset the state to the initial step.
    router.push("/login");
    setIsLoading(false);
  };

  return (
    <>
      {/* sentVerificationEmail */}
      {currentStep === "sentVerificationEmail" ? (
        <>
          <div className={styles.heading}>
            <h1>Forgot Password</h1>
            <p>Enter your account details below</p>
            {status === "loading" && (
              <div>
                <Digital color="#03045e" size={20} />
                <p>Checking your info!</p>
              </div>
            )}
          </div>
          <div className={styles.input}>
            <input
              className={styles.field}
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={handleVerificationEmailSubmit}
            className={styles.button}
          >
            {isLoading ? (
              <Dots color="white" size={20} />
            ) : (
              "Sent Verification Code"
            )}
          </button>
        </>
      ) : (
        ""
      )}
      {/* sentVerificationEmail */}
      {/* verifyCode */}
      {currentStep === "verifyCode" ? (
        <>
          <div className={styles.heading}>
            <h1>Enter Verification Code</h1>
          </div>
          <div className={styles.input}>
            <input
              className={styles.field}
              type="number"
              placeholder="6 digit verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <button
            className={styles.button}
            onClick={handleVerificationCodeSubmit}
          >
            {isLoading ? (
              <Dots color="white" size={20} />
            ) : (
              "Submit Verification Code"
            )}
          </button>
        </>
      ) : (
        ""
      )}
      {/* verifyCode */}
      {currentStep === "resetPassword" ? (
        <>
          <div className={styles.heading}>
            <h1>Reset Password</h1>
          </div>
          <div className={styles.input}>
            <input
              className={styles.field}
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.button} onClick={handleResetPasswordSubmit}>
            {isLoading ? <Dots color="white" size={20} /> : "Reset Password"}
          </button>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default SentVerificationEmail;
