import { Characters } from "components/Core/StringManipulator";
import SideBar from "components/SideBar";
import { fetcher } from "fetchers/fetcher";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dots } from "react-activity";
import styles from "styles/Message.module.css";
import useSWRInfinite from "swr/infinite";
import { tConversations } from "types/messageTypes";

type Props = {};

export default function Conversation({}: Props) {
  const router = useRouter();
  const { data, mutate, size, isValidating } = useSWRInfinite(
    (index) => `/message?p=${index + 1}`,
    fetcher,
    { refreshInterval: 5000 }
  );
  const conversations: Array<tConversations> = data ? [].concat(...data) : [];
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === "undefined";
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10);

  return (
    <SideBar>
      <h2 className={styles.heading} style={{ marginLeft: ".8rem" }}>
        Messages
      </h2>
      <div className={styles.conversations}>
        {conversations.map((item) => (
          <div
            key={item.id}
            className={styles.conversation}
            onClick={() => router.push(`/conversations/${item.id}`)}
          >
            <Image
              src={item.image}
              alt="PeerLink"
              height={55}
              width={55}
              className={styles.image}
              priority
            />
            <div>
              <h3>{item.user}</h3>
              <h4>{Characters(item.message, 40)}</h4>
              <h5>
                {moment(item.dateTime)
                  .add(new Date().getTimezoneOffset() * -1, "minute")
                  .fromNow()}
              </h5>
              {item.unseen > 0 && (
                <div className={styles.badge}>{item.unseen}</div>
              )}
            </div>
          </div>
        ))}

        {!data && isValidating && (
          <div className={styles.loading}>
            <Dots />
          </div>
        )}
      </div>
    </SideBar>
  );
}
