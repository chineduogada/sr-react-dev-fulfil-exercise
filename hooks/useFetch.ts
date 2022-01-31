import { useState, useCallback, Dispatch, SetStateAction } from "react";

type HandleFetchResourceProps<Type> = {
  fetcher: () => Promise<Type>;
  onSuccess?: (resource: Type) => void;
  onError?: (error: Error) => void;
};

export type Resource<Type> = {
  data?: Type;
  loading?: boolean;
  error?: string;
};

type ReturnValue<Type> = {
  resource: Resource<Type>;
  setResource: Dispatch<SetStateAction<Resource<Type>>>;
  handleFetchResource: ({
    fetcher,
    onSuccess,
    onError,
  }: HandleFetchResourceProps<Type>) => Promise<() => void>;
  handleClearResource: () => void;
};

export function useFetch<Type>(): ReturnValue<Type> {
  const [resource, setResource] = useState<Resource<Type>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  const handleFetchResource = useCallback(
    async ({ fetcher, onSuccess, onError }: HandleFetchResourceProps<Type>) => {
      let componentIsMount = true;
      setResource({ loading: true });

      try {
        const resource = await fetcher();
        onSuccess?.(resource);

        if (componentIsMount) setResource({ data: resource });
      } catch (err: unknown) {
        const { message } = err as Error;

        console.error(err);
        onError?.(err as Error);
        if (componentIsMount) setResource({ error: message });
      }

      return () => {
        componentIsMount = false;
      };
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClearResource = () => setResource({ data: undefined });

  return {
    resource,
    setResource,
    handleFetchResource,
    handleClearResource,
  };
}

export default useFetch;
