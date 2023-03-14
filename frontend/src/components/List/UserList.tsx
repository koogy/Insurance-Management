import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { User } from '../../providers/AuthProvider';
import { styledTableCell, styledTableRow } from './TableStyles';
import { parseURL } from '../../helpers/helperFunctions';
import { useState } from 'react';
import { Box, IconButton, TableSortLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { visuallyHidden } from '@mui/utils';

interface UserProps {
  data: User[];
}

interface Data {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  city: string,
  address: string,
  postalCode: string,
  phoneNumber: string
}

type Order = 'asc' | 'desc';
interface Header {
  id: keyof Data,
  name: string,
  isCentered: boolean
}

const headers: Header[] = [
  {id: 'id', name: 'ID', isCentered: false},
  {id: 'firstName', name: 'Prénom', isCentered: true},
  {id: 'lastName', name: 'Nom', isCentered: true},
  {id: 'email', name: 'Email', isCentered: true},
  {id: 'city', name: 'Ville', isCentered: true},
  {id: 'address', name: 'Adresse', isCentered: true},
  {id: 'postalCode', name: 'Code Postal', isCentered: true},
  {id: 'phoneNumber', name: 'Téléphone', isCentered: true},
];

/* NOTE: this function is only used on the admin page, there is no check beforehand for it ! */
export default function ContractList(props: UserProps) {
  const [users, setUsers] = useState<User[]>([]);
  const StyledTableCell = styledTableCell;
  const StyledTableRow = styledTableRow;

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    const userID = parseInt(value);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userID }),
    };
    fetch(parseURL(`/api/user/delete/${userID}`), requestOptions)
      .then((response) => {
        if (response.ok) {
          const newUsers = users
            .filter((obj) => {
              if (obj.id === userID) {
                return false;
              }
              return true;
            })
            .map((obj) => {
              return obj;
            });

          setUsers(newUsers);
        } else {
          console.log('error : ');
          console.log(response);
        }
      })
      .catch((error) => console.log(error));
  };

  if (users.length === 0 && props.data.length !== 0) {
    setUsers(props.data);
  }

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('id');

  const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
  };

  const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof Data,
    ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
    
  function getComparator<Key extends keyof any>(
      order: Order,
      orderBy: Key,
    ): (
      a: { [key in Key]: number | string },
      b: { [key in Key]: number | string },
    ) => number {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          {headers.map(header => (
              <StyledTableCell align={header.isCentered ? 'center' : 'inherit'}>
                  <TableSortLabel
                      active={orderBy === header.id}
                      direction={orderBy === header.id ? order : 'asc'}
                      onClick={createSortHandler(header.id)}
                      >
                      {header.name}
                      {orderBy === header.id ? (
                          <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </Box>
                      ) : null}
                  </TableSortLabel>
              </StyledTableCell>
            ))}
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.sort(getComparator(order, orderBy)).slice().map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.firstName}</StyledTableCell>
              <StyledTableCell align="center">{row.lastName}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.city}</StyledTableCell>
              <StyledTableCell align="center">{row.postalCode}</StyledTableCell>
              <StyledTableCell align="center">{row.address}</StyledTableCell>
              <StyledTableCell align="center">
                {row.phoneNumber}
              </StyledTableCell>
              {!row.isAdmin && (
                <StyledTableCell align="center">
                  <IconButton
                    aria-label="Supprimer"
                    title="Supprimer"
                    value={row.id}
                    onClick={handleRemove}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
