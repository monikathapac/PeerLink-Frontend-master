import SideBar from "components/SideBar";
import { Remove, Update } from "fetchers/changer";
import { fetcher, pgfetcher } from "fetchers/fetcher";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { TiTick, TiTimes } from "react-icons/ti";
import styles from "styles/Connections.module.css";
import style from "styles/RequestList.module.css";
import useSWR from "swr";
import { tConnectionList } from "types/tConnection";

type Props = {};

const Requests = (props: Props) => {
  var router = useRouter();
  var {
    data: connections,
    error: cerror,
    mutate: coMutate,
  } = useSWR<Array<tConnectionList>>("/profile/connections", fetcher);

  const { data: requests, mutate } = useSWR(
    `/profile/requests?p=1&items=10`,
    pgfetcher
  );
  const { data: notification } = useSWR("/notification", fetcher, {
    refreshInterval: 10000,
  });

  const acceptReq = async (id: string) => {
    const result = await Update(`/connection/${id}/`, "");

    if (result) toast.success("Connection added!");
    else toast.error("Failed to add Connection!");

    await mutate();
  };

  const regReq = async (id: string) => {
    const result = await Remove(`/connection`, id);

    if (result) toast.success("Connection rejected!");
    else toast.error("Failed to reject Connection!");

    await mutate();
  };

  const renderRequestMessage = (request: any) => {
    const senderName = request.name;

    return (
      <div>
        <div
          className={style.container}
          key={request.id}
          style={{ backgroundColor: "#D3D3D3", borderRadius: "50px" }}
        >
          <div className={style.left}>
            <div className={style.info}>
              <h2 style={{ fontWeight: "normal" }}>
                <strong>{request.name}</strong> sent you a friend request
              </h2>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.accept} onClick={() => acceptReq(request.id)}>
              <TiTick size={20} color="white" />
            </div>
            <div className={style.decline} onClick={() => regReq(request.id)}>
              <TiTimes size={20} color="white" />
            </div>
            <div className={style.info} style={{ padding: 5 }}>
              <h3>
                {moment(new Date(request.dateTime))
                  .add(new Date().getTimezoneOffset() * -1, "minute")
                  .fromNow()}
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const totalItems = requests?.page.totalItems || 0; // Ensure a default value of 0 if totalItems is not defined
  const notificationsCount = notification ? notification.length : 0; // Ensure a default value of 0 if notification is not defined

  const numberOfNotification = totalItems + notificationsCount;

  return (
    <>
      <SideBar>
        <div className={styles.heading}>
          <div>Notifications ({numberOfNotification})</div>
        </div>
        <div>
          <div className={styles.notificationContainer}>
            {" "}
            {notification?.map((d: any, i: number) => {
              return (
                <div className={styles.notification} key={i}>
                  <div className="">
                    {" "}
                    <Image
                      src={d?.asset?.icon}
                      height="30"
                      width={30}
                      alt="pp"
                      className={styles.image}
                    />
                  </div>
                  <div className="">
                    <p>{d.message}</p>

                    <p className={styles.time}>
                      {" "}
                      {moment(d.time)
                        .add(new Date().getTimezoneOffset() * -1, "minute")
                        .fromNow()}
                    </p>
                  </div>
                  <div>
                    {/* {" "}
                    <AiOutlineWhatsApp
                      size={27}
                      // onClick={() => handleWhatsApp()}
                      className={styles.whatsapp_icon}
                    /> */}
                  </div>
                </div>
              );
            })}
          </div>

          {requests && requests?.page.totalItems > 0 && (
            <div>
              {requests.data.map((request: any) => (
                <div key={request.id}>{renderRequestMessage(request)}</div>
              ))}
            </div>
          )}
        </div>
      </SideBar>
    </>
  );
};

export default Requests;
