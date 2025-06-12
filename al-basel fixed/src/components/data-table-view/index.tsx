import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
} from "@tanstack/react-table";
import { ArrowUp, ArrowUpDown, CircleCheck, Settings2 } from "lucide-react";
import { Key, useEffect, useState, type CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DialogComponent } from "@/components/shared/DialogComponent";
import { Skeleton } from "@/components/ui/skeleton";
import TooltipComponant from "@/components/shared/TooltipComponant";
import { useTranslation } from "react-i18next";

const getCustomColumnStyles = <T extends Record<string, unknown>>(
  column: Column<T>
): CSSProperties | undefined => {
  if (column.id === "actions") {
    return {
      position: "sticky",
      right: 0,
      zIndex: 1,
      width: "60px",
      minWidth: "60px",
      maxWidth: "60px",
    };
  }
  if (column.id === "check") {
    return {
      width: "60px",
      minWidth: "60px",
      maxWidth: "60px",
    };
  }
  return undefined;
};

export function DataTableView<TData extends Record<string, unknown>>({
  data: initialData,
  loading,
  error,
  columns,
  pageSize = 10,
  customButton = false,
  customButtonClick,
  customButtonText,
  sortable = false,
  setQuaryStr,
  pagination,
}: {
  data: TData[];
  loading: boolean;
  error: string;
  columns: any;
  pageSize?: number;
  customButton?: boolean;
  customButtonClick?: () => void;
  customButtonText?: string;
  sortable?: boolean;
  setQuaryStr?: (quaryStr: string) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}) {
  const [data, setData] = useState<TData[]>(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const {t} = useTranslation();

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (setQuaryStr) {
        setQuaryStr(searchTerm.trim());
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, setQuaryStr]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {/* Top bar with search and custom button */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-2">
        <input
          placeholder={t("Search")}
          value={searchTerm ?? ""}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-input bg-background px-3 py-2 rounded-md text-sm w-full sm:w-[200px]"
        />

        {customButton && (
          <Button onClick={customButtonClick} size="sm">
            {customButtonText}
          </Button>
        )}
      </div>

      <div className="rounded-md border overflow-x-auto relative">
        <Table className="data-table">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`!bg-background ${
                      header.id === "actions" ? "action-header" : ""
                    }`}
                    style={getCustomColumnStyles(header.column)}
                  >
                    <div className="flex-center font-bold">
                      {header.id === "actions" &&
                      table
                        .getAllColumns()
                        .filter(
                          (column) =>
                            column.getCanHide() &&
                            column.id !== "name" &&
                            column.id !== "first_name" && column.id !== "slug" 
                        ).length !== 0 ? (
                        <DialogComponent
                          triggerIcon={<Settings2 />}
                          triggerVariant="ghost"
                          TooltipText={t("Customize Columns")}
                          triggerClassName="h-8 w-8 p-0"
                          triggerText=""
                          title={t("Customize Columns")}
                        >
                          <div className="mt-2 h-full overflow-y-auto p-2">
                            {table
                              .getAllColumns()
                              .filter(
                                (column) =>
                                  column.getCanHide() && column.id !== "name" && column.id !== "slug" && column.id !== "first_name"
                              )
                              .map((column) => (
                                <div
                                  tabIndex={0}
                                  key={column.id}
                                  className="select-none flex-between p-3 group outline-none focus:bg-muted focus-visible:ring-primary cursor-pointer hover:bg-muted/50"
                                  onClick={() =>
                                    column.toggleVisibility(
                                      !column.getIsVisible()
                                    )
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      column.toggleVisibility(
                                        !column.getIsVisible()
                                      );
                                    }
                                  }}
                                >
                                  <h2 className="capitalize">
                                    {typeof column.columnDef.header ===
                                    "function"
                                      ? column.columnDef.header(
                                          header.getContext()
                                        )
                                      : column.columnDef.header}
                                  </h2>
                                  <CircleCheck
                                    className={`h-5 w-5 group-hover:block ${
                                      column.getIsVisible()
                                        ? "text-primary"
                                        : "hidden group-hover:text-gray-400"
                                    }`}
                                  />
                                </div>
                              ))}
                          </div>
                        </DialogComponent>
                      ) : header.isPlaceholder ? null : header.column.getCanSort() &&
                        header.column.id !== "check" &&
                        header.column.id !== "actions" &&
                        sortable ? (
                        <TooltipComponant content="Sort">
                          <Button
                            variant="ghost"
                            onClick={() => {
                              const isSorted = header.column.getIsSorted();
                              if (isSorted === false) {
                                header.column.toggleSorting(false);
                              } else if (isSorted === "asc") {
                                header.column.toggleSorting(true);
                              } else {
                                header.column.clearSorting();
                              }
                            }}
                            className="flex items-center gap-1 group"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getIsSorted() === "asc" ? (
                              <ArrowUp className="h-3 w-3 text-primary" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowUp className="h-3 w-3 text-primary rotate-180" />
                            ) : (
                              <ArrowUpDown className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                            )}
                          </Button>
                        </TooltipComponant>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_: any, j: Key | null | undefined) => (
                    <TableCell key={j}>
                      <Skeleton className="h-7 animation-pulse rounded w-3/4 " />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id === "actions" ? "sticky-actions" : ""
                      }
                      style={getCustomColumnStyles(cell.column)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {error}
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t("No results found")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4">
        {pagination && (
          <>
            <p className="text-sm text-muted-foreground">
              {t("Page")} {pagination.currentPage} {t("of")} {pagination.totalPages}
            </p>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  pagination.onPageChange(pagination.currentPage - 1)
                }
                disabled={!pagination.hasPrevPage}
              >
                {t("Previous")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  pagination.onPageChange(pagination.currentPage + 1)
                }
                disabled={!pagination.hasNextPage}
              >
                {t("Next")}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
