import type { NextPage } from "next";
import Layout from "components/Layout/Layout";
import { Heading } from "@chakra-ui/react";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Heading as="h1">
        Sr. React Developer - Fulfil Recruiting Exercise
      </Heading>
    </Layout>
  );
};

export default HomePage;
