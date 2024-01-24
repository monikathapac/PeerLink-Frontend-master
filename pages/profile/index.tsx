import { Button, PopUp, PopUpButtons } from "components/Popups/PopUp";
import Assets from "components/Profile/Assets";
import Connections from "components/Profile/Connections";
import LookingFor from "components/Profile/LookingFor";
import SideBar from "components/SideBar";
import { Update, UpdateFormData } from "fetchers/changer";
import { fetcher } from "fetchers/fetcher";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { Dots } from "react-activity";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import styles from "styles/Profile.module.css";
import useSWR from "swr";
import { tProfile } from "types/appTypes";

function Index() {
  const {
    data: profile,
    error: perror,
    mutate: pMutate,
  } = useSWR<tProfile>("/profile", fetcher);
  const { data } = useSession();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInput = useRef<any>(null);

  // console.log(profile, 'profile');

  const onEditProfileClick = () => {
    reset({
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      address: profile?.address,
      phoneNumber: profile?.phoneNumber,
    });
    setEditProfile(true);
  };

  const onEditProfileClose = () => {
    setEditProfile(false);
  };

  const handleEditProfile = async (data: any) => {
    setIsLoading(true);
    const result = await Update("/profile", data);
    if (result) toast.success("Profile Updated");
    else toast.error("Failed to Update Profile");
    setIsLoading(false);
    await pMutate();
    setEditProfile(false);
  };

  const handleUploadClick = () => {
    fileInput.current.click();
  };

  const handleUpload = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/"))
        toast.error("File can not be uploaded!");
    } else return null;
    toast.loading("Uploading image.");
    const data = { image: file };
    const result = await UpdateFormData("/profile/image", data);
    if (result) toast.success("Image updated!");
    else toast.error("Failed to update the picture!");
    await pMutate();
    toast.dismiss();
  };

  return (
    <>
      <SideBar>
        {/* LFs Block */}
        <div className={styles.block}>
          <div className={styles.content}>
            <LookingFor />
          </div>
        </div>

        {/* Assets Block */}
        <div className={styles.block}>
          <div className={styles.content}>
            <Assets />
          </div>
        </div>

        {/* Connection Block */}
        <div className={styles.block}>
          <div className={styles.content}>
            <Connections />
          </div>
        </div>
      </SideBar>

      <PopUp
        visibility={editProfile}
        title="Update Profile"
        onClose={onEditProfileClose}
      >
        <div className={styles.form}>
          <label>First Name</label>
          <input type="Text" {...register("firstName", { required: true })} />

          <label>Last Name</label>
          <input type="Text" {...register("lastName", { required: true })} />

          <label>Phone Number</label>
          <input type="Text" {...register("phoneNumber", { required: true })} />

          <label>Address</label>
          <input type="Text" {...register("address", { required: true })} />
        </div>
        <PopUpButtons>
          <Button type="Cancel" onClick={onEditProfileClose}>
            Cancel
          </Button>
          <Button type="Submit" onClick={handleSubmit(handleEditProfile)}>
            {isLoading ? <Dots size={15} /> : "Update"}
          </Button>
        </PopUpButtons>
      </PopUp>
    </>
  );
}

export default Index;
