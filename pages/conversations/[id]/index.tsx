import { Add } from "fetchers/changer";
import { fetcher } from "fetchers/fetcher";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Dots } from "react-activity";
import toast from "react-hot-toast";
import { IoSendSharp } from "react-icons/io5";
import { TiTick, TiTickOutline } from "react-icons/ti";
import styles from "styles/Message.module.css";
import useSWRInfinite from "swr/infinite";
import { tMessage } from "types/messageTypes";

type Props = {};

export default function Messages({}: Props) {
  const router = useRouter();
  const { id } = router.query;

  const endRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const [isLoadig, setIsLoadig] = useState<boolean>(false);
  const { data, mutate, size, isValidating } = useSWRInfinite(
    (index) => (id ? `/message/${id}?p=${index + 1}` : null),
    fetcher,
    { refreshInterval: 5000 }
  );

  const messages: Array<tMessage> = data ? [].concat(...data) : [];
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === "undefined";
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10);

  const sendMessage = async () => {
    if (message.trim().length == 0) return null;

    setIsLoadig(true);
    var result = await Add(`/message/${id}`, { reply: message });
    setIsLoadig(false);

    if (result) {
      mutate();
      toast.success("Message sent!", { position: "top-center" });
      setMessage("");
    } else {
      toast.error("Failed to send the message!", { position: "top-center" });
    }
  };

  const onEnterPress = async (e: any) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      await sendMessage();
    }
  };

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView(false);
  }, [data]);

  if (id == undefined) return null;

  return (
    <div className={styles.messages}>
      {/* <div className={styles.header}>
                <div className={styles.user}>
                    <Image src={c.image} alt="OffShare" className={styles.image} height={60} width={60} priority />
                    <div>
                        <h3>{c.user}</h3>
                        <h5>{moment(c.dateTime).add(new Date().getTimezoneOffset() * -1, "minute").fromNow()}</h5>
                    </div>
                </div>
            </div> */}

      <div className={styles.items}>
        <div style={{ height: 10 }} />

        {messages.map((item, i, { length }) => (
          <div
            key={item.id}
            className={item.owner ? styles.owner : styles.other}
          >
            {item.owner &&
              (item.isSeen ? (
                <TiTick color="rgb(85, 159, 255)" />
              ) : (
                <TiTickOutline color="rgb(85, 159, 255)" />
              ))}
            <div
              ref={i == length - 1 ? endRef : null}
              className={styles.content}
            >
              {item.reply}
            </div>
            {/* <p>{moment(item.dateTime).add(new Date().getTimezoneOffset() * -1, "minute").fromNow()}</p> */}
          </div>
        ))}
      </div>

      {!data && isValidating && (
        <div className={styles.loading}>
          {" "}
          <Dots />{" "}
        </div>
      )}

      <div className={styles.msgbox}>
        <textarea
          placeholder="Type your message here."
          name="message"
          spellCheck
          onKeyDown={onEnterPress}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className={styles.buttons}>
          <IoSendSharp className={styles.send} onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
}
