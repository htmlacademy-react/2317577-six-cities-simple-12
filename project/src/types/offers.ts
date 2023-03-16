export type Offer = {
  name: string;
  type: string;
  pic: string[];
  price: number;
  premium: boolean;
  bedrooms: number;
  adults: number;
  conveniences: string[];
  host: string;
  hostPro: boolean;
  description: string[];
  id: number;
};

export type Offers = Offer[];
