import { Input as __Input } from "@chakra-ui/react";
import { forwardRef, LegacyRef } from "react";

type Props = {
  [x: string]: any;
};

const Input = forwardRef(({ ...rest }: Props, ref) => (
  <__Input
    size="sm"
    rounded="4px"
    ref={ref as LegacyRef<HTMLInputElement> | undefined}
    {...rest}
  />
));

Input.displayName = "Input";

export default Input;
