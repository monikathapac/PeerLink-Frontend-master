import { Button, PopUp, PopUpButtons } from "components/Popups/PopUp";
import SideBar from "components/SideBar";
import { AddFormData, Remove } from "fetchers/changer";
import { fetcher } from "fetchers/fetcher";
import Image from "next/image";
import { useState } from "react";
import { Dots } from "react-activity";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import styles from "styles/Admin.module.css";
import pstyles from "styles/Profile.module.css";
import useSWR from "swr";
import { tAsset, tCategory } from "types/tCategory";

type Props = {};

function Admin({}: Props) {
  const {
    data: categories,
    error: cerror,
    mutate: cMutate,
  } = useSWR<Array<tCategory>>("/category", fetcher);
  const {
    data: assets,
    error: aerror,
    mutate: aMutate,
  } = useSWR<Array<tAsset>>("/asset", fetcher);
  const {
    register: catreg,
    handleSubmit: catsubmit,
    reset: resetCatValue,
    formState: { errors: caterrors },
  } = useForm();
  const {
    register: assetreg,
    handleSubmit: assetsubmit,
    reset: resetasset,
    formState: { errors: asseterrors },
  } = useForm();

  const [addCatModal, setAddCatModal] = useState<boolean>(false);
  const [scLoading, setScLoading] = useState<boolean>(false);
  const [addAssetModal, setAddAssetModal] = useState<boolean>(false);

  const clearFields = () => {
    setAddCatModal(false);
    resetCatValue({
      icon: null,
      name: "",
      type: "",
    });
  };

  const clearAssetFields = () => {
    setAddAssetModal(false);
    resetCatValue({
      icon: null,
      name: "",
      cid: "",
    });
  };

  const Submit = async (data: any) => {
    setScLoading(true);
    const formData = { ...data, icon: data.icon[0] };
    var isUpdated = await AddFormData("/category", formData);

    if (isUpdated) {
      toast.success("Category added!");
      await cMutate();
    } else {
      toast.error("Failed to add the category!");
    }
    setAddCatModal(false);
    setScLoading(false);
  };

  const deleteCat = async (id: string) => {
    const isRemoved = await Remove("/category", id);
    if (isRemoved) {
      toast.success("Category Removed!");
      await cMutate();
    } else {
      toast.error("Failed to remove the category!");
    }
  };

  const AssetSubmit = async (data: any) => {
    setScLoading(true);
    const formData = { ...data, icon: data.icon[0] };
    var isUpdated = await AddFormData("/asset", formData);

    if (isUpdated) {
      toast.success("Asset added!");
      await aMutate();
    } else {
      toast.error("Failed to add the Asset!");
    }
    setAddAssetModal(false);
    setScLoading(false);
  };

  const deleteAsset = async (id: string) => {
    const isRemoved = await Remove("/asset", id);
    if (isRemoved) {
      toast.success("Asset Removed!");
      await aMutate();
    } else {
      toast.error("Failed to remove the asset!");
    }
  };

  return (
    <SideBar>
      <div className={pstyles.block}>
        <div className={pstyles.content}>
          <div className={pstyles.header}>
            <h1>Categories</h1>
            <div
              className={pstyles.addbutton}
              onClick={() => setAddCatModal(true)}
            >
              + Add
            </div>
          </div>
          {categories && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Created By</th>
                  <th>Asset Types</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>
                        <Image
                          alt={data.name}
                          src={data.icon}
                          height={25}
                          width={25}
                          quality={20}
                        />
                      </td>
                      <td>{data.name}</td>
                      <td>{data.type}</td>
                      <td>{data.creator}</td>
                      <td>{data.assets.length}</td>
                      <td className={styles.action}>
                        <AiFillDelete
                          className={styles.icon}
                          onClick={() => deleteCat(data.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className={pstyles.block}>
        <div className={pstyles.content}>
          <div className={pstyles.header}>
            <h1>Assets</h1>
            <div
              className={pstyles.addbutton}
              onClick={() => setAddAssetModal(true)}
            >
              + Add
            </div>
          </div>
          {assets && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assets?.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>
                        <Image
                          alt={data.name}
                          src={data.icon}
                          height={25}
                          width={25}
                          quality={20}
                        />
                      </td>
                      <td>{data.name}</td>
                      <td>{data.type}</td>
                      <td>{data.category}</td>
                      <td className={styles.action}>
                        <AiFillDelete
                          className={styles.icon}
                          onClick={() => deleteAsset(data.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <PopUp
        title="Add Category"
        visibility={addCatModal}
        onClose={clearFields}
      >
        <div className={styles.popup}>
          <input type="file" {...catreg("icon", { required: true })} />
          {caterrors.icon && <h4>File is required!</h4>}
          <select {...catreg("type", { required: true })}>
            <option value="">Select A Type</option>
            <option value="Virtual">Virtual</option>
            <option value="Physical">Physical</option>
          </select>
          {caterrors.type && <h4>Type is required!</h4>}
          <input
            type="text"
            {...catreg("name", { required: true })}
            placeholder="Category Name"
          />
          {caterrors.name && <h4>Name is required!</h4>}
        </div>
        <PopUpButtons>
          <Button type="Cancel" onClick={clearFields}>
            Cancel
          </Button>
          <Button type="Submit" onClick={catsubmit(Submit)}>
            {scLoading ? <Dots size={15} /> : "Submit"}
          </Button>
        </PopUpButtons>
      </PopUp>

      <PopUp
        title="Add Asset"
        visibility={addAssetModal}
        onClose={clearAssetFields}
      >
        <div className={styles.popup}>
          <input type="file" {...assetreg("icon", { required: true })} />
          {asseterrors.icon && <h4>File is required!</h4>}
          <select {...assetreg("cid", { required: true })}>
            <option value="">Select A Category</option>
            {categories &&
              categories.map((data) => (
                <option value={data.id} key={data.id}>
                  {data.name}
                </option>
              ))}
          </select>
          {asseterrors.category && <h4>Category is required!</h4>}
          <input
            type="text"
            {...assetreg("name", { required: true })}
            placeholder="Asset Name"
          />
          {asseterrors.name && <h4>Name is required!</h4>}
        </div>
        <PopUpButtons>
          <Button type="Cancel" onClick={clearAssetFields}>
            Cancel
          </Button>
          <Button type="Submit" onClick={assetsubmit(AssetSubmit)}>
            {scLoading ? <Dots size={15} /> : "Submit"}
          </Button>
        </PopUpButtons>
      </PopUp>
      <Toaster position="top-right" />
    </SideBar>
  );
}

export default Admin;
