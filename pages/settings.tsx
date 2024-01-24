import SideBar from "components/SideBar";
import { Update, UpdateFormData } from "fetchers/changer";
import { fetcher } from "fetchers/fetcher";
import { signOut } from "next-auth/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaFileImport, FaSignOutAlt } from "react-icons/fa";
import styles from "styles/Settings.module.css";
import useSWR from "swr";
import { tAssets, tProfile } from "types/appTypes";

const Settings = () => {
  const [visibility, setVisibility] = useState<any>(undefined);
  const [editMode, setEditMode] = useState(false);
  const fileInput = useRef<any>(null);

  const {
    data: profile,
    error: perror,
    mutate: pMutate,
  } = useSWR<tProfile>("/profile", fetcher);

  var {
    data: assets,
    error: aerror,
    mutate: aMutate,
  } = useSWR<Array<tAssets>>("/profile/assets", fetcher);

  const visibiltyList = [
    { value: 0, label: "Private" },
    { value: 1, label: "Friends" },
    { value: 2, label: "Friends Of Friends" },
    { value: 3, label: "Public" },
  ];

  const [userDetails, setUserDetails] = useState({
    name: profile?.firstName,
    lastname: profile?.lastName,
    number: profile?.phoneNumber,
    address: profile?.address,
    email: profile?.email,
  });

  useEffect(() => {
    // Set the initial values for userDetails when the component loads
    setUserDetails({
      name: profile?.firstName || "",
      lastname: profile?.lastName || "",
      number: profile?.phoneNumber || "",
      address: profile?.address || "",
      email: profile?.email || "",
    });
  }, [profile]);

  const handleEdit = () => {
    setEditMode(!editMode);
    // if (!editMode) {
    //   setNewProfileImage(profile?.image || "");
    // }
  };

  const handleUploadClick = () => {
    fileInput.current.click();
  };

  const handleCancel = () => {
    setEditMode(false);
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

  const handlesave = async () => {
    try {
      const result = await Update("/profile", {
        firstName: userDetails.name,
        lastname: userDetails.lastname,
        address: userDetails.address,
        phoneNumber: userDetails.number,
        email: userDetails.email,
      });

      // console.log('save', userDetails, result, profile);
      if (result) {
        toast.success("Profile Updated!");
        // Refresh the profile data
        pMutate();
      } else {
        toast.error("Failed to update Profile!");
      }

      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile");
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof typeof userDetails
  ) => {
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [key]: e.target.value,
    }));
  };

  return (
    <SideBar>
      <div className={styles.container}>
        <h1>Settings</h1>
        <div className={styles.settingsWrapper}>
          <div className={styles.profileImage}>
            {editMode ? (
              <>
                {/* <BsCameraFill
                  className={`${styles.camera} ${styles.cameraIcon}`} // Add the "cameraIcon" class
                  onClick={handleUploadClick}
                  style={{ height: '72px', width: '72px' }} // Set the desired height and width
                /> */}
                <button
                  className={styles.uploadButton}
                  onClick={handleUploadClick}
                >
                  <FaFileImport /> Upload Image
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInput}
                  style={{ display: "none" }}
                  multiple={false}
                  onChange={handleUpload}
                />
              </>
            ) : (
              <img src={profile?.image} alt="profile" />
            )}
          </div>

          <div className={styles.userDetails}>
            {Object.entries(userDetails).map(([key, value]) => (
              <div className={styles.info} key={key}>
                <span>{key}</span>
                {editMode ? (
                  <input
                    className={styles.input}
                    value={value || ""}
                    onChange={(e) =>
                      handleInputChange(e, key as keyof typeof userDetails)
                    }
                  />
                ) : (
                  <span className={styles.info}>{value}</span>
                )}
              </div>
            ))}
          </div>
          {!editMode ? (
            <div onClick={handleEdit}>
              <FaEdit size={20} />
            </div>
          ) : (
            <div>
              <button className={styles.cancelButton} onClick={handleCancel}>
                Cancel
              </button>
              <button className={styles.button} onClick={handlesave}>
                Save
              </button>
            </div>
          )}
        </div>
        <div className={styles.reditem} onClick={() => signOut()}>
          <FaSignOutAlt className={styles.icon} />
          <p>Log Out</p>
        </div>
      </div>
    </SideBar>
  );
};

export default Settings;
