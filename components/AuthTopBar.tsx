import { fetcher, pgfetcher } from "fetchers/fetcher";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Dots } from "react-activity";
import { BiSearchAlt } from "react-icons/bi";
import { FaTools, FaUserFriends } from "react-icons/fa";
import styles from "styles/TopBar.module.css";
import useSWR from "swr";
import { tProfile, tSearchProfile } from "types/appTypes";
import ReqList from "./Lists/ReqList";
import FriendStatus from "./Search/FriendStatus";
import ShortAssetList from "./Search/ShortAssetList";

type Props = {};

function AuthTopBar({}: Props) {
  const { data } = useSession();
  const [isReqOpen, setIsReqOpen] = useState<boolean>(false);
  const { data: requests, mutate } = useSWR(
    `/profile/requests?p=1&items=10`,
    pgfetcher
  );
  const [search, setSearch] = useState<string>("");
  const { data: sResult, error } = useSWR<Array<tSearchProfile>>(
    search.length > 3 ? `/search?asset=${search}` : null,
    fetcher
  );
  const { data: profile } = useSWR<tProfile>("/profile", fetcher);
  const router = useRouter();

  return (
    <div className={styles.authNav}>
      <div className={styles.leftBar}>
        <Link href="/" className={styles.link}>
          <Image
            src={require("../assets/Peerlink-logo.svg")}
            alt="peerLinkLogo"
            title="peerLinkLogo"
            width={185}
            height={69}
          />
        </Link>
      </div>

      <div className={styles.midBar}>
        <div className={styles.mobileHeader}>
          <div>
            <Image
              src={require("../assets/Peerlink-logo.svg")}
              alt="peerLinkLogo"
              title="peerLinkLogo"
              width={135}
              height={40}
            />
          </div>
          <div>
            <Link className={styles.reditem} href="/settings">
              <FaTools className={styles.icon} />
              <p>Settings</p>
            </Link>
          </div>
        </div>
        <div className={styles.search}>
          <div className={styles.icon}>
            <BiSearchAlt size={20} className="step-1" />
          </div>
          <input
            type="Text"
            className={styles.field}
            placeholder="Search for Assets (e.g. Netflix, HDFC Card, Data Structure Course)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search.length > 3 && (
            <div className={styles.container}>
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
                  </div>
                  <ShortAssetList id={item.id} search={search} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.rightBar}>
        {profile && (
          <div className={styles.profile}>
            <Image
              priority
              className={styles.picture}
              src={profile.image}
              alt="PP"
              width={40}
              height={40}
            />
            <div className={styles.info}>
              <p>
                {profile?.firstName} {profile?.lastName}
              </p>
              <p>{data?.role}</p>
            </div>
          </div>
        )}
        <div
          className={styles.requests}
          onClick={() => setIsReqOpen(!isReqOpen)}
        >
          <div className={styles.badge}>
            {requests && Number(requests.page.totalItems)}
          </div>
          <FaUserFriends size={20} color="#213053" />
        </div>
        {isReqOpen && requests && requests?.page.totalItems > 0 && (
          <div className={styles.tab}>
            <ReqList data={requests?.data} mutate={mutate} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthTopBar;
