import {
  address,
  datatype,
  commerce,
  internet,
  name,
  image,
  random,
  date,
} from "faker";
import { FilterOptions } from "../types/filterOptions";
import { UserInfo } from "../types/userInfo";
import { Comment, Comments } from "../types/comments";

export const makeFakeCity = () => ({
  currentCity: address.cityName(),
});

export const makeMockOffer = () => ({
  bedrooms: datatype.number({ min: 1, max: 10 }),
  city: {
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number({ min: 10, max: 50 }),
    },
    name: address.cityName(),
  },
  description: commerce.productDescription(),
  goods: new Array(10).fill(null).map(() => commerce.product()),
  host: {
    avatarUrl: internet.avatar(),
    id: datatype.number({ min: 1, max: 100 }),
    isPro: datatype.boolean(),
    name: name.findName(),
  },
  id: datatype.number({ min: 1, max: 100 }),
  images: new Array(6).fill(null).map(() => image.abstract()),
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number({ min: 10, max: 50 }),
  },
  maxAdults: datatype.number({ min: 1, max: 10 }),
  previewImage: image.abstract(),
  price: Number(commerce.price()),
  rating: datatype.number({ min: 1, max: 5 }),
  title: commerce.product(),
  type: commerce.product(),
});

export const makeMockOffers = () => {
  return new Array(10).fill(null).map(() => makeMockOffer());
};

export const makeMockFilterOptions = (): FilterOptions => {
  return random.arrayElement([
    { name: "Popular", type: "rating", order: "asc" },
    { name: "Price: low to high", type: "price", order: "asc" },
    { name: "Price: high to low", type: "price", order: "desc" },
    { name: "Top rated first", type: "rating", order: "desc" },
  ]);
};

export const makeMockUser = (): Omit<UserInfo, "token"> => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number({ min: 1, max: 100 }),
  isPro: datatype.boolean(),
  name: name.findName(),
});

export const makeMockComment = (): Comment => ({
  comment: commerce.productDescription(),
  date: String(
    date.between("2010-01-01T00:00:00.000Z", "2020-01-01T00:00:00.000Z")
  ),
  id: datatype.number({ min: 1, max: 100 }),
  rating: datatype.number({ min: 1, max: 5 }),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.number({ min: 1, max: 100 }),
    isPro: datatype.boolean(),
    name: name.findName(),
  },
});

export const makeMockComments = (): Comments => {
  return new Array(10).fill(null).map(() => makeMockComment());
};
