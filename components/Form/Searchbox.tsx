import { InputGroup } from "@chakra-ui/react";
import Button from "components/Button/Button";
import { BiSearchAlt } from "react-icons/bi";
import Input from "./Input";
import { useForm } from "react-hook-form";

type Props = {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  [x: string]: any;
};

const Searchbox = ({
  placeholder = "Search for anything",
  onSearch,
  onClear,
  ...rest
}: Props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ query }: { query: string }) => {
    onSearch?.(query);
  };

  return (
    <InputGroup flex={1} as="form" onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Button fontSize="lg" px="4" primary type="submit">
        <BiSearchAlt />
      </Button>

      <Input
        placeholder={placeholder}
        type="search"
        onInput={(e: any) => e.target.value === "" && onClear?.()}
        {...register("query", { validate: (value) => !!value })}
      />
    </InputGroup>
  );
};

export default Searchbox;
