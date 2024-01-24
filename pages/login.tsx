import { Navbar } from "components/Layout/Navbar";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Digital, Dots } from "react-activity";
import toast, { Toaster } from "react-hot-toast";
import styles from "styles/Login.module.css";

import { useTour } from "@reactour/tour";
import Footer from "components/Layout/Footer";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const { status } = useSession();
  const { setIsOpen } = useTour();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status === "authenticated") router.push("/profile");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const res: any = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (res.ok) {
      router.push("/");
      setIsOpen(true);
    } else {
      {
        toast("Failed to login! You have entered a wrong Email or Password!", {
          icon: "❌",
          style: {
            borderRadius: "5px",
            background: "#03045e",
            color: "#fff",
            fontSize: 13,
          },
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Navbar />
      </div>
      <div className={styles.login}>
        <div className={styles.overlay}>
          <div className={styles.form}>
            <div className={styles.heading}>
              <h1>Sign in</h1>
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
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.input}>
              <input
                className={styles.field}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link className={styles.rplink} href="/forgetpassword">
              Forgot Password?
            </Link>
            <button className={styles.button} onClick={handleSubmit}>
              {isLoading ? <Dots color="white" size={20} /> : "Login"}
            </button>

            <div className={styles.reg}>
              Do not have an account?
              <Link className={styles.link} href="/register">
                Create one for free
              </Link>
            </div>
          </div>
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

export default Login;
