// Components Interfaces
export default interface DataTableProps {
  isLoading?: boolean;
  columns: Array<Column>;
  rows: Array<Row>;
  onRowClick: (row: Row, rowIndex: number) => void;
  onSelectionChange: (selectedRows: string[] | "All") => void;
}

export interface TableHeadProps {
  gridTemplateColumns: string;
  rows: Row[];
  columns: Column[];
  sortRowsBy: SortRowsByState;
  setSortRowsBy: any;
  onSelectAllRows: () => void;
  selectedRowsCount: number;
}

export interface TableBodyProps {
  gridTemplateColumns: string;
  rows: Row[];
  columns: Column[];
  onRowClick: (row: Row, rowIndex: number) => void;
  onSelectOneRow: (rowId: string | number) => void;
  selectedRows: { rowId: string | number }[];
}

// Other Types
export type Column = {
  id: string;
  label: string;
  numeric?: boolean;
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
