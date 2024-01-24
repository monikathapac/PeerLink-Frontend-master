export type tCategory = {
    id: string,
    name: string,
    icon: string,
    type: string,
    creator: string,
    createdAt: Date,
    assets: Array<tAssetsList>
}

export type tAssetsList = {
    id: string,
    name: string
}

export type tCatList = {
    id: string,
    name: string
}


export type tAsset = {
    id: string,
    name: string,
    icon: string,
    type: string,
    category: string
}