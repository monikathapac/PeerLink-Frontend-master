/* eslint-disable react-hooks/exhaustive-deps */
import { Characters } from "components/Core/StringManipulator";
import MessageList from "components/Messages/Messages";
import SideBar from "components/SideBar";
import { fetcher } from "fetchers/fetcher";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dots } from "react-activity";
import styles from "styles/Message.module.css";
import useSWRInfinite from "swr/infinite";
import { tConversations } from "types/messageTypes";

const Messages = () => {
  const [c, setC] = useState<tConversations | undefined>();
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

  useEffect(() => {
    if (!c && conversations.length > 0) {
      setC(conversations[0]);
    }
  }, [conversations]);

  return (
    <SideBar>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.conversations}>
            {conversations.map((item) => (
              <div
                key={item.id}
                className={styles.conversation}
                style={c?.id == item.id ? { backgroundColor: "#e8e8e8" } : {}}
                onClick={() => setC(item)}
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
          <div className={styles.messages}>
            <MessageList c={c} m={mutate} />
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default Messages;
