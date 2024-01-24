import { toast } from "react-hot-toast";
import { Add } from "./changer";

export const sendRequest = async (id: string, mutate: any) => {
  toast.loading("Sending request");
  const result = await Add(`/profile/${id}/add`, {});
  toast.dismiss();
  if (result) toast.success("Request Send!");
  else toast.error("Failed to send request!");
  await mutate();
};
