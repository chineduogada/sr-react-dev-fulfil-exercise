import { Box, Checkbox, Flex, Grid, Text } from "@chakra-ui/react";
import Image from "components/Image/Image";
import React from "react";
import { BsImage } from "react-icons/bs";
import { layoutStyles } from "theme/components";
import { TableBodyProps } from "./interfaces";

const TableBody: React.FC<TableBodyProps> = ({
  rows,
  columns,
  gridTemplateColumns,
}) => {
  return (
    <>
      {rows.map((row) => (
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
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  {...layoutStyles}
                  data-testid="data-table-row-no-image"
                  boxSize="50px"
                  fontSize="30px"
                  color="gray.500"
                  backgroundColor="accent.2"
                >
                  <BsImage />
                </Flex>
              ) : (
                <Image
                  src={row.image as string}
                  alt={row.product as string}
                  w="50px"
                  h="50px"
                />
              ))}
          </Flex>

          {columns?.map(({ id, numeric }) => (
            <Box
              key={`${row.id}--${id}`}
              data-testid={`data-table-row-cell`}
              textAlign={numeric ? "right" : "left"}
            >
              <Text fontSize="xs">{row[id] || "null"}</Text>
            </Box>
          ))}
        </Grid>
      ))}
    </>
  );
};

export default TableBody;
