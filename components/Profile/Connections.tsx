import { fetcher } from "fetchers/fetcher";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "styles/Connections.module.css";
import useSWR from "swr";
import { tConnectionList } from "types/tConnection";

type Props = {};

const Connections = (props: Props) => {
  var router = useRouter();
  var {
    data: connections,
    error: cerror,
    mutate: coMutate,
  } = useSWR<Array<tConnectionList>>("/profile/connections", fetcher);

  return (
    <>
      <div className={styles.heading}>
        <div>Connections</div>
      </div>
      <div className={styles.Container}>
        {connections?.map((conn) => (
          <div className={styles.connection} key={conn.id}>
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
              <h4>{conn.isAccepted ? "Accepted" : "Pending"}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Connections;
