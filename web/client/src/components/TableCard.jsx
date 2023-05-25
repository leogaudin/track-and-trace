import React, { useState } from 'react';
import {
  Alert,
  Table,
  Card,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography,
  CardContent,
  Pagination,
  Stack
} from '@mui/material';
import SkeletonTable from './SkeletonTable';
import { SearchBar } from './SearchBar';

const filterData = (query, data) => {
  return data.filter((item) => {
    for (let key in item) {
      if (
        typeof item[key] === 'string' &&
        item[key].toLowerCase().includes(query.toLowerCase())
      ) {
        return true;
      } else if (typeof item[key] === 'object') {
        for (let subKey in item[key]) {
          if (
            typeof item[key][subKey] === 'string' &&
            item[key][subKey].toLowerCase().includes(query.toLowerCase())
          ) {
            return true;
          }
        }
      }
    }
    return false;
  });
};

export default function TableCard({
  contentName = 'items',
  columns,
  rows,
  pageSize = 10,
  setDialogOpen,
  setSelectedItem,
  searchEnabled = true,
  children
}) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredRows = filterData(searchQuery, rows).slice((page - 1) * pageSize, page * pageSize);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card style={{ width: '100%', height: '100%', overflow: 'auto', alignItems: 'center' }}>
      <CardContent>
        <Typography variant="overline">Your {contentName}</Typography>
        {rows?.length ? (
          <Stack direction="column" spacing={3} alignItems="center">
            {searchEnabled ? <SearchBar setSearchQuery={setSearchQuery} /> : false}
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell key={column + index}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.map((row, index) => (
                  <TableRow key={row[0] + index} onClick={() => {
                      setSelectedItem(row[0]);
                      setDialogOpen(true);
                    }} hover>
                    {Object.values(row).map((value, index) => (
                      <TableCell key={row[0] + index}>{index === 0 ? <b>{value}</b> : value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {pageSize <= rows.length
            ? <Pagination
              count={Math.ceil(rows.length / pageSize)}
              page={page}
              onChange={handleChangePage}
              color="primary"
              variant="outlined"
              defaultPage={0}
            />
            : null
          }
          </Stack>
        ) : (
          <React.Fragment>
            {rows === null ? (
              <Alert severity='info'>You have no {contentName}</Alert>
            ) : (
              <SkeletonTable rows={pageSize} />
            )}
          </React.Fragment>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
