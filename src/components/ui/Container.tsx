import { ReactNode } from "react";

type TContainerProps = {
    children: ReactNode
}
const Container = ({ children }: TContainerProps) => {
  return <div className="h-screen w-full max-w-7xl mx-auto shadow-2xl p-10">{children}</div>;
};

export default Container;