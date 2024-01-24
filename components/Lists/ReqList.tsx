import React from 'react'
import moment from 'moment'
import styles from 'styles/RequestList.module.css'
import Image from 'next/image'
import { TiTick, TiTimes } from 'react-icons/ti'
import { Remove, Update } from 'fetchers/changer'
import { toast } from 'react-hot-toast'

type Props = {
    data: any
    mutate: any
}




const ReqList = ({ data, mutate }: Props) => {

    const acceptReq = async (id: string) => {
        const result = await Update(`/connection/${id}/`, "");

        if (result)
            toast.success("Connection added!")
        else
            toast.error("Failed to add Connection!")

        await mutate()

    }

    const regReq = async (id: string) => {
        const result = await Remove(`/connection`, id);

        if (result)
            toast.success("Connection rejected!")
        else
            toast.error("Failed to reject Connection!")

        await mutate()
    }

    return (
        <>{data.map((item: any) => {
            return (
                <div className={styles.container} key={item.id}>
                    <div className={styles.left}>
                        <Image src={`https://robohash.org/${item.userId}`} alt="DP" height={50} width={50} className={styles.picture} />
                        <div className={styles.info}>
                            <h4>{item.name}</h4>
                            <h5>{moment(new Date(item.dateTime)).add(new Date().getTimezoneOffset() * -1, "minute").fromNow()}</h5>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.accept} onClick={() => acceptReq(item.id)}>
                            <TiTick size={20} color="white" />
                        </div>
                        <div className={styles.decline} onClick={() => regReq(item.id)}>
                            <TiTimes size={20} color="white" />
                        </div>
                    </div>
                </div>
            )
        })}</>
    )
}

export default ReqList