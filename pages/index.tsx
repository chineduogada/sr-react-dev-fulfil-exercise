import type { NextPage } from "next";
import Layout from "components/Layout/Layout";
import PopularBrandSection from "components/Layout/Section/PopularBrandSection";
import Section from "components/Layout/Section/Section";
import { Box, Flex, Grid, IconButton, Text } from "@chakra-ui/react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Image from "components/Image/Image";
import Link from "components/Link/Link";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const Home: NextPage = () => {
  return (
    <Layout>
      <ScrollCarousel>
        <Box bg="blue" w="60vw" h="600px"></Box>
        <Box bg="red" w="60vw" h="600px"></Box>
        <Box bg="purple" w="60vw" h="600px"></Box>
        <Box bg="green" w="60vw" h="600px"></Box>
      </ScrollCarousel>

      <CardsSection heading="Phones" my={10} />
      <CardsSection heading="Laptops" my={10} />
      <CardsSection heading="House to sell" my={10} />
      <CardsSection heading="Jobs" my={10} />

      <PopularBrandSection />
    </Layout>
  );
};

const CardsSection = ({
  heading,
  ...rest
}: {
  heading: string;
  [x: string]: any;
}) => {
  return (
    <Section heading={heading} border="1px" {...rest}>
      <ScrollCarousel autoPlay gridGap={5} justifyContent="space-between">
        <BoxCard />
        <BoxCard />
        <BoxCard />
        <BoxCard />
        <BoxCard />
        <BoxCard />
        <BoxCard />
        <BoxCard />
        <BoxCard />
        <BoxCard />
        <BoxCard />
      </ScrollCarousel>
    </Section>
  );
};

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const ScrollCarousel: React.FC<{
  children: React.ReactNode;
  autoPlay?: boolean | { delay: number; interval: number; threshold: number };
  [x: string]: any;
}> = ({ children, autoPlay, ...rest }) => {
  const [status, setStatus] = useState<{
    hasReachedEnd?: boolean;
    hasReachedStart?: boolean;
    hasScrollBar?: boolean;
  }>({
    hasReachedEnd: false,
    hasReachedStart: true,
    hasScrollBar: true,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollToLeft = () => {
    if (scrollRef.current) {
      const childWidth = scrollRef.current.children[0].clientWidth;
      scrollRef.current.scrollLeft -= childWidth + childWidth / 2;
    }
  };

  const handleScrollToStart = () => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  };

  const handleScrollToRight = () => {
    if (scrollRef.current) {
      const childWidth = scrollRef.current.children[0].clientWidth;
      scrollRef.current.scrollLeft += childWidth + childWidth / 2;
    }
  };

  const { ref: wrapperRef, inView } = useInView({
    threshold: typeof autoPlay === "object" ? autoPlay?.threshold : 0.4,
    delay: typeof autoPlay === "object" ? autoPlay?.delay : 3000,
  });

  const interval = typeof autoPlay === "object" ? autoPlay?.interval : 3800;
  const intervalId = useRef<any>();

  const [stop, setStop] = useState<boolean>(true);

  useEffect(() => {
    if (autoPlay) {
      if (inView) setStop(false);
      else setStop(true);
    }
  }, [inView, autoPlay]);

  const handleAutoPlay = useCallback(() => {
    if (autoPlay && inView) {
      intervalId.current = setInterval(() => {
        if (status.hasReachedEnd) handleScrollToStart();
        else {
          handleScrollToRight();
        }
      }, interval);
    }
  }, [autoPlay, inView, interval, status.hasReachedEnd]);

  useEffect(() => {
    if (stop) clearInterval(intervalId.current);
    else handleAutoPlay();

    return () => {
      clearInterval(intervalId.current);
    };
  }, [handleAutoPlay, stop]);

  useEffect(() => {
    if (scrollRef.current) {
      for (let i = 0; i < scrollRef.current.children.length; i++) {
        const child = scrollRef.current.children[i] as HTMLElement;
        child.style.scrollSnapAlign = "center";
        child.style.flexShrink = "0";
      }
    }

    if (scrollRef.current) {
      if (!isOverflown(scrollRef.current))
        setStatus((prev) => ({ ...prev, hasScrollBar: false }));
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // detect the beginning of a horizontal scroll in a div?
    if (e.currentTarget.scrollLeft === 0) {
      setStatus((prev) => ({
        ...prev,
        hasReachedStart: true,
      }));
    } else if (e.currentTarget.scrollLeft > 10) {
      setStatus((prev) => ({
        ...prev,
        hasReachedStart: false,
      }));
    }

    // detect the end of a horizontal scroll in a div?
    if (
      e.currentTarget.scrollLeft ===
      e.currentTarget.scrollWidth - e.currentTarget.clientWidth
    ) {
      setStatus((prev) => ({
        ...prev,
        hasReachedEnd: true,
      }));
    } else if (e.currentTarget.scrollLeft < e.currentTarget.scrollWidth - 10) {
      setStatus((prev) => ({
        ...prev,
        hasReachedEnd: false,
      }));

      // detect if there is horizontal scroll in a div?
    }
  };

  return (
    <Box
      ref={wrapperRef}
      pos="relative"
      onMouseEnter={() => setStop(true)}
      onMouseLeave={() => setStop(false)}
    >
      {!status.hasReachedStart && (
        <Grid
          h="100%"
          bgGradient="linear(to-l, transparent, black-transparent)"
          pos="absolute"
          left={0}
          top={0}
          zIndex={1}
          placeItems={"center"}
          pr={10}
        >
          <IconButton aria-label="scroll left" onClick={handleScrollToLeft}>
            <AiOutlineLeft />
          </IconButton>
        </Grid>
      )}

      <Flex
        ref={scrollRef}
        {...rest}
        sx={{
          "&::-webkit-scrollbar": {
            width: "0",
            height: "0",
          },
          "&": {
            overflowX: "scroll",
            scrollSnapType: "x proximity",
            scrollBehavior: "smooth",
          },
        }}
        onScroll={handleScroll}
      >
        {children}
      </Flex>

      {!status.hasReachedEnd && status.hasScrollBar && (
        <Grid
          h="100%"
          bgGradient="linear(to-r, transparent, black-transparent)"
          pos="absolute"
          right={0}
          top={0}
          zIndex={1}
          placeItems={"center"}
          pl={10}
        >
          <IconButton aria-label="scroll right" onClick={handleScrollToRight}>
            <AiOutlineRight />
          </IconButton>
        </Grid>
      )}
    </Box>
  );
};

const BoxCard = () => {
  return (
    <Link
      href="#"
      border="1px"
      borderColor="accent.5"
      shadow="sm"
      width="200px"
      bg="white"
      sx={{
        "&:hover": {
          textDecoration: "none",
        },
        img: {
          transition: "all 0.3s ease-in-out",
        },
        "&:hover img": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Box boxSize="200px" pos="relative">
        <Image
          pos="absolute"
          top={0}
          left={0}
          src="https://static-uc.olist.ng/upload/admin_resource_management/eabb174c2ef6ac172cb237157e9a6cf3.jpeg"
          alt="benz"
          w="100%"
          h="100%"
        />

        <Text
          fontWeight="bold"
          fontSize="xs"
          bg="accent.6"
          color="white"
          pos="absolute"
          top={"-2px"}
          right={"-1px"}
          px={3}
          clipPath="polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 5% 50%, 0% 0%)"
        >
          Premium
        </Text>

        <Flex
          alignItems={"center"}
          bg="accent.4"
          pos="absolute"
          bottom={0}
          px={2}
        >
          <HiOutlineLocationMarker />

          <Text fontWeight="bold" fontSize="xs" pl={1}>
            Ikeja
          </Text>
        </Flex>
      </Box>

      <Box p={2}>
        <Text fontWeight="bold" fontSize="sm" isTruncated mb={1}>
          Uk used iPhone 8 64gb silver $0.00 shipping
        </Text>

        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold" fontSize="md" color="primary.dark">
            ₦1,000,000,000
          </Text>

          <Text fontSize="xs">
            <i>May 5</i>
          </Text>
        </Flex>
      </Box>
    </Link>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { ads, brands }: { ads: HotAd[]; brands: Brand[] } = await getHotAds();

//   // if (!products) {
//   //   return {
//   //     notFound: true,
//   //   };
//   // }

//   return {
//     props: {
//       ads,
//       brands,
//     },
//   };
// };

export default Home;
