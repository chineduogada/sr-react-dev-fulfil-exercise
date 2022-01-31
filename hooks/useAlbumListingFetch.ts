import React, { useCallback } from "react";
import { Album, getAllAlbum } from "services/album";
import useFetch, { Resource } from "./useFetch";

type AlbumHookReturnValue = {
  albums: Resource<Album[]>;
  handleFetch: ({
    // page,
    limit,
  }: {
    // page: number;
    limit: number;
  }) => Promise<void>;
};

const useAlbumListingFetch = (): AlbumHookReturnValue => {
  const { resource, setResource, handleFetchResource } = useFetch<Album[]>();

  const handleFetch = useCallback(
    async ({
      // page,
      limit,
    }: {
      // page: number;
      limit: number;
    }) => {
      await handleFetchResource({
        fetcher: async () => {
          let { data } = await getAllAlbum();

          // const startIndex = (page - 1) * limit;
          const startIndex = 0;
          const endIndex = startIndex + limit;

          data = data.slice(startIndex, endIndex);

          return data;
        },
      });
    },
    [handleFetchResource]
  );

  return {
    albums: resource,
    handleFetch,
  };
};

export default useAlbumListingFetch;
