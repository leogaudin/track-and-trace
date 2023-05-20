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

export default function TableCard({
  contentName = 'items',
  columns,
  rows,
  sortBy,
  pageSize = 10,
  setDialogOpen,
  setSelectedItem,
  children
}) {
  const [page, setPage] = useState(1);

  const sortedRows = rows
    ? rows
        .sort((a, b) => b[sortBy] - a[sortBy])
        .slice((page - 1) * pageSize, page * pageSize)
    : null;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card style={{ width: '100%', height: '100%', overflow: 'auto', alignItems: 'center' }}>
      <CardContent>
        <Typography variant="overline">Your {contentName}</Typography>
        {rows && rows.length ? (
          <Stack direction="column" spacing={3} alignItems="center">
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell key={index}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRows.map((row, index) => (
                  <TableRow key={index} onClick={() => {
                      setSelectedItem(row[0]);
                      setDialogOpen(true);
                    }} hover>
                    {Object.values(row).map((value, index) => (
                      <TableCell key={index}>{index === 0 ? <b>{value}</b> : value}</TableCell>
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
              <Typography variant="body1">You have no {contentName}</Typography>
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
