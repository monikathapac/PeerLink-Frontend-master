import { getFiriendStatus } from "components/Core/ConnectionStatus";
import { fetcher } from "fetchers/fetcher";
import { Dots } from "react-activity";
import useSWR from "swr";
import { tSearchDetails } from "types/appTypes";

type Props = {
  id: string;
  search: string;
};

function FriendStatus({ id, search }: Props) {
  const { data: assetList } = useSWR<tSearchDetails>(
    `/search/${id}?asset=${search}`,
    fetcher
  );
  if (!assetList) return <Dots style={{ marginLeft: 10 }} />;
  else return <>{getFiriendStatus(assetList.status)}</>;
}

export default FriendStatus;
