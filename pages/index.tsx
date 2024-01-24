import AssetCard from "components/Cards/AssetCard";
import Carousel from "components/Carousel/Carousel";
import Faq from "components/faq";
import Advantage from "components/LandingPage/Advantages/Advantage";
import FaqSection from "components/LandingPage/Faq/Faq";
import { Hero } from "components/LandingPage/Hero";
import HowItWorks from "components/LandingPage/HowItWorks/HowItWorks";
import ShareAndJoin from "components/LandingPage/ShareAndJoin/ShareAndJoin";
import TestimonialCarousel from "components/LandingPage/TestimonialCarousel/TestimonialCarousel";
import Layout from "components/Layout/Layout";
import { fetcher, noAuthFetcher } from "fetchers/fetcher";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { tProfile } from "types/appTypes";
import { tAssets } from "types/tHome";
import { StreamingServiceData } from "utils/StreamingServicesData";

export default function Home() {
  // Next.js Router instance
  const router = useRouter();

  // Fetch assets data using SWR
  const { data: assets, mutate } = useSWR<Array<tAssets>>(
    "/home/assets",
    noAuthFetcher
  );

  // State to manage authentication status
  const [auth, setAuth] = useState(false);

  // Next.js Auth Session Hook
  const { status, data } = useSession();

  // Fetch user profile data using SWR if authenticated
  const { data: profile } = useSWR<tProfile>(
    status == "authenticated" ? "/profile" : null,
    fetcher
  );

  // Carousel items
  const carouselItems = [
    StreamingServiceData.map((d, i) => {
      return (
        <AssetCard
          key={i}
          title={d.title}
          subscriptionInfo={d.subscriptionInfo}
          discountedPrice={d.discountedPrice}
          originalPrice={d.originalPrice}
          logoUrl={d?.logoUrl}
        />
      );
    }),
  ];

  // tabs

  // Effect to redirect to profile page after authentication
  useEffect(() => {
    if (status === "authenticated") {
      setTimeout(() => {
        router.push("/profile");
      }, 1000); // Adjust the delay time as needed
      toast.success("SignIn Verified! Redirecting to Profile");
    }
  }, [status]);

  return (
    <div id="main">
      <Head>
        {/* Uncomment and customize the title if needed */}
        <title>PeerLink</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          content="LjfWa19Y97KA4L-qK9ijSFEiuhUkNNSGAgc-nd3znRE"
        />
        {/* Google Tag Manager Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T5623LRW');`,
          }}
        />

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=GTM-T5623LRW`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
      </Head>

      {/* Google Tag Manager (noscript) */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T5623LRW"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      />
      {/* End Google Tag Manager (noscript) */}

      {/* Navbar */}
      <Layout>
        <Hero />
        {/* Render the Carousel component with predefined items */}
        <div className="mx-auto max-w-7xl mb-12">
          <Carousel items={carouselItems} />
        </div>

        <div className="mx-auto max-w-7xl mb-12 mt-12">
          <ShareAndJoin />
          <HowItWorks />
        </div>
        <TestimonialCarousel />
        <Advantage />
        <FaqSection />
      </Layout>
    </div>
  );
}
