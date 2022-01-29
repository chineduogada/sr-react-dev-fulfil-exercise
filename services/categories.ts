import { http } from "./http";

export interface Category {
  _id: string;
  title: string;
  slug?: string;
  subCategories?: Category[];
}

export const getAllCategory = async (): Promise<{
  categories: Category[];
}> => {
  const path = `/categories`;

  const {
    data: { data },
  } = await http.get(path);

  const categories: Category[] = data;

  return {
    categories,
  };
};
