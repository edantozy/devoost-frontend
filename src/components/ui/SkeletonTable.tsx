import { Table as FBTable } from "flowbite-react";
import { FC } from "react";

interface Column {
  key: string;
  label: string;
}

interface ISkeletonTableProps {
  columns: Column[];
}

export const SkeletonTable: FC<ISkeletonTableProps> = ({ columns }) => {
  return (
    <div className="overflow-x-auto">
      <FBTable>
        <FBTable.Head>
          {columns.map((column) => (
            <FBTable.HeadCell key={column.key}>{column.label}</FBTable.HeadCell>
          ))}
        </FBTable.Head>
        <FBTable.Body className="divide-y">
          {[...Array(10)].map((_, rowIndex) => (
            <FBTable.Row key={rowIndex}>
              {columns.map((column) => (
                <FBTable.Cell key={column.key}>
                  <div role="status" className="animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <span className="sr-only">Loading...</span>
                  </div>
                </FBTable.Cell>
              ))}
            </FBTable.Row>
          ))}
        </FBTable.Body>
      </FBTable>
    </div>
  );
};
