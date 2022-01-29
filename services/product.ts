import { http } from "./http";
import shuffle from "utils/shuffle";

// const schema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export interface Ad {
//   _id: string;
//   title: string;
//   price: string;
//   description: string;
//   image: string;
//   createdAt: string;
//   imageCount: string;
//   url: string;
// }

export interface HotAd {
  _id: string;
  title: string;
  slug: string;
  verifiedSeller: boolean;
  image: string;
  url: string;
}
export interface Brand {
  image: string;
  url: string;
}

export const getHotAds = async (): Promise<{
  ads: HotAd[];
  brands: Brand[];
}> => {
  const path = `/ads/hot`;

  const {
    data: { data },
  } = await http.get(path);

  const { ads, brands }: { ads: HotAd[]; brands: Brand[] } = data;

  return {
    ads,
    brands: shuffle(brands),
  };
};
