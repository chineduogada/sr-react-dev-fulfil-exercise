import { Box, Flex } from "@chakra-ui/react";
import Button from "components/Button/Button";
import Input from "components/Form/Input";
import React from "react";

interface DataTableProps {
  //   x: string;
}

const DataTable: React.FC<DataTableProps> = ({}) => {
  return (
    <Box as="section">
      <Flex>
        <Button data-testid="tab-item">All</Button>
      </Flex>

      <Flex as="header">
        <Button>Filter</Button>
        <Input placeholder="Search products" aria-label="Search products" />
      </Flex>
    </Box>
  );
};

export default DataTable;
