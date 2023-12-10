import React, { useState, useEffect } from 'react';
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
import SkeletonTable from '../customisation/SkeletonTable';
import { SearchBar } from '../controls/SearchBar';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('query');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, rows]);

  const filteredRows = searchEnabled && rows ? filterData(searchQuery, rows) : rows;

  const slicedRows = filteredRows?.slice((page - 1) * pageSize, page * pageSize);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);

    const urlParams = new URLSearchParams(window.location.search);
    if (query !== '') {
      urlParams.set('query', query);
    } else {
      urlParams.delete('query');
    }
    window.history.replaceState(null, '', `${window.location.pathname}?${urlParams}`);
  };


  return (
    <Card style={{ width: '100%', height: '100%', overflow: 'auto', alignItems: 'center' }}>
      <CardContent>
        <Typography variant="overline">{t('your', {item: contentName})}</Typography>
          <Stack direction="column" spacing={3} alignItems="center">
            {searchEnabled && rows && (
              <SearchBar setSearchQuery={handleSearchQueryChange} initialValue={searchQuery} />
            )}
            {rows && children}
            {rows ? (
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell key={column + index}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedRows.map((row, index) => (
                  <TableRow
                    key={row[0] + index}
                    onClick={() => {
                      setSelectedItem(row[0]);
                      setDialogOpen(true);
                    }}
                    hover
                  >
                    {Object.values(row).map((value, index) => (
                      <TableCell key={row[0] + index}>
                        {index === 0 ? <b>{value}</b> : value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table> ) : (
                <Alert severity="info">{t('youHaveNo', {item: t('boxes').toLowerCase()})}</Alert>
            )}
            {pageSize <= rows?.length ? (
              <Pagination
                count={Math.ceil(rows?.length / pageSize)}
                page={page}
                onChange={handleChangePage}
                color="primary"
                variant="outlined"
                defaultPage={0}
              />
            ) : null}
          </Stack>
      </CardContent>
    </Card>
  );
}
