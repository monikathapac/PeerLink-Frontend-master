import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  FaExchangeAlt,
  FaHubspot,
  FaRocketchat,
  FaSignOutAlt,
  FaSkull,
  FaTools,
  FaUserAstronaut,
  FaUserSecret,
} from "react-icons/fa";
import { TbArrowBigUpLine } from "react-icons/tb";
import styles from "styles/Sidebar.module.css";
import AuthTopBar from "./AuthTopBar";

import { useTour } from "@reactour/tour";
import { fetcher, pgfetcher } from "fetchers/fetcher";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { tProfile } from "types/appTypes";

type Props = {
  children?: any;
};

function SideBar({ children }: Props) {
  const { data } = useSession();
  const { data: profile } = useSWR<tProfile>("/profile", fetcher, {
    refreshInterval: 10000,
  });
  // Guide to the user
  const { setIsOpen } = useTour();
  const { data: requests, mutate } = useSWR(
    `/profile/requests?p=1&items=10`,
    pgfetcher
  );
  const { data: notification } = useSWR("/notification", fetcher, {
    refreshInterval: 10000,
  });
  const router = useRouter();
  const totalItems = requests?.page.totalItems || 0; // Ensure a default value of 0 if totalItems is not defined
  const notificationsCount = notification ? notification.length : 0; // Ensure a default value of 0 if notification is not defined

  const numberOfNotification = totalItems + notificationsCount;
  return (
    <div className={styles.container}>
      <AuthTopBar />
      <div className={styles.sidebar}>
        <div className={styles.content}>
          {/* Profile Section */}
          {profile && (
            <div className={styles.profile}>
              <Image
                priority
                className={styles.picture}
                src={profile?.image}
                alt="PP"
                width={80}
                height={80}
              />
              <div className={styles.info}>
                <h3>{profile?.firstName + " " + profile?.lastName}</h3>
              </div>
            </div>
          )}

          {/* Items Section */}

          <h3>Explore Panel</h3>

          <div className={styles.item} onClick={() => router.push("/profile")}>
            <FaUserSecret className={styles.icon} size={30} />
            <p>Profile</p>
          </div>

          {data?.role == "Admin" && (
            <div className={styles.item} onClick={() => router.push("/admin")}>
              <FaSkull className={styles.icon} size={30} />
              <p>Admin</p>
            </div>
          )}

          <div
            className={`${styles.item} step-8`}
            onClick={() => router.push("/myconnection")}
          >
            <FaHubspot className={styles.icon} size={30} />
            <p>My Connections</p>
          </div>

          <div
            className={`${styles.item} step-9`}
            onClick={() => router.push("/messages")}
          >
            <FaRocketchat className={styles.icon} size={30} />
            <p>Messages</p>
            {profile && profile.unseen !== 0 && (
              <div className={styles.badge}>{profile.unseen}</div>
            )}
          </div>

          <div
            className={`${styles.item} step-10`}
            onClick={() => router.push("/requests")}
          >
            <FaUserAstronaut className={styles.icon} size={30} />
            <p>Notifications</p>
            {requests && (
              <div className={styles.badge}>{numberOfNotification}</div>
            )}
          </div>

          <div
            className={`${styles.item} step-11`}
            onClick={() => router.push("/explore")}
          >
            <FaExchangeAlt className={styles.icon} size={30} />
            <p>Explore More</p>
          </div>
          <div className={styles.item} onClick={() => setIsOpen(true)}>
            <TbArrowBigUpLine className={styles.icon} size={30} />
            <p>Quick Tour</p>
          </div>

          <div className={styles.devider} />
          <h3>Settings</h3>

          <div className={styles.item} onClick={() => router.push("/settings")}>
            <FaTools className={styles.icon} size={30} />
            <p>Settings</p>
          </div>

          <div className={styles.reditem} onClick={() => signOut()}>
            <FaSignOutAlt className={styles.icon} size={30} />
            <p>Log Out</p>
          </div>
        </div>

        <div className={styles.main}>
          {children}
          <div className={styles.mobile_bottom_menu}>
            <Link className={styles.menu} href="/profile">
              <FaUserSecret className={styles.icon} size={30} />
              <p>Profile</p>
            </Link>

            <Link className={`${styles.menu} step-8`} href="/myconnection">
              <FaHubspot className={styles.icon} size={30} />
              <p>Connec.</p>
            </Link>

            <Link className={`${styles.menu} step-9`} href="/conversations">
              <FaRocketchat className={styles.icon} size={30} />
              <p>Messages</p>
              {profile && profile.unseen !== 0 && (
                <div className={styles.badge}>{profile.unseen}</div>
              )}
            </Link>

            <Link className={`${styles.menu} step-10`} href="/explore">
              <FaExchangeAlt className={styles.icon} size={30} />
              <p>Explore</p>
            </Link>

            <Link className={`${styles.menu} step-11`} href="/requests">
              <FaUserAstronaut className={styles.icon} size={30} />
              <p>Notifications</p>
            </Link>

            {/* <Link className={styles.menu} href="/settings">
              <FaTools className={styles.icon} size={30} />
              <p>Settings</p>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
