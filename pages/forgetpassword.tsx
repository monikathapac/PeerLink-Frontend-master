import Footer from "components/Layout/Footer";

import SentVerificationEmail from "components/ResetPassword/SentVerificationEmail";

import { Navbar } from "components/Layout/Navbar";

import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import { useEffect } from "react";

import { Toaster } from "react-hot-toast";
import styles from "styles/Login.module.css";

const Forgetpassword = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.push("/profile");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Navbar />
      </div>
      <div className={styles.login}>
        <div className={styles.overlay}>
          <div className={styles.form}>
            <SentVerificationEmail />
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

export default Forgetpassword;
