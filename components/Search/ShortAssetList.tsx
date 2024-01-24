import { fetcher } from "fetchers/fetcher";
import { Dots } from "react-activity";
import styles from "styles/Shortasset.module.css";
import useSWR from "swr";
import { tSearchDetails } from "types/appTypes";

type Props = {
  id: string;
  search: string;
};

const ShortAssetList = ({ id, search }: Props) => {
  const { data: assetList } = useSWR<tSearchDetails>(
    `/search/${id}?asset=${search}`,
    fetcher
  );

  if (!assetList) return <Dots style={{ marginLeft: 10 }} />;
  return (
    <div className={styles.container}>
      {assetList?.assets.map((item) => (
        <h5 key={item.id}>{item.name}</h5>
      ))}
    </div>
  );
};

export default ShortAssetList;
