import { Table as FBTable } from "flowbite-react";
import { FC } from "react";

interface Column {
  key: string;
  label: string;
}

interface ITableProps {
  data: { [key: string]: React.ReactNode | string }[];
  columns: Column[];
}

export const Table: FC<ITableProps> = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto">
      <FBTable>
        <FBTable.Head>
          {columns.map((column) => (
            <FBTable.HeadCell key={column.key}>{column.label}</FBTable.HeadCell>
          ))}
        </FBTable.Head>
        <FBTable.Body className="divide-y">
          {data.map((row, rowIndex) => (
            <FBTable.Row key={rowIndex}>
              {columns.map((column) => (
                <FBTable.Cell key={column.key}>{row[column.key]}</FBTable.Cell>
              ))}
            </FBTable.Row>
          ))}
        </FBTable.Body>
      </FBTable>
    </div>
  );
};
