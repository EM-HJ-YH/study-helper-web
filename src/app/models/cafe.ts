export interface CafeInfo {
    cafeIndex: number,
    cafeName: string,
    cafePhone?: string,
    latitude: number,
    longitude: number,
}

export interface CafeBook {
    cafeBookIndex: number,
    cafeIndex: number,
    cafeBookUserId: string,
    cafeBookDate: string,
    cafeBookBeginTime: string,
    cafeBookEndTime: string,
}