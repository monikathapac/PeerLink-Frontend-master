export type tProfile = {
    id: string
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    email: string,
    image: string,
    unseen: number,
}

export type tSearchProfile = {
    id: string,
    image: string,
    name: string
}

export type tSearchAsset = {
    id: string,
    icon: string,
    name: string
}


export type tSearchDetails = {
    assets: Array<tSearchAsset>
    status: number
    assetCount: number
}

export type tUserProfile = {
    id: string,
    image: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    email: string,
    isRequested: boolean,
    isAccepted: boolean,
    mutual: number,
    assets: Array<tAssets>,
    lfs: Array<tAssets>
}

export type tUserAsset = {
    category: string;
    createdAt: Date;
    icon: string;
    id: string;
    name: string;
    type: string;
    view: number;
    description: string;
}

export type tAssets = {
    category: string;
    assets: Array<tUserAsset>
}

export type PgObject = {
    currentPage: number,
    totalPages: number,
    totalItems: number,
    itemsPerPage: number
}