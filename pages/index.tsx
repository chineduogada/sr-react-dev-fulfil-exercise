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
            width: "10px",
          },
          {
            id: "price",
            label: "Price",
            numeric: true, // Right Align
            width: "10px",
          },
          {
            id: "type",
            label: "Type",
            numeric: true, // Right Align
            width: "10px",
          },
          {
            id: "vendors",
            label: "Vendors",
            numeric: true, // Right Align
            width: "10px",
          },
        ]}
        rows={[
          {
            id: "1",
            product: "Product 1",
            price: "Price 1",
            image: "https://via.placeholder.com/100",
          },
          {
            id: "2",
            product: "Product 2",
            price: "Price 2",
            image: null,
          },
          {
            id: "3",
            product: "Product 1",
            price: "Price 3",
          },
        ]}
      />
    </Box>
  );
};

export default HomePage;
