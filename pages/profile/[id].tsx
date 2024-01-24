import Error from "components/Lottie/Error";
import Loading from "components/Lottie/Loading";
import UserAssets from "components/Profile/UserAssets";
import UserLfs from "components/Profile/UserLfs";
import SideBar from "components/SideBar";
import { dfetcher } from "fetchers/fetcher";
import { sendRequest } from "fetchers/friends";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "styles/Profile.module.css";
import useSWR from "swr";
import { tUserProfile } from "types/appTypes";

const OtherForfile = () => {
  const router = useRouter();
  const userId = router.query.id;

  const {
    data: profile,
    error,
    mutate,
  } = useSWR<tUserProfile>(userId ? ["/profile", userId] : null, dfetcher);

  if (!profile && !error) return <Loading />;
  if (error) return <Error />;
  return (
    <SideBar>
      <div className={styles.block}>
        <div className={styles.content}>
          <div className={styles.uProfile}>
            <div className={styles.left}>
              {profile && (
                <div className={styles.profile}>
                  <Image
                    src={profile.image}
                    alt="Profile"
                    className={styles.picture}
                    width={80}
                    height={80}
                  />
                  <div className={styles.info}>
                    <h3>{profile.firstName + " " + profile?.lastName}</h3>
                    <h4>{profile.mutual} Mutual Connections</h4>
                    <h5>{profile.address}</h5>
                  </div>
                </div>
              )}

              {!profile?.isRequested && profile && (
                <div
                  className={styles.button}
                  onClick={() => sendRequest(profile.id, mutate)}
                >
                  Send Request
                </div>
              )}

              {profile?.isRequested && !profile.isAccepted && (
                <div className={styles.button}>Pending</div>
              )}
            </div>
            {/* <div className={styles.right}>
                            <h4>Total Connections 0</h4>
                            <h4>Total Connections 0</h4>
                            <h4>Total Connections 0</h4>
                        </div> */}
          </div>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.content}>
          <h1>Assets</h1>
          <UserAssets
            phoneNumber={profile?.phoneNumber}
            assets={profile?.assets}
            uid={profile?.id}
          />
        </div>
      </div>

      <div className={styles.block}>
        <div className={styles.content}>
          <h1>Looking For</h1>
          <UserLfs phoneNumber={profile?.phoneNumber} lfs={profile?.lfs} />
        </div>
      </div>
    </SideBar>
  );
};

export default OtherForfile;
