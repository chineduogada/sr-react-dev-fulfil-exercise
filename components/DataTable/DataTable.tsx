import { Box, Checkbox, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import Button from "components/Button/Button";
import Input from "components/Form/Input";
import Image from "components/Image/Image";
import React from "react";
import { BsCaretDownFill } from "react-icons/bs";
import { GrImage } from "react-icons/gr";
import { layoutStyles } from "theme/components";

interface DataTableProps {
  //   x: string;
  columns: Array<{
    id: string;
    label: string;
    numeric: boolean;
    width?: string;
  }>;
  rows: Array<{
    id: string | number;
    image?: string | null;
    [x: string]: any;
  }>;
}

const DataTable: React.FC<DataTableProps> = ({ columns, rows }) => {
  const gridTemplateColumns = columns?.reduce(
    (acc, col) => acc + "1fr ",
    "100px "
  );

  return (
    <Box
      as="section"
      data-testid="data-table"
      {...layoutStyles}
      py={5}
      shadow="0 0 2px rgba(0, 0, 0, .1)"
    >
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

        <Box mt={5}>
          {/* Head */}
          <Grid
            gridTemplateColumns={gridTemplateColumns}
            gridGap={5}
            borderBottom={layoutStyles.border}
            borderColor={layoutStyles.borderColor}
            h="40px"
            alignItems={"center"}
          >
            <Flex alignItems="center">
              <Flex
                gridGap="1"
                p={"3px"}
                bg="accent.2"
                w="fit-content"
                {...layoutStyles}
                alignItems={"center"}
              >
                <Checkbox />

                <Icon transform="translate(2px, 2px)">
                  <BsCaretDownFill />
                </Icon>
              </Flex>
            </Flex>

            {columns?.map(({ id, label }) => (
              <Box key={id} data-testid={`data-table-column`}>
                <Text fontWeight={"bold"} fontSize="xs">
                  {label}
                </Text>
              </Box>
            ))}
          </Grid>

          {/* Body */}
          {rows?.map((row) => (
            <Grid
              key={row.id}
              data-testid={`data-table-row`}
              gridTemplateColumns={gridTemplateColumns}
              gridGap={5}
              borderBottom={layoutStyles.border}
              borderColor={layoutStyles.borderColor}
              h="60px"
              alignItems={"center"}
            >
              <Flex alignItems="center" justifyContent={"space-between"}>
                <Checkbox p={"3px"} />

                {row.image !== undefined &&
                  (row.image === null ? (
                    <Box
                      data-testid="data-table-row-no-image"
                      boxSize="50px"
                      fontSize="50px"
                    >
                      <GrImage />
                    </Box>
                  ) : (
                    <Image
                      src={row.image as string}
                      alt={row.product as string}
                      w="50px"
                      h="50px"
                    />
                  ))}
              </Flex>

              {columns?.map(({ id }) => (
                <Box
                  key={`${row.id}--${id}`}
                  data-testid={`data-table-row-cell`}
                >
                  <Text fontSize="xs">{row[id] || "null"}</Text>
                </Box>
              ))}
            </Grid>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DataTable;
