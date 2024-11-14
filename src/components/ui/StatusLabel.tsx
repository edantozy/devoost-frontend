import { IStatus } from "@hooks/.";
import { FC } from "react";

interface IStatusLabelProps {
  status: IStatus;
}

const statusColor = (status: IStatus) => {
  switch (status) {
    case IStatus.Pending:
      return "yellow";
    case IStatus.Completed:
      return "green";
    case IStatus.Cancelled:
      return "red";
  }
};

export const StatusLabel: FC<IStatusLabelProps> = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold leading-5 text-${statusColor(
        status
      )}-800 bg-${statusColor(status)}-100 rounded-full capitalize`}
    >
      {status}
    </span>
  );
};
