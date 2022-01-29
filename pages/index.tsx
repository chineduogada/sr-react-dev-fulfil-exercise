import type { NextPage } from "next";
import { Box, Heading } from "@chakra-ui/react";
import DataTable from "components/DataTable/DataTable";

const HomePage: NextPage = () => {
  return (
    <Box maxLength="700px" mx="auto" p={10}>
      <Heading as="h1">
        Sr. React Developer - Fulfil Recruiting Exercise
      </Heading>

      <DataTable />
    </Box>
  );
};

export default HomePage;
