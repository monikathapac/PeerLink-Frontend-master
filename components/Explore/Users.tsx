import React from "react";
import Image from "next/image";
import { tSearchDetails, tSearchProfile } from "types/appTypes";
import styles from "styles/Exploreuser.module.css";
import { fetcher } from "fetchers/fetcher";
import useSWR from "swr";
import { Dots } from "react-activity";
import { getFiriendStatus } from "components/Core/ConnectionStatus";
import { useRouter } from "next/router";

type Props = {
  user: tSearchProfile;
  asset: string;
};

function Users({ user, asset }: Props) {
  const router = useRouter();
  const { data: assetList } = useSWR<tSearchDetails>(
    `/search/${user.id}?asset=${asset}`,
    fetcher
  );

  const openUser = () => {
    router.push(`/profile/${user.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          src={user.image}
          alt={user.name}
          className={styles.image}
          height={100}
          width={100}
          priority
        />
        <div className={styles.items}>
          <h4 onClick={openUser}>{user.name}</h4>
          {assetList && <h3>{getFiriendStatus(assetList.status)}</h3>}
          <h3>
            {assetList?.assetCount}{" "}
            {assetList && (assetList?.assetCount > 1 ? "Assets" : "Asset")}
          </h3>
          {!assetList && <Dots style={{ marginLeft: 20 }} />}
          <div className={styles.assets}>
            {assetList &&
              assetList.assets.map((asset) => (
                <div key={asset.id} className={styles.asset}>
                  <Image
                    src={asset.icon}
                    alt={asset.name}
                    height={30}
                    width={30}
                    className={styles.icon}
                  />
                  {/* {asset.name} */}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
