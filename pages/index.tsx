import type { NextPage } from "next";
import { Box, Heading } from "@chakra-ui/react";
import DataTable from "components/DataTable/DataTable";

const HomePage: NextPage = () => {
  return (
    <Box maxLength="700px" mx="auto" p={10}>
      <Heading as="h1">
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
      />
    </Box>
  );
};

export default HomePage;
