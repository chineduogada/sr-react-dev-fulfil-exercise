import type { NextPage } from "next";
import { Box, Heading } from "@chakra-ui/react";
import DataTable from "components/DataTable/DataTable";
import useAlbumListingFetch from "hooks/useAlbumListingFetch";
import React from "react";

const HomePage: NextPage = () => {
  // const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(50);

  const { albums, handleFetch } = useAlbumListingFetch();

  React.useEffect(() => {
    handleFetch({ limit });
  }, [handleFetch, limit]);

  const albumsData = albums.data || [];

  // console.log(albumsData.length);

  return (
    <Box maxLength="700px" mx="auto" p={10}>
      <Heading as="h1" mb={10}>
        Sr. React Developer - Fulfil Recruiting Exercise
      </Heading>

      <DataTable
        isLoading={albums.loading}
        columns={[
          {
            id: "albumId",
            label: "Album Id",
          },
          {
            id: "title",
            label: "Title",
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
      />
    </Box>
  );
};

export default HomePage;
