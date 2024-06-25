import { ReactNode } from "react";
import Loading from "../Loading";
import Error from "../Error";
import { useGetWinesQuery } from "../../services/API";

type ContentProps = {
  children: ReactNode;
};

const Content = ({ children }: ContentProps) => {
  let content: ReactNode = null;
  const { error, isLoading, data } = useGetWinesQuery();
  const dataIsArray = Array.isArray(data);

  if (error) {
    content = <Error />;
  } else if (isLoading) {
    content = <Loading />;
  } else if (dataIsArray) {
    content = children;
  } else {
    content = <Error />;
  }
  return (
    <main>
      <article>{content}</article>
    </main>
  );
};

export default Content;
