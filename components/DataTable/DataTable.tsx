import { Box, Flex } from "@chakra-ui/react";
import Button from "components/Button/Button";
import Input from "components/Form/Input";
import React from "react";
import { BsCaretDownFill } from "react-icons/bs";
import { layoutStyles } from "theme/components";

interface DataTableProps {
  //   x: string;
}

const DataTable: React.FC<DataTableProps> = ({}) => {
  return (
    <Box as="section" data-testId="data-table" {...layoutStyles} py={5}>
      <Flex
        mb={5}
        borderBottom={layoutStyles.border}
        borderColor={layoutStyles.borderColor}
      >
        <Button tabItem data-testid="tab-item" ml={5}>
          All
        </Button>
      </Flex>

      <Box px={5}>
        <Flex as="header">
          <Button rightIcon={<BsCaretDownFill />} roundedRight="none">
            Filter
          </Button>
          <Input
            placeholder="Search products"
            aria-label="Search products"
            roundedLeft="none"
          />
        </Flex>

        <Box {...layoutStyles} mt={5}>
          body
        </Box>
      </Box>
    </Box>
  );
};

export default DataTable;
