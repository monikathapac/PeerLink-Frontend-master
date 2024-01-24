import GuideCards from "components/Cards/GuideCards";
import Modal from "components/Popups/Modal";
import { Button, PopUp, PopUpButtons } from "components/Popups/PopUp";
import SocialMediaSharing from "components/SocialMediaSharing/SocialMediaSharing";
import { Add, Remove, Update } from "fetchers/changer";
import { fetcher } from "fetchers/fetcher";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import Dots from "react-activity/dist/Dots";
import toast from "react-hot-toast";
import {
  AiFillPlusCircle,
  AiOutlineCloseSquare,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaRegEdit, FaShareAlt, FaTrash } from "react-icons/fa";
import ReactSelect from "react-select";
import astyles from "styles/Admin.module.css";
import styles from "styles/Assets.module.css";
import useSWR from "swr";
import { tAssets, tProfile, tUserAsset } from "types/appTypes";
import { tAsset, tCategory } from "types/tCategory";
import { LookingForGuide } from "utils/GuidesData";

const visibiltyList = [
  { value: 0, label: "Private" },
  { value: 1, label: "Friends" },
  { value: 2, label: "Friends Of Friends" },
  { value: 3, label: "Public" },
];

function Assets() {
  const [selected, setSelected] = useState<{ index: number; category: string }>(
    { index: 0, category: "" }
  );
  const [selectedCategory2, setSelectedCategory2] = useState<{
    index: number;
    category: string;
  }>({ index: 0, category: "" });
  const [fromCategory, setFromCategory] = useState<number>();
  const [type, setType] = useState<any>("Virtual");
  const [asset, setAsset] = useState<any>(undefined);
  const [dropDownAsset, setDropDownAsset] = useState<any>(undefined);

  const [catAsset, setCatAsset] = useState<any>(undefined);
  const [category, setCategory] = useState<any>();
  const [description, setDescription] = useState<string>("");
  const [desc, setDesc] = useState<string>("I want to ");
  const [open, setOpen] = useState<boolean>(false);
  const [guideOpen, setGuideOpen] = useState<boolean>(false);

  const [AddAssetVisibility, setAddAsssetVisibility] = useState<boolean>(false);
  const [EditAssetVisibility, setEditAssetVisibility] =
    useState<boolean>(false);
  const [AssetId, setAssetId] = useState<string>("");
  const [visibility, setVisibility] = useState<any>();
  const [sLoading, setSLoading] = useState<boolean>(false);
  const [deleteAsset, setDeleteAsset] = useState<string>("");
  const [selectedAssets, setselectedAssets] = useState<any>([]);
  const [selectedImages, setSelectedImages] = useState<React.Key[]>([]);
  // Add a new state variable to track initial selection
  const [initialSelection, setInitialSelection] = useState<boolean>(true);
  var {
    data: lfs,
    error: aerror,
    mutate: aMutate,
  } = useSWR<Array<tAssets>>("/profile/lfs", fetcher);
  // var { data: categories1, error: cerror1, mutate: cMutate1 } = useSWR<Array<tCatList>>(type ? `/category/simple-list?type=${type.value}` : null, fetcher);
  const {
    data: categories,
    error: cerror,
    mutate: cMutate,
  } = useSWR<Array<tCategory>>("/category", fetcher);
  var {
    data: assetlist,
    error: aerror,
    mutate: alMutate,
  } = useSWR<Array<tAsset>>(
    category ? `/asset/cat/${category?.value}` : null,
    fetcher
  );

  const {
    data: profile,
    error: perror,
    mutate: pMutate,
  } = useSWR<tProfile>("/profile", fetcher);

  const { status } = useSession();

  // useeeffect for initial assets category on loading
  useEffect(() => {
    if (categories && categories.length > 0) {
      // Check if initial selection has been made
      if (initialSelection) {
        const initialCategory = categories.find((item) =>
          lfs?.some((asset) => asset.category === item.name)
        );

        if (initialCategory) {
          const initialIndex = categories.indexOf(initialCategory);

          setSelected((prevState) => ({
            ...prevState,
            index: initialIndex,
            category: initialCategory.name,
          }));

          handleCategory(initialIndex, initialCategory, 1);

          // Update the state to indicate that initial selection has been made
          setInitialSelection(false);
        }
      }
    }
  }, [categories, lfs, initialSelection]);

  useEffect(() => {
    if (fromCategory === 2) {
      const cat2 = categories?.filter(
        (el) => el.name === selectedCategory2.category
      )[0]?.assets;
      const ast2 = lfs?.find(
        (el) => el.category == selectedCategory2.category
      )?.assets;
      setCatAsset(
        cat2?.filter((obj1) => !ast2?.some((obj2) => obj1.name === obj2.name))
      );
    } else {
      const cat = categories?.filter((el) => el.name === selected.category)[0]
        ?.assets;
      const ast = lfs?.find((el) => el.category == selected.category)?.assets;
      setCatAsset(
        cat?.filter((obj1) => !ast?.some((obj2) => obj1.name === obj2.name))
      );
    }
  }, [categories, lfs, selected, selectedCategory2]);

  const handleCategory = (
    index: any,
    item: {
      [x: string]: any;
      name?: any;
      category?: any;
    },
    from: number
  ) => {
    setType(item?.type);
    setCategory(item?.name);
    if (from === 1) {
      setFromCategory(1);
      setSelected((prevState: any) => ({
        ...prevState,
        index: index,
        category: item?.name,
      }));
    } else if (from === 2) {
      setDropDownAsset("");
      setFromCategory(2);
      setSelectedCategory2((prevState) => ({
        ...prevState,
        index: index,
        category: item?.name,
      }));
    }
  };

  const onSubmit = async () => {
    setSLoading(true);

    if (!asset) {
      toast.error("Please fill all the fields!");
      setSLoading(false);
      return;
    }

    if (description.length > 180) {
      toast.error("Description is too large!");
      setSLoading(false);
      return;
    }

    try {
      for (const selectedImage of selectedImages) {
        var result = await Add("/profile/lf", {
          Assetid: selectedImage,
          Description: description,
        });

        if (result) {
          toast.success("Asset Added to your Profile!");
          await aMutate();
          clearFields();
        } else {
          toast.error("Failed to add Asset!");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the assets!");
    }

    setSLoading(false);
  };

  const handleAssetClick = (item: {
    id: React.Key | null | undefined;
    name: string;
  }) => {
    setAsset((prevState: any) => ({
      ...prevState,
      value: item.id,
      label: item.name,
    }));
  };

  const handleAssetImageClick: any = (item: {
    id: React.Key;
    name: string;
  }) => {
    if (selectedImages.includes(item.id)) {
      setSelectedImages(selectedImages.filter((id) => id !== item.id));
    } else {
      setSelectedImages([...selectedImages, item.id]);
    }
    setAsset((prevState: any) => ({
      ...prevState,
      value: item.id,
      label: item.name,
    }));
  };

  const clearFields = () => {
    setAddAsssetVisibility(false);
    setEditAssetVisibility(false);
    setDescription("");
    setSelectedImages([]);
  };

  useEffect(() => {
    if (status === "unauthenticated") Router.push("/");
  }, [status]);

  // Edit Asset Functionalities
  const openEditAsset = (asset: tUserAsset) => {
    setAssetId(asset.id);
    setDescription(asset.description);
    setVisibility(visibiltyList.find((x) => x.value == asset.view));
    setEditAssetVisibility(true);
  };

  const onSubmitEdit = async () => {
    setSLoading(true);
    if (!visibility) {
      toast.error("Please fill all the fields!");
      setSLoading(false);
      return null;
    }
    if (description.length > 180) {
      toast.error("Description is too large!");
      setSLoading(false);
      return null;
    }
    console.log({
      id: AssetId,
      View: visibility.value,
      Description: description,
    });

    var result = await Update(`/profile/lf`, {
      id: AssetId,
      view: visibility.value,
      description: description,
    });
    if (result) {
      toast.success("Asset Updated!");
      await aMutate();
      clearFields();
    } else toast.error("Failed to update Asset!");
    setSLoading(false);
  };

  // Asset Delete Functionalities

  const clearDeleteAsset = () => {
    setDeleteAsset("");
  };

  const cdeleteAsset = async () => {
    setSLoading(true);
    var result = await Remove("/profile/lf", deleteAsset);
    setSLoading(false);
    clearDeleteAsset();

    if (result) toast.success("Asset Removed.");
    else toast.error("Failed To Remove Asset.");
    await aMutate();
  };
  const handleWhatsApp = () => {
    const ProfilephoneNumber: any = profile?.phoneNumber;
    const phoneNumber =
      ProfilephoneNumber.length <= 10
        ? "+91" + profile?.phoneNumber
        : ProfilephoneNumber;

    const assetsMessage = lfs
      ?.filter((el) => el.category !== null)
      ?.map(
        (el) =>
          `${el.category} : ${el.assets.map((item) => item.name).join(", ")}`
      )
      .join("\n");

    const message = encodeURIComponent(
      `Hey guys, I am looking for the following subscription, feel free to ping if you want to club together, let's save some money.\n   *My Wishlist:* \n ${assetsMessage} Join Peer Link Now!!  https://bit.ly/3ODp0MZ`
    );

    const url = `https://api.whatsapp.com/send?text=${message}`;

    window.open(url);
  };

  // socialMedia Message
  const assetsMessage = lfs
    ?.filter((el) => el.category !== null)
    ?.map(
      (el) =>
        `${el.category} : ${el.assets.map((item) => item.name).join(", ")}`
    )
    .join("\n");

  const message = `Hey guys,  I am looking for the following digital assets, have a look and feel free to ping if you want to club or share it with me, let's save some money.\n\n*My assets are:*\n${assetsMessage}\n\nJoin this super useful platform https://bit.ly/3ODp0MZ`;

  return (
    <>
      <div className={styles.heading}>
        <div className="flex">
          My Wishlist
          <BsInfoCircleFill
            style={{ cursor: "pointer", marginLeft: "7px" }}
            size={14}
            className="self-end"
            onClick={() => setGuideOpen(true)}
          />
        </div>
        <Modal open={guideOpen}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <p className={styles.modalheading}>
                Tell us what you are looking for.
              </p>
              <div className={styles.close} onClick={() => setGuideOpen(false)}>
                <AiOutlineCloseSquare size={30} style={{ cursor: "pointer" }} />
              </div>
            </div>
            <div className={styles.modalBody}>
              {" "}
              <div
                className={styles.flexModal}
                style={{ paddingBottom: "2rem" }}
              >
                {LookingForGuide.map((d, i) => {
                  return (
                    <GuideCards key={i} image={d.image} content={d.content} />
                  );
                })}
              </div>
            </div>
          </div>
        </Modal>

        <AiFillPlusCircle
          className="step-2"
          size={27}
          style={{ marginLeft: 10, cursor: "pointer" }}
          onClick={() => setAddAsssetVisibility(true)}
        />

        <AiOutlineWhatsApp
          size={27}
          onClick={() => handleWhatsApp()}
          className={`${styles.whatsapp_icon} step-3`}
        />

        <FaShareAlt
          style={{ marginLeft: ".5rem", cursor: "pointer" }}
          size={25}
          onClick={() => setOpen(true)}
          className="step-4"
        />
        <PopUp
          visibility={open}
          onClose={() => setOpen(false)}
          title="Share It On Social Media!"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <SocialMediaSharing socialMediaText={message} />
          </div>
        </PopUp>
      </div>
      {/* My Assets Start */}
      {lfs ? (
        lfs?.length ? (
          <>
            {" "}
            <div className={styles.container}>
              <div className={styles.tabs}>
                {categories?.map((item, index) => {
                  if (lfs?.some((asset) => asset.category === item.name)) {
                    return (
                      <div
                        key={index}
                        onClick={() => handleCategory(index, item, 1)}
                        className={
                          index === selected?.index
                            ? styles.tabActive
                            : styles.tab
                        }
                      >
                        {item.name}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              {/* assets */}
            </div>
            {lfs && (
              <div className={styles.assets}>
                {lfs
                  .find((el) => el.category == selected.category)
                  ?.assets.map((item) => (
                    <div key={item.id} className={styles.asset}>
                      <div className={styles.actions}>
                        <div
                          className={styles.edit}
                          onClick={() => setDeleteAsset(item.id)}
                        >
                          <FaTrash size={20} />
                        </div>
                        <div
                          className={styles.edit}
                          onClick={() => openEditAsset(item)}
                        >
                          <FaRegEdit size={20} />
                        </div>
                      </div>

                      <div className={styles.devider} />
                      <div className={styles.icon}>
                        <Image
                          src={item.icon}
                          alt={item.name}
                          height={30}
                          width={30}
                        />
                      </div>
                      <h4>{item.name}</h4>
                      <p className={styles.visibility}>
                        {" "}
                        visibility : {visibiltyList[item.view].label}
                      </p>

                      <div>
                        {item.description == "" ? (
                          <div
                            className={styles.description}
                            onClick={() => openEditAsset(item)}
                          >
                            <AiFillPlusCircle size={15} />
                            Add Description
                          </div>
                        ) : (
                          <p>{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        ) : (
          <div className={styles.guideContainer}>
            <div className={styles.flex}>
              {LookingForGuide.map((d, i) => {
                return (
                  <GuideCards key={i} image={d.image} content={d.content} />
                );
              })}
            </div>
            <div
              className={styles.addAssetButton}
              onClick={() => setAddAsssetVisibility(true)}
            >
              {" "}
              Add Asset
              <AiFillPlusCircle size={15} style={{ cursor: "pointer" }} />
            </div>
          </div>
        )
      ) : (
        <div style={{ display: "flex", justifyContent: "left" }}>
          <Image
            src={require("../../assets/loading.gif")}
            height={100}
            width={200}
            alt="Loading"
          />
        </div>
      )}
      {/* My Assets End */}

      {/* Edit Asset PopUp */}
      <PopUp
        visibility={EditAssetVisibility}
        onClose={clearFields}
        title="Update Asset"
      >
        <div className={astyles.popup}>
          <ReactSelect
            id="visibility"
            instanceId="visibility"
            menuPosition="fixed"
            maxMenuHeight={200}
            onChange={(e: any) => setVisibility(e)}
            value={visibility}
            placeholder="Select a Visibility"
            options={visibiltyList}
          />
          <div style={{ height: 10 }} />
          <textarea
            placeholder="Write a description about your Asset."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <small>{description.length}/180</small>
        </div>
        <PopUpButtons>
          <Button type="Cancel" onClick={clearFields}>
            Cancel
          </Button>
          <Button type="Submit" onClick={onSubmitEdit}>
            {sLoading ? <Dots size={15} /> : "Update"}
          </Button>
        </PopUpButtons>
      </PopUp>

      {/* Add asset PopUp */}
      <PopUp
        visibility={AddAssetVisibility}
        onClose={clearFields}
        title={`Add Asset`}
      >
        <div className={astyles.popup}>
          {
            <div>
              <div style={{ height: 10 }} />
              <div className={styles.tabs}>
                {categories
                  // ?.filter((item) => !item.name.includes('Education')) // Filter categories by name
                  ?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleCategory(index, item, 2)}
                      className={
                        index === selectedCategory2?.index
                          ? styles.tabActive
                          : styles.tab
                      }
                    >
                      {item.name}
                    </div>
                  ))}
              </div>
              {type && (
                <div style={{ height: 10, width: "350px" }}>
                  <ReactSelect
                    id="asset"
                    instanceId="asset"
                    menuPosition="fixed"
                    maxMenuHeight={200}
                    onChange={(e: any) => setDropDownAsset(e)}
                    isSearchable
                    value={dropDownAsset}
                    placeholder={`Search and Add ${category || " Cards"} Asset`}
                    options={catAsset?.map((asset: any) => {
                      return { value: asset.id, label: `${asset.name}` };
                    })}
                  />
                </div>
              )}
              <br />
              <br />
              <div className={styles.catAssets}>
                {console.log(asset, "assetSelected")}

                {dropDownAsset
                  ? catAsset
                      ?.filter((v: any) => v.name === dropDownAsset.label)
                      ?.map((item: any) => (
                        <div
                          key={item.id}
                          onClick={() => handleAssetImageClick(item)}
                          className={`${styles.imageContainer} `}
                        >
                          <div>
                            <Image
                              className={` ${
                                selectedImages.includes(item.id)
                                  ? styles.selectedImage
                                  : ""
                              }`}
                              src={item?.icon}
                              alt={item.name}
                              height={120}
                              width={120}
                            />
                            <br />
                          </div>
                          <p>
                            {" "}
                            {item.name}
                            {/* {item.name.substring(0, 20)}
                          <br />
                          {item.name.substring(21)} */}
                          </p>
                        </div>
                      ))
                  : catAsset?.map((item: any) => (
                      <div
                        key={item.id}
                        onClick={() => handleAssetImageClick(item)}
                        className={`${styles.imageContainer}`}
                      >
                        <div>
                          <Image
                            className={` ${
                              selectedImages.includes(item.id)
                                ? styles.selectedImage
                                : ""
                            }`}
                            src={item?.icon}
                            alt={item.name}
                            height={120}
                            width={120}
                          />
                          <br />
                        </div>
                        <p>
                          {" "}
                          {item.name}
                          {/* {item.name.substring(0, 20)}
                      <br />
                      {item.name.substring(21)} */}
                        </p>
                      </div>
                    ))}
              </div>
            </div>
          }
        </div>
        <PopUpButtons>
          <Button type="Cancel" onClick={clearFields}>
            Cancel
          </Button>
          {selectedImages.length > 0 && (
            <Button type="Submit" onClick={onSubmit}>
              {sLoading ? <Dots size={15} /> : `Add (${selectedImages.length})`}
            </Button>
          )}
        </PopUpButtons>
      </PopUp>
      {/* delete asset popup */}
      <PopUp
        visibility={deleteAsset != ""}
        onClose={clearDeleteAsset}
        title="Remove Asset"
      >
        <div style={{ width: "100%" }}>Are you sure about your decision?</div>
        <PopUpButtons>
          <Button type="Cancel" onClick={clearDeleteAsset}>
            No
          </Button>
          <Button type="Submit" onClick={cdeleteAsset}>
            {sLoading ? <Dots size={15} /> : "Yes"}
          </Button>
        </PopUpButtons>
      </PopUp>
    </>
  );
}

export default Assets;
