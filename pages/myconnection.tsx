import React from "react";
import Image from "next/image";
import useSWR from "swr";
import styles from "styles/Connections.module.css";
import { tConnectionList } from "types/tConnection";
import { fetcher } from "fetchers/fetcher";
import { useRouter } from "next/router";
import SideBar from "components/SideBar";

type Props = {};

const MyConnection = (props: Props) => {
  var router = useRouter();
  var {
    data: connections,
    error: cerror,
    mutate: coMutate,
  } = useSWR<Array<tConnectionList>>("/profile/connections", fetcher);
  // console.log(connections);

  return (
    <>
      <SideBar>
        <div className={styles.heading}>
          <div>Friends ({connections?.length})</div>
        </div>
        <div className={styles.Container}>
          {connections?.map((conn) => (
            <div
              style={{ backgroundColor: "transparent" }}
              className={styles.connection}
              key={conn.id}
            >
              <Image
                className={styles.picture}
                src={conn.image}
                alt={conn.name}
                width={80}
                height={80}
              />
              <div className={styles.info}>
                <h3 onClick={() => router.push(`/profile/${conn.userId}`)}>
                  {conn.name}
                </h3>
                {/* <h4>Assets: 6</h4>
                <h4>Shared: 2</h4>
                <h4>Rating: 4</h4> */}
              </div>
            </div>
          ))}
        </div>
      </SideBar>
    </>
  );
};

export default MyConnection;
