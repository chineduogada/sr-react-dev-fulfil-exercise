import { Button as __Button } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
  primary?: boolean;
  navItem?: boolean;
  [x: string]: any;
};

const Button = ({ children, primary, tabItem, ...rest }: Props) => (
  <__Button size="sm" variant={tabItem ? "tab-item" : "base"} {...rest}>
    {children}
  </__Button>
);

export default Button;
