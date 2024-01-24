import { TourProvider } from "@reactour/tour";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "react-activity/dist/Digital.css";
import "react-activity/dist/Dots.css";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { steps } from "../utils/tourSteps";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <TourProvider steps={steps}>
      <SessionProvider session={session}>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </SessionProvider>
    </TourProvider>
  );
}
