import { http } from "./http";

export interface Album {
  id: string;
  albumId: string;
  title: string;
  url: string;
  image: string;
}

export const getAllAlbum = async (): Promise<{
  data: Album[];
}> => {
  const path = `/photos`;

  const d = (await (await http.get(path))?.data) || [];

  const data: Album[] = d.map((item: any) => ({
    id: item.id,
    albumId: item.albumId,
    title: item.title,
    url: item.url,
    image: item.thumbnailUrl,
  }));

  return {
    data,
  };
};
