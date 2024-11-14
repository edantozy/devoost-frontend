import { Header, Sidebar } from "@components/ui";
import { FC } from "react";

interface IAppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: FC<IAppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};
