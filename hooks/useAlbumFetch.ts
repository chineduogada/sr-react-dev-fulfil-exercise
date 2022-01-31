import React, { useCallback } from "react";
import { Album, getAllAlbum } from "services/album";
import useFetch, { Resource } from "./useFetch";

type AlbumHookReturnValue = {
  album: Resource<Album[]>;
  handleFetch: () => Promise<void>;
};

const useAlbumFetch = (): AlbumHookReturnValue => {
  const { resource, handleFetchResource } = useFetch<Album[]>();

  const handleFetch = useCallback(async () => {
    await handleFetchResource({
      fetcher: async () => {
        const { data } = await getAllAlbum();
        return data;
      },
    });
  }, [handleFetchResource]);

  return {
    album: resource,
    handleFetch,
  };
};

export default useAlbumFetch;
