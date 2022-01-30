import { Row, SortRowsByState } from "./interfaces";

export const handleSortRowsAlphabetically = ({
  rows,
  sortRowsBy,
}: {
  rows: Array<Row>;
  sortRowsBy: SortRowsByState;
}) => {
  const newRows = [...rows];

  newRows.sort(function (a, b) {
    let firstValue: string | number = +a[sortRowsBy.columnId as string];
    let secondValue: string | number = +b[sortRowsBy.columnId as string];

    if (
      !firstValue &&
      firstValue !== 0 &&
      firstValue !== undefined &&
      firstValue !== null
    ) {
      firstValue = a[sortRowsBy.columnId as string];
      secondValue = b[sortRowsBy.columnId as string];
    }

    if (typeof firstValue === "string") {
      firstValue = `${firstValue}`.toUpperCase().trim(); // ignore upper and lowercase
      secondValue = `${secondValue}`.toUpperCase().trim(); // ignore upper and lowercase

      if (sortRowsBy.up) {
        if (firstValue < secondValue) {
          return -1;
        }
        if (firstValue > secondValue) {
          return 1;
        }
      } else {
        if (firstValue > secondValue) {
          return -1;
        }
        if (firstValue < secondValue) {
          return 1;
        }
      }
      return 0;
    }

    if (typeof firstValue === "number") {
      return sortRowsBy.up
        ? firstValue - +secondValue
        : +secondValue - firstValue;
    }

    return 0;
  });

  return newRows;
};
