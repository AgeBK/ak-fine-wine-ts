import { ReactNode } from "react";
import Loading from "../Loading";
import Error from "../Error";
import { useGetWinesQuery } from "../../services/API";


type ContentProps = {
  children: ReactNode;
};

const Content = ({ children }: ContentProps) => {
  let content: ReactNode = null;
  const { error, isLoading } = useGetWinesQuery();

  if (error) {
    content = <Error />;
  } else if (isLoading) {
    content = <Loading />;
  } else {
    content = children;
  }
  return <main>{content}</main>;
};

export default Content;
