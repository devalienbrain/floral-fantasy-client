import { ReactNode } from "react";

type TContainerProps = {
  children: ReactNode;
};
const Container = ({ children }: TContainerProps) => {
  return <div>{children}</div>;
};

export default Container;
