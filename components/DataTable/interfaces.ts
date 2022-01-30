// Components Interfaces
export default interface DataTableProps {
  columns: Array<Column>;
  rows: Array<Row>;
}

export interface TableHeadProps {
  gridTemplateColumns: string;
  rows: Row[];
  columns: Column[];
  sortRowsBy: SortRowsByState;
  setSortRowsBy: any;
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
