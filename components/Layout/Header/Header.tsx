import {
  Box,
  ButtonGroup,
  Flex,
  Grid,
  HStack,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import breakpoints from "theme/breakpoints";
import {
  AiOutlineCar,
  AiOutlineDown,
  AiOutlineRight,
  AiOutlineUp,
} from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsBoxSeam, BsHouseDoor, BsPhone } from "react-icons/bs";
import { GiConverseShoe } from "react-icons/gi";
import Button from "components/Button/Button";
import Brand from "components/Brand/Brand";
import { useCallback, useEffect, useState } from "react";
import { Category, getAllCategory } from "services/categories";
import useFetch, { Resource } from "hooks/useFetch";
import Link from "components/Link/Link";
import Searchbox from "components/Form/Searchbox";

const useHeader = (): {
  categories: Resource<Array<Category>>;
  hasDropdown: { currentId?: string };
  handleFetchCategories: () => void;
  handleDropdownOpen: (id: string) => void;
  handleDropdownClose: () => void;
} => {
  const { resource: categories, handleFetchResource } =
    useFetch<Array<Category>>();

  const handleFetchCategories = useCallback(() => {
    handleFetchResource({
      fetcher: async () => (await getAllCategory()).categories,
    });
  }, [handleFetchResource]);

  useEffect(() => {
    handleFetchCategories();
  }, [handleFetchCategories]);

  const [hasDropdown, setHasDropdown] = useState<{ currentId?: string }>({});

  const handleDropdownOpen = (id?: string) =>
    setHasDropdown(() => {
      // if (prev.currentId === id) id = undefined;
      return { currentId: id };
    });
  const handleDropdownClose = () =>
    setHasDropdown({
      currentId: undefined,
    });

  return {
    categories,
    hasDropdown,
    handleFetchCategories,
    handleDropdownOpen,
    handleDropdownClose,
  };
};

const Header: React.FC = () => {
  const { handleDropdownClose, handleDropdownOpen, hasDropdown, categories } =
    useHeader();

  return (
    <Box as="header" borderColor="accent.4" {...maximizeLayout()}>
      <Flex alignItems="center" justifyContent="space-between" py={2}>
        <Box>
          <Button
            leftIcon={<HiOutlineLocationMarker />}
            rightIcon={<AiOutlineDown />}
            navItem
          >
            Lagos
          </Button>
        </Box>

        <Box mx={5} flex={0.8}>
          <Searchbox />
        </Box>

        <ButtonGroup>
          <Button>Login</Button>
          <Button primary>Register</Button>
        </ButtonGroup>
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="space-between"
        py={2}
        pos="relative"
        borderY="1px"
        borderColor="accent.4"
      >
        <Brand />

        <nav>
          <HStack as="ul" listStyleType="none">
            {navList.map((item) => (
              <Box as="li" key={item.id}>
                <Button
                  leftIcon={item.icon}
                  rightIcon={
                    hasDropdown.currentId === item.id ? (
                      <AiOutlineUp />
                    ) : (
                      <AiOutlineDown />
                    )
                  }
                  fontWeight={hasDropdown.currentId === item.id && "bold"}
                  color={hasDropdown.currentId === item.id && "primary.dark"}
                  navItem
                  onMouseOver={handleDropdownOpen.bind(null, item.id)}
                >
                  {item.text}
                </Button>
              </Box>
            ))}
          </HStack>
        </nav>

        <CategoryList
          categories={categories}
          hasDropdown={hasDropdown}
          handleDropdownClose={handleDropdownClose}
        />
      </Flex>
    </Box>
  );
};

const CategoryList = ({
  hasDropdown,
  handleDropdownClose,
  categories,
}: {
  hasDropdown: { currentId?: string };
  handleDropdownClose: () => void;
  categories: Resource<Category[]>;
}) => {
  const subCategories =
    categories.data?.find((category) => category.slug === hasDropdown.currentId)
      ?.subCategories || [];

  const isAll = hasDropdown.currentId === "all-categories";

  return hasDropdown.currentId ? (
    <>
      <Box
        pos="fixed"
        top={"102px"}
        left={0}
        zIndex={10}
        w="100vw"
        h="calc(100vh - 101px)"
        onMouseEnter={handleDropdownClose}
      ></Box>

      <Box
        pos="absolute"
        top={`100%`}
        left={0}
        zIndex={10}
        w="100%"
        bg="white"
        shadow="sm"
        p={5}
      >
        {categories.data ? (
          isAll ? (
            <AllCategories data={categories.data} />
          ) : (
            <SubCategoriesGridLayout data={subCategories} />
          )
        ) : null}

        {categories.loading && <Spinner />}
      </Box>
    </>
  ) : null;
};

