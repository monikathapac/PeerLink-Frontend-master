import Users from "components/Explore/Users";
import { PopUp, PopUpButtons } from "components/Popups/PopUp";
import SideBar from "components/SideBar";
import { fetcher } from "fetchers/fetcher";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactSelect from "react-select";
import styles from "styles/Explore.module.css";
import useSWR from "swr";
import { tSearchProfile } from "types/appTypes";
import { tCatList } from "types/tCategory";

function Explore() {
  const router = useRouter();
  const a = router.query.asset;
  const t = router.query.type;
  const c = router.query.category;
  const [asset, setAsset] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [category, setCategory] = useState<any>();
  const [filterPopup, setfilterPopup] = useState<boolean>(false);

  var {
    data: categories,
    error: cerror,
    mutate: cMutate,
  } = useSWR<Array<tCatList>>(`/category/simple-list?type=Virtual`, fetcher);
  const { data: sResult, error } = useSWR<Array<tSearchProfile>>(
    `/search?asset=${asset}&category=${category?.value ?? ""}&type=${type}`,
    fetcher
  );

  const getParams = (asset: string, type: string, category: any) => {
    const params = new URLSearchParams();
    if (asset) params.append("asset", asset);
    if (type) params.append("type", type);
    if (category) params.append("category", category.value);
    return params.toString();
  };

  const handleSearch = (e: any) => {
    setAsset(e.target.value);
    // router.push(`/explore?${getParams(e.target.value, type, category)}`, undefined, { shallow: true })
  };

  const handleType = (e: any) => {
    setType(e.target.value);
    // router.push(`/explore?${getParams(asset, e.target.value, category)}`, undefined, { shallow: true })
  };

  const handleCategory = (e: any) => {
    setCategory(e);
    // router.push(`/explore?${getParams(asset, type, e)}`, undefined, { shallow: true })
  };

  return (
    <SideBar>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.filters}>
            <h4>Asset Name</h4>
            <input
              placeholder="Ex: Netflix"
              value={asset}
              onChange={handleSearch}
            />

            <h4>Asset Type</h4>
            <div className={styles.radio}>
              <input
                type="radio"
                value=""
                checked={type === ""}
                onChange={handleType}
              />
              Both
            </div>
            <div className={styles.radio}>
              <input
                type="radio"
                value="Virtual"
                checked={type === "Virtual"}
                onChange={handleType}
              />
              Virtual Assets
            </div>
            <div className={styles.radio}>
              <input
                type="radio"
                value="Physical"
                checked={type === "Physical"}
                onChange={handleType}
              />
              Physical Asset
            </div>

            <h4 style={{ marginTop: 15 }}>Asset Category</h4>
            <ReactSelect
              id="category"
              instanceId="category"
              menuPosition="fixed"
              maxMenuHeight={200}
              onChange={handleCategory}
              isSearchable
              value={category}
              placeholder="Select a Category"
              options={categories?.map((asset) => {
                return { value: asset.name, label: `${asset.name}` };
              })}
            />
          </div>
          <div className={styles.mobileFilters}>
            <h4>Explore Assets</h4>
            <input
              placeholder="Asset Name"
              value={asset}
              onChange={handleSearch}
            />
            <h4 style={{ marginTop: 15 }}>Asset Category</h4>
            <ReactSelect
              id="category"
              instanceId="category"
              menuPosition="fixed"
              maxMenuHeight={200}
              onChange={handleCategory}
              isSearchable
              value={category}
              placeholder="Select a Category"
              options={categories?.map((asset) => {
                return { value: asset.name, label: `${asset.name}` };
              })}
            />
          </div>
          <div className={styles.results}>
            {sResult &&
              sResult.map((user) => (
                <Users key={user.id} user={user} asset={asset} />
              ))}
          </div>
        </div>
      </div>

      <PopUp
        visibility={filterPopup}
        onClose={() => {
          setfilterPopup(false);
        }}
        title="Filter Results"
      >
        <h4 style={{ marginTop: 15 }}>Asset Category</h4>
        <ReactSelect
          id="category"
          instanceId="category"
          menuPosition="fixed"
          maxMenuHeight={200}
          onChange={handleCategory}
          isSearchable
          value={category}
          placeholder="Select a Category"
          options={categories?.map((asset) => {
            return { value: asset.name, label: `${asset.name}` };
          })}
        />
        <PopUpButtons></PopUpButtons>
      </PopUp>
    </SideBar>
  );
}

export default Explore;
