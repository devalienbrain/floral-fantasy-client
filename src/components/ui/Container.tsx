import { ReactNode } from "react";

type TContainerProps = {
    children: ReactNode
}
const Container = ({ children }: TContainerProps) => {
  return <div className="bg-lime-50 h-full w-full max-w-7xl mx-auto shadow-2xl p-10">{children}</div>;
};

export default Container;