import type { NextPage } from "next";
import { Box, Heading } from "@chakra-ui/react";
import DataTable from "components/DataTable/DataTable";
import useAlbumListingFetch from "hooks/useAlbumListingFetch";
import React from "react";
import useTableInfiniteScroll from "hooks/useTableInfiniteScroll";

const HomePage: NextPage = () => {
  const { limit, handleInfiniteScroll } = useTableInfiniteScroll();

  const { albums, handleFetch } = useAlbumListingFetch();

  React.useEffect(() => {
    handleFetch({ limit });
  }, [handleFetch, limit]);

  const albumsData = albums.data || [];

  return (
    <Box maxLength="700px" mx="auto" p={10}>
      <Heading as="h1" mb={10}>
        Sr. React Developer - Fulfil Recruiting Exercise
      </Heading>

      <DataTable
        // SPECIFICATIONs Props
        columns={[
          {
            id: "albumId",
            label: "Album Id",
            width: "100px",
            numeric: true,
          },
          {
            id: "title",
            label: "Title",
            width: "3fr",
          },
          {
            id: "price",
            label: "Price",
          },
        ]}
        rows={albumsData}
        onRowClick={(row, index) => {
          console.log(row, index);
        }}
        onSelectionChange={(selectedRows) => {
          console.log(selectedRows);
        }}
        hasError={albums.error}
        onErrorRetry={() => handleFetch({ limit })}
        // Props To Provision infinite scroll
        isLoading={albums.loading}
        onLastRowIsVisible={() => {
          handleInfiniteScroll();
        }}
      />
    </Box>
  );
};

export default HomePage;
