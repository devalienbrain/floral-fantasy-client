import { ReactNode } from "react";

type TContainerProps = {
    children: ReactNode
}
const Container = ({ children }: TContainerProps) => {
  return <div className="h-full w-full max-w-7xl mx-auto px-10 pt-5">{children}</div>;
};

export default Container;