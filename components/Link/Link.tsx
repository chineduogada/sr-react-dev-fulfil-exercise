import NextLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
  as?: string;
  passHref?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  prefetch?: boolean;
  [x: string]: any;
};

const Link: FC<Props> = ({
  children,
  href,
  as,
  passHref,
  replace,
  scroll,
  shallow,
  prefetch,
  ...rest
}) => (
  <NextLink
    href={href}
    as={as}
    passHref={passHref}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
    prefetch={prefetch}
  >
    <ChakraLink {...rest}>{children}</ChakraLink>
  </NextLink>
);

export default Link;
