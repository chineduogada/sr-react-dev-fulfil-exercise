import type { NextPage } from "next";
import { Box, Heading } from "@chakra-ui/react";
import DataTable from "components/DataTable/DataTable";

const HomePage: NextPage = () => {
  return (
    <Box maxLength="700px" mx="auto" p={10}>
      <Heading as="h1" mb={10}>
        Sr. React Developer - Fulfil Recruiting Exercise
      </Heading>

      <DataTable
        columns={[
          {
            id: "product",
            label: "Product",
            numeric: false,
          },
          {
            id: "price",
            label: "Price",
            numeric: false,
          },
          {
            id: "vendors",
            label: "Vendors",
            numeric: true, // Right Align
            width: "100px",
          },
        ]}
        rows={[
          {
            id: "1",
            product: "Product first",
            price: "Price 1",
            image: "https://via.placeholder.com/100",
            vendors: "Vendor 1",
          },
          {
            id: "2",
            product: "Product two",
            price: "'$15.5",
            image: null,
            vendor: "Vendor 2",
          },
          {
            id: "3",
            product: "Product three",
            price: 100.5,
            vendor: "Vendor 3",
          },
        ]}
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
