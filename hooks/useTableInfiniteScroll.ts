import React from "react";

const useTableInfiniteScroll = (): {
  limit: number;
  handleInfiniteScroll: () => void;
  handleLimitChange: (newLimit: number) => void;
} => {
  // const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState<number>(500);

  // Will setLimit and trigger a new fetch, Thus infinite scroll will be simulated
  const handleInfiniteScroll = () => {
    setLimit((prevLimit) => prevLimit + 500);
  };

  const handleLimitChange = (newLimit: number): void => {
    setLimit(newLimit);
  };

  return {
    limit,
    handleInfiniteScroll,
    handleLimitChange,
  };
};

export default useTableInfiniteScroll;
