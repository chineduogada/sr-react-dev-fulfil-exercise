// Components Interfaces
export default interface DataTableProps {
  // SPECIFICATIONs Props
  columns: Array<Column>;
  rows: Array<Row>;
  onRowClick: (row: Row, rowIndex: number) => void;
  onSelectionChange: (selectedRows: string[] | "All") => void;
  hasError?: boolean | string | Error;
  onErrorRetry?: () => Promise<void>;
  // Props To Provision infinite scroll
  isLoading?: boolean;
  onLastRowIsVisible?: () => void; // To Trigger infinite scroll
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
  selectedRows: { rowId: string | number }[];
  onRowClick: (row: Row, rowIndex: number) => void;
  onSelectOneRow: (rowId: string | number) => void;
  onLastRowIsVisible?: () => void; // To Trigger infinite scroll
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
