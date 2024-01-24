import FriendStatus from "components/Search/FriendStatus";
import ShortAssetList from "components/Search/ShortAssetList";
import { fetcher } from "fetchers/fetcher";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Dots } from "react-activity";
import { BiSearchAlt2 } from "react-icons/bi";
import { HiCursorArrowRays } from "react-icons/hi2";
import useSWR from "swr";
import { tProfile, tSearchProfile } from "types/appTypes";
import styles from "../styles/Search.module.css";
import { useSession } from "next-auth/react";
import Router from "next/router";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const { data: sResult, error } = useSWR<Array<tSearchProfile>>(
    search.length > 3 ? `/search?asset=${search}` : null,
    fetcher
  );
  const { data: profile } = useSWR<tProfile>("/profile", fetcher);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.push("/");
  }, [status]);
  return (
    <>
      <div className={styles.belowSearchMenu}>
        <Link className={styles.menu} href="/profile">
          {profile && (
            <div className={styles.profile}>
              <div className={styles.info}>
                <p>Visit Your Profile</p>
                <HiCursorArrowRays size={25} />
              </div>
            </div>
          )}
        </Link>
      </div>
      <div className={styles.container}>
        <div>
          <Image
            src={require("../assets/Peerlink-logo.svg")}
            alt="peerLinkLogo"
            title="peerLinkLogo"
            className={styles.logoimage}
            width={360}
            height={120}
          />
        </div>
        <div className={styles.search}>
          <div className={styles.icon}>
            <BiSearchAlt2 size={20} fontWeight="normal" />
          </div>
          <input
            type="Text"
            className={styles.field}
            placeholder="Search for Assets (e.g. Netflix, HDFC Card, Data Structure Course)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search.length > 3 && (
            <div className={styles.containerSearch}>
              {!sResult && (
                <div className={styles.message}>
                  {" "}
                  Looking For Users <div style={{ width: 10 }} />
                  <Dots />{" "}
                </div>
              )}
              {sResult?.length == 0 && (
                <div className={styles.message}> No Result Found! </div>
              )}
              {sResult?.map((item) => (
                <div
                  key={item.id}
                  className={styles.user}
                  onClick={() => router.push("/profile/" + item.id)}
                >
                  <Image
                    src={item.image}
                    height={35}
                    width={35}
                    alt="Profile"
                    className={styles.image}
                  />
                  <div className={styles.name}>
                    <h4>{item.name}</h4>
                    <h3>
                      <FriendStatus id={item.id} search={search} />
                    </h3>
                    <div className={styles.mobilelist}>
                      <ShortAssetList id={item.id} search={search} />
                    </div>
                  </div>
                  <div className={styles.desktoplist}>
                    <ShortAssetList id={item.id} search={search} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
