import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { BsFillCaretRightFill } from "react-icons/bs";
import { maximizeLayout } from "../Header/Header";

const Section = ({
  children,
  heading,
  seeAllLink,
  ...rest
}: {
  children: React.ReactNode;
  heading?: string;
  seeAllLink?: string;
  [x: string]: any;
}) => (
  <Box as="section" {...getSectionStyle()} {...rest}>
    {!heading && !seeAllLink ? null : (
      <Flex justifyContent="space-between" pb={8} alignItems={"center"}>
        {heading && <Heading fontSize="md">{heading}</Heading>}

        {seeAllLink && (
          <Button size="sm" rightIcon={<BsFillCaretRightFill />}>
            See All
          </Button>
        )}
      </Flex>
    )}

    {children}
  </Box>
);

const getSectionStyle = () => ({
  p: { base: 2, sm: 3, md: 4 },
  // m: { base: 2, sm: 3, md: 4 },
  //   m: 1,
  border: "1px",
  borderColor: "accent.4",
  shadow: "sm",
  ...maximizeLayout(),
  bg: "accent.1",
});

export default Section;
