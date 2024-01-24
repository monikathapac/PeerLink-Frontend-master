import { Button, PopUp, PopUpButtons } from "components/Popups/PopUp";
import { Add, Remove, Update } from "fetchers/changer";
import { fetcher } from "fetchers/fetcher";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import Dots from "react-activity/dist/Dots";
import toast from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import ReactSelect from "react-select";
import astyles from "styles/Admin.module.css";
import styles from "styles/Assets.module.css";
import useSWR from "swr";
import { tAssets, tUserAsset } from "types/appTypes";
import { tAsset, tCategory } from "types/tCategory";

const visibiltyList = [
  { value: 0, label: "Private" },
  { value: 1, label: "Friends" },
  { value: 2, label: "Friends Of Friends" },
  { value: 3, label: "Public" },
];

function LookingFor() {
  // const [selected, setSelected] = useState<number>(0)
  const [selected, setSelected] = useState<any>({ index: 0, category: "OTT" });
  const [type, setType] = useState<any>("Virtual");
  const [asset, setAsset] = useState<any>(undefined);
  const [catAsset, setCatAsset] = useState<any>(undefined);
  const [category, setCategory] = useState<any>();
  const [description, setDescription] = useState<string>("");
  const [AddAssetVisibility, setAddAsssetVisibility] = useState<boolean>(false);
  const [EditAssetVisibility, setEditAssetVisibility] =
    useState<boolean>(false);
  const [AssetId, setAssetId] = useState<string>("");
  const [visibility, setVisibility] = useState<any>(undefined);
  const [sLoading, setSLoading] = useState<boolean>(false);
  const [deleteAsset, setDeleteAsset] = useState<string>("");

  var {
    data: lfs,
    error: aerror,
    mutate: aMutate,
  } = useSWR<Array<tAssets>>("/profile/lfs", fetcher);
  //  var { data: categories, error: cerror, mutate: cMutate } = useSWR<Array<tCatList>>(type ? `/category/simple-list?type=${type.value}` : null, fetcher);

  const {
    data: categories,
    error: cerror,
    mutate: cMutate,
  } = useSWR<Array<tCategory>>("/category", fetcher);

  var {
    data: assets,
    error: aerror,
    mutate: aMutate,
  } = useSWR<Array<tAssets>>("/profile/assets", fetcher);

  var {
    data: assetlist,
    error: aerror,
    mutate: alMutate,
  } = useSWR<Array<tAsset>>(
    category ? `/asset/cat/${category?.value}` : null,
    fetcher
  );
  const { data, status } = useSession();

  useEffect(() => {
    const cat = categories?.filter((el) => el.name === selected.category)[0]
      ?.assets;
    const ast = assets?.find((el) => el.category == selected.category)?.assets;

    setCatAsset(
      cat?.filter((obj1) => !ast?.some((obj2) => obj1.name === obj2.name))
    );

    // console.log(catAsset, 'cat asset');
  }, [categories, assets, selected]);

  const onSubmit = async () => {
    setSLoading(true);
    if (!asset) {
      toast.error("Please fill all the fields!");
      setSLoading(false);
      return null;
    }
    if (description.length > 180) {
      toast.error("Description is too large!");
      setSLoading(false);
      return null;
    }
    var result = await Add("/profile/lf", {
      Assetid: asset.value,
      View: visibility.value,
      Description: description,
    });
    if (result) {
      toast.success("LF Added to your Profile!");
      await aMutate();
      clearFields();
    } else toast.error("Failed to add LF!");
    setSLoading(false);
  };

  const clearFields = () => {
    setType(null);
    setCategory(null);
    setAddAsssetVisibility(false);
    setEditAssetVisibility(false);
    setDescription("");
    setAssetId("");
    setAsset(undefined);
    setVisibility(undefined);
  };

  useEffect(() => {
    if (status === "unauthenticated") Router.push("/");
  }, [status]);
  // useEffect(() => {
  //     setCategory(null)
  //     setAsset(null)
  //     setVisibility(null)
  // }, [type])
  // useEffect(() => {
  //     setAsset(null)
  //     setVisibility(null)
  // }, [category])
  // useEffect(() => {
  //     setVisibility(null)
  // }, [asset])

  // Edit Asset Functionalities
  const openEditAsset = (asset: tUserAsset) => {
    setAssetId(asset.id);
    setDescription(asset.description);
    setVisibility(visibiltyList.find((x) => x.value == asset.view));
    setEditAssetVisibility(true);
  };

  const onSubmitEdit = async () => {
    setSLoading(true);
    if (!visibility || description.length < 50) {
      toast.error("Please fill all the fields!");
      setSLoading(false);
      return null;
    }
    if (description.length > 180) {
      toast.error("Description is too large!");
      setSLoading(false);
      return null;
    }
    var result = await Update(`/profile/edit-asset`, {
      Assetid: AssetId,
      View: visibility.value,
      Description: description,
    });
    if (result) {
      toast.success("Lf Updated!");
      await aMutate();
      clearFields();
    } else toast.error("Failed to update LF!");
    setSLoading(false);
  };

  //Delete functionalities

  const clearDeleteAsset = () => {
    setDeleteAsset("");
  };

  const cdeleteAsset = async () => {
    setSLoading(true);
    var result = await Remove("/profile/lf", deleteAsset);
    setSLoading(false);
    clearDeleteAsset();

    if (result) toast.success("LF Removed.");
    else toast.error("Failed To Remove LF.");
    await aMutate();
  };

  return (
    <>
      <div className={styles.heading}>
        <div>Looking For</div>
        <AiFillPlusCircle
          size={27}
          style={{ marginLeft: 10, cursor: "pointer" }}
          onClick={() => setAddAsssetVisibility(true)}
        />
      </div>
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
                <div className={styles.actions}>
                  <div
                    className={styles.edit}
                    onClick={() => setDeleteAsset(item.id)}
                  >
                    <FaTrash size={12} />
                  </div>
                  <div
                    className={styles.edit}
                    onClick={() => openEditAsset(item)}
                  >
                    <FaRegEdit size={12} />
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
                <h5>
                  {moment(item.createdAt)
                    .add(new Date().getTimezoneOffset() * -1, "minute")
                    .fromNow()}
                </h5>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Edit Asset PopUp */}
      <PopUp
        visibility={EditAssetVisibility}
        onClose={clearFields}
        title="Update LF"
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
            placeholder="Write a description about your Asset. (Min 50 letters)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
        title="Add LF"
      >
        <div className={astyles.popup}>
          {
            <div>
              <div style={{ height: 10 }} />
              <div className={styles.tabs}>
                {categories?.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelected(index)}
                    className={
                      index == selected ? styles.tabActive : styles.tab
                    }
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              {/* <ReactSelect
                            id='category'
                            instanceId='category'
                            menuPosition="fixed"
                            maxMenuHeight={200}
                            onChange={(e: any) => setCategory(e)}
                            isSearchable
                            value={category}
                            placeholder="Select a Category"
                            options={categories?.map(asset => { return ({ value: asset.id, label: `${asset.name}` }) })}
                        /> */}
            </div>
          }
          {
            <div>
              <div style={{ height: 10 }} />

              <div className={styles.catAssets}>
                {catAsset?.map((item: any) => (
                  <div
                    key={item.id}
                    // onClick={() => handleAssetImageClick(item)}
                    // className={`${styles.imageContainer} ${selectedImages.includes(item.id) ? styles.selectedImage : ''}`}
                  >
                    <Image
                      src={`https://fakeimg.pl/80x80?text=${item.name}`}
                      alt={item.name}
                      height={80}
                      width={80}
                    />
                  </div>
                ))}
              </div>

              <ReactSelect
                id="asset"
                instanceId="asset"
                menuPosition="fixed"
                maxMenuHeight={200}
                onChange={(e: any) => setAsset(e)}
                isSearchable
                value={asset}
                placeholder="Select an Asset"
                options={assetlist?.map((asset) => {
                  return { value: asset.id, label: `${asset.name}` };
                })}
              />
            </div>
          }

          {
            <div>
              <div style={{ height: 10 }} />
              {/* <ReactSelect
                            id='visibility'
                            instanceId='visibility'
                            menuPosition="fixed"
                            maxMenuHeight={200}
                            onChange={(e: any) => setVisibility(e)}
                            value={visibility}
                            placeholder="Select a Visibility"
                            options={visibiltyList}
                        /> */}
              {/* <div style={{ height: 10 }} />
                        <textarea
                            placeholder='Write a description about your Asset. (Min 50 letters)'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        /> */}
            </div>
          }
        </div>
        <PopUpButtons>
          <Button type="Cancel" onClick={clearFields}>
            Cancel
          </Button>
          <Button type="Submit" onClick={onSubmit}>
            {sLoading ? <Dots size={15} /> : "Submit"}
          </Button>
        </PopUpButtons>
      </PopUp>

      <PopUp
        visibility={deleteAsset != ""}
        onClose={clearDeleteAsset}
        title="Remove LF"
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

export default LookingFor;
