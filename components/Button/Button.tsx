import { Button as __Button } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
  primary?: boolean;
  navItem?: boolean;
  [x: string]: any;
};

const Button = ({ children, primary, navItem, ...rest }: Props) => (
  <__Button
    size="sm"
    variant={primary ? "base" : navItem ? "nav-item" : "secondary"}
    {...rest}
  >
    {children}
  </__Button>
);

export default Button;
