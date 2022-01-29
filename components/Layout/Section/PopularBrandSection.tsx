import { Flex } from "@chakra-ui/react";
import Image from "components/Image/Image";
import Link from "components/Link/Link";
import { useEffect, useState } from "react";
import shuffle from "utils/shuffle";
import Section from "./Section";

interface Brand {
  image: string;
  url: string;
}

const brands: Brand[] = shuffle([
  {
    image: "/apple.png",
    url: "#",
  },
  {
    image: "/hp.png",
    url: "#",
  },
  {
    image: "/toyota.png",
    url: "#",
  },
  {
    image: "/nike.png",
    url: "#",
  },
  {
    image: "/samsung.png",
    url: "#",
  },
  {
    image: "/lexus.png",
    url: "#",
  },
  {
    image: "/honda.png",
    url: "#",
  },
  {
    image: "/benz.png",
    url: "#",
  },
  {
    image: "/lg.png",
    url: "#",
  },
]);

const PopularBrandSection = () => {
  const [list, setList] = useState<Brand[]>([...brands, ...brands]);

  useEffect(() => {
    const id = setInterval(() => {
      setList((prev) => [...prev, ...brands]);
    }, 10000);

    () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setList([...brands, ...brands]);
    }, 15000);

    () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Section heading="Top Sellit Brands" overflowX="hidden">
      <Flex
        sx={{
          "&": {
            animation: "move-in-left 60s linear infinite forwards",
          },

          "@keyframes move-in-left": {
            "0%": {
              transform: "translateX(0);",
            },
            "50%": {
              transform: "translateX(-100%);",
            },
            "100%": {
              transform: "translateX(0%);",
            },
          },
        }}
        as="section"
        minHeight="180px"
        justifyContent="space-between"
        pb={5}
      >
        {list.map((brand, index) => (
          <Link
            href="#"
            key={index}
            alignSelf={index % 2 === 0 ? "flex-start" : "flex-end"}
            mx={4}
            px={4}
            sx={{
              "&": {
                filter: "grayscale(1)",
              },
            }}
            _hover={{
              transform: "scale(1.2)",
              filter: "grayscale(0)",
            }}
          >
            <Image
              src={brand?.image}
              alt={`brand${index + 1}`}
              w="100px"
              h="100px"
            />
          </Link>
        ))}
      </Flex>
    </Section>
  );
};

export default PopularBrandSection;
