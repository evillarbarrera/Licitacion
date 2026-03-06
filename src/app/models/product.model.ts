export interface Product {
    id: string;
    name: string;
    description: string;
    priceCash: number;
    image: string;
    bidsCount: number;
    maxBids: number;
    highestOffer?: number;
}
