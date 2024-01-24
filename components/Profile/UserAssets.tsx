import { Add } from "fetchers/changer";
import { fetcher } from "fetchers/fetcher";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import styles from "styles/Assets.module.css";
import useSWR from "swr";
import { tAssets, tUserAsset } from "types/appTypes";

type Props = {
  phoneNumber: string | undefined;
  assets: Array<tAssets> | undefined;
  uid: string | undefined;
};

const UserAssets = ({ phoneNumber, assets, uid }: Props) => {
  const [selected, setSelected] = useState<number>(0);
  const [requestList, setRequestList] = useState<Array<string>>([]);

  const sendRequest = async (item: tUserAsset) => {
    toast.loading("Sending request");
    var result = await Add("/message/new", {
      uid,
      body: `Hello, I am requesting you to share your ${item.name}.`,
    });
    toast.dismiss();
    if (result) {
      toast.success("Request Sent!");
      setRequestList((list) => [...list, item.id]);
    } else toast.error("Failed To Send Request!");
  };
  var {
    data: assetsData,
    error: aerror,
    mutate: aMutate,
  } = useSWR<Array<tAssets>>("/profile/assets", fetcher);
  const handleWhatsApp = () => {
    const assetsMessage = assets
      ?.filter((el) => el.category !== null)
      ?.map(
        (el) =>
          `${el.category} : ${el.assets.map((item) => item.name).join(", ")}`
      )
      .join("\n");
    const message = encodeURIComponent(
      `Hey, I saw you have ${assetsMessage}, I am willing to share it with you. Please let me know how can I compensate you for the same.`
    );

    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(url);
  };
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {assets?.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelected(index)}
            className={index == selected ? styles.tabActive : styles.tab}
          >
            {item.category}
          </div>
        ))}
      </div>
      {assets && (
        <div className={styles.assets}>
          {assets[selected]?.assets?.map((item) => (
            <div key={item.id} className={styles.asset}>
              <div className={styles.devider} />
              <div className={styles.icon}>
                <Image src={item.icon} alt={item.name} height={30} width={30} />
              </div>
              <div className={styles.item}>
                <div>
                  <h4>{item.name}</h4>
                  <h5>
                    {moment(item.createdAt)
                      .add(new Date().getTimezoneOffset() * -1, "minute")
                      .fromNow()}
                  </h5>
                </div>
                <div style={{ display: "flex", gap: ".4rem" }}>
                  {phoneNumber ? (
                    <AiOutlineWhatsApp
                      size={23}
                      onClick={() => handleWhatsApp()}
                      className={styles.whatsapp_icon}
                    />
                  ) : (
                    <AiOutlineWhatsApp
                      size={23}
                      onClick={() => handleWhatsApp()}
                      className={styles.greyedOutIcon}
                    />
                  )}
                  {!requestList.includes(item.id) && (
                    <div
                      className={styles.request}
                      onClick={() => sendRequest(item)}
                    >
                      <BsFillChatSquareQuoteFill
                        size={13}
                        style={{ margin: 0 }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAssets;