const AllCategories = ({ data }: { data: Category[] }) => {
  const [currentCategory, setSubCategories] = useState<{
    id: string;
    subCategories: Category[] | undefined;
  }>({ id: data[0]._id, subCategories: data[0].subCategories });

  const handleCurrentChange = (category: Category) =>
    setSubCategories({
      id: category._id,
      subCategories: category.subCategories,
    });

  const allSubCategories = data.reduce((acc, category) => {
    return [...acc, ...(category.subCategories || [])];
  }, [] as Category[]);

  const [searchSubCategoriesResult, setSearchSubCategoriesResult] = useState<
    Category[] | null
  >(null);

  const handleSearch = (query: string) => {
    setSearchSubCategoriesResult(
      allSubCategories.filter(({ title }) =>
        title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleClearSearch = () => setSearchSubCategoriesResult(null);

  return (
    <>
      <Searchbox
        mb={5}
        maxW="500px"
        placeholder="Filter by searching for sub-categories"
        onSearch={handleSearch}
        onClear={handleClearSearch}
      />

      {searchSubCategoriesResult ? (
        <>
          <Text mb={2} fontSize="sm" as="em">
            <b>{searchSubCategoriesResult.length}</b> results found
          </Text>
          <SubCategoriesGridLayout data={searchSubCategoriesResult} />
        </>
      ) : (
        <HStack alignItems="flex-start" spacing={4}>
          <Box h="400px" overflowY="scroll">
            <Stack width="180px">
              {data.map((category) => (
                <Button
                  navItem
                  primary={category._id === currentCategory.id}
                  key={category._id}
                  onMouseOver={handleCurrentChange.bind(null, category)}
                >
                  <Text>{category.title}</Text>

                  <Box
                    pos="absolute"
                    top="50%"
                    transform="translateY(-50%)"
                    right={2}
                  >
                    <AiOutlineRight />
                  </Box>
                </Button>
              ))}
            </Stack>
          </Box>

          <SubCategoriesGridLayout data={currentCategory.subCategories} />
        </HStack>
      )}
    </>
  );
};

const SubCategoriesGridLayout = ({
  data,
  ...rest
}: {
  data?: Category[];
  [x: string]: any;
}) => (
  <Box h="400px" overflowY="scroll" flex={1}>
    <Grid
      w="100%"
      flex={1}
      gridTemplateColumns={
        data && data?.length < 4
          ? "repeat(3, 1fr)"
          : "repeat(auto-fit, minmax(200px, 1fr))"
      }
      gridGap={2}
      {...rest}
    >
      {data?.map((subCategory) => (
        <Link
          key={subCategory._id}
          href="#"
          border="1px"
          borderColor="accent.4"
          p={2}
          _hover={{
            textDecoration: "none",
            bg: "accent.4",
          }}
        >
          <Text>{subCategory.title}</Text>
        </Link>
      ))}
    </Grid>
  </Box>
);

const navList: Array<{ id: string; text: string; icon: React.ReactNode }> = [
  {
    id: "all-categories",
    text: "All Categories",
    icon: <BsBoxSeam />,
  },
  {
    id: "cars",
    text: "Cars",
    icon: <AiOutlineCar />,
  },
  {
    id: "phones",
    text: "Phones",
    icon: <BsPhone />,
  },
  {
    id: "fashion-health",
    text: "Fashion",
    icon: <GiConverseShoe />,
  },
  {
    id: "house-to-let",
    text: "House To Rent",
    icon: <BsHouseDoor />,
  },
];

export const maximizeLayout = (
  width = breakpoints.lg
): { mx: "auto"; maxWidth: string } => ({ mx: "auto", maxWidth: width });

// export const spaceLayout = (): {
//   px: { base: number; md: number; lg: number };
// } => ({
//   px: { base: 3, md: 4, lg: 5 },
// });

export default Header;
