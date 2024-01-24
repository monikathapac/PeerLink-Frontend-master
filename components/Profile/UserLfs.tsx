import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import styles from "styles/Assets.module.css";
import { tAssets } from "types/appTypes";

type Props = {
  phoneNumber: string | undefined;
  lfs: Array<tAssets> | undefined;
};

const UserLfs = ({ lfs, phoneNumber }: Props) => {
  const [selected, setSelected] = useState<number>(0);
  const handleWhatsApp = () => {
    const assetsMessage = lfs
      ?.filter((el) => el.category !== null)
      ?.map(
        (el) =>
          `${el.category} : ${el.assets.map((item) => item.name).join(", ")}`
      )
      .join("\n");
    const message = encodeURIComponent(
      `Hey, I saw you are looking for ${assetsMessage}, I already have its subscription and I am will to share it with you for half the price. Please let me know if you are interested`
    );

    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(url);
  };
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {lfs?.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelected(index)}
            className={index == selected ? styles.tabActive : styles.tab}
          >
            {item.category}
          </div>
        ))}
      </div>
      {lfs && (
        <div className={styles.assets}>
          {lfs[selected]?.assets?.map((item) => (
            <div key={item.id} className={styles.asset}>
              <div className={styles.devider} />
              <div className={styles.icon}>
                <Image src={item.icon} alt={item.name} height={30} width={30} />
              </div>
              <div
                className={styles.flexlfs}
                style={{ justifyContent: "space-between" }}
              >
                <div className={styles.ss}>
                  <h4>{item.name}</h4>

                  <h5>
                    {moment(item.createdAt)
                      .add(new Date().getTimezoneOffset() * -1, "minute")
                      .fromNow()}
                  </h5>
                </div>
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
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserLfs;
