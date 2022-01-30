// Components Interfaces
export default interface DataTableProps {
  columns: Array<Column>;
  rows: Array<Row>;
  onRowClick: (row: Row, rowIndex: number) => void;
}

export interface TableHeadProps {
  gridTemplateColumns: string;
  rows: Row[];
  columns: Column[];
  sortRowsBy: SortRowsByState;
  setSortRowsBy: any;
}

export interface TableBodyProps {
  gridTemplateColumns: string;
  rows: Row[];
  columns: Column[];
  onRowClick: (row: Row, rowIndex: number) => void;
}

// Other Types
export type Column = {
  id: string;
  label: string;
  numeric: boolean;
  width?: string;
};

export type Row = {
  id: string | number;
  image?: string | null;
  [x: string]: any;
};

export type SortRowsByState = {
  columnId?: string;
  up?: boolean;
  down?: boolean;
};
