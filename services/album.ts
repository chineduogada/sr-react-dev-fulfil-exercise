import { http } from "./http";

export interface Album {
  id: string;
  title: string;
  url: string;
  image: string;
}

export const getAllAlbum = async (): Promise<{
  data: Album[];
}> => {
  const path = `/photos`;

  const {
    data: { data: d },
  } = await http.get(path);

  const data: Album[] = d.map((item: any) => ({
    id: item.id,
    title: item.title,
    url: item.url,
    image: item.thumbnailUrl,
  }));

  return {
    data,
  };
};
