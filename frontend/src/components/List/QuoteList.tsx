import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Quote } from '../Account/UserQuote';
import { parseURL } from '../../helpers/helperFunctions';
import { styledTableCell, styledTableRow } from './TableStyles';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

interface QuoteProps {
  data: Quote[];
  handleAdminPage: boolean;
  email?: string;
}
interface Data {
  id: number,
  name: string,
  email: string,
  address: string,
  city: string,
  postalCode: string,
  premium: string,
  housingType: string,
  nbRooms: string,
  nbFloors: string,
  surfaceArea: string,
}

type Order = 'asc' | 'desc';
interface Header {
  id: keyof Data,
  name: string,
  isCentered: boolean
}

const headers: Header[] = [
  {id: 'id', name: 'ID', isCentered: false},
  {id: 'name', name: 'Nom', isCentered: true},
  {id: 'email', name: 'Email', isCentered: true},
  {id: 'address', name: 'Adresse', isCentered: true},
  {id: 'city', name: 'Ville', isCentered: true},
  {id: 'postalCode', name: 'Code Postal', isCentered: true},
  {id: 'housingType', name: 'Type de logement', isCentered: true},
  {id: 'nbRooms', name: 'Nombre de pièces', isCentered: true},
  {id: 'nbFloors', name: "Nombre d'étages", isCentered: true},
  {id: 'surfaceArea', name: 'Surface', isCentered: true},
  {id: 'premium', name: 'Premium', isCentered: true}
];

export default function QuoteList(props: QuoteProps) {
  const [quotes, setQuotes] = useState<Quote[]>(props.data);
  const [hideDialog, setHideDialog] = useState(true);
  const StyledTableCell = styledTableCell;
  const StyledTableRow = styledTableRow;

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const quoteId = e.currentTarget.value;

    console.log(quoteId);
    if (quoteId) {
      const contractID = parseInt(quoteId);
      const selectedQuote = props.data.find((obj) => obj.id === contractID);
      const newContract = {
        name: selectedQuote?.name,
        address: selectedQuote?.address,
        premium: selectedQuote?.premium,
        postalCode: selectedQuote?.postalCode,
        email: selectedQuote?.email,
        city: selectedQuote?.city,
        housingType: selectedQuote?.housingType,
        nbRooms: selectedQuote?.nbRooms,
        nbFloors: selectedQuote?.nbFloors,
        surfaceArea: selectedQuote?.surfaceArea,
        state: 'En cours de traitement',
      };

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContract),
      };
      fetch(parseURL(`/api/contract`), requestOptions)
        .then(async (response) => {
          if (!response.ok) {
            console.log('error : ');
            console.log(response);
          } else {
            console.log(response.ok);
            setDialog(false);
            await updateQuote(quoteId);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    const quoteID = parseInt(value);

    fetch(parseURL(`/api/quotes/delete/${quoteID}`))
      .then((response) => {
        if (response.ok) {
          const newQuotes = quotes
            .filter((obj) => {
              return obj.id !== quoteID;
            })
            .map((obj) => {
              return obj;
            });

          setQuotes(newQuotes);
        } else {
          console.log('error : ');
          console.log(response);
        }
      })
      .catch((error) => console.log(error));
  };

  function setDialog(value: boolean): void {
    setHideDialog(value);
  }

  async function updateQuote(quoteId: string): Promise<void> {
    const quoteIdInt = parseInt(quoteId);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({signed: true}),
    };

    fetch(parseURL(`/api/quotes/update/${quoteIdInt}`), requestOptions)
        .then(async (response) => {
          if (!response.ok) {
            console.log('error : ');
            console.log(response);
          } else {
            console.log('Quote updated');
            const newQuotes = quotes.map((quote) => {
              if (quote.id === quoteIdInt) {
                return { ...quote, signed: true };
              }

              return quote;
            });

            setQuotes(newQuotes);
          }
        })
        .catch((error) => console.log(error));
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
    <div>
      <div className="dialog" hidden={hideDialog}>
        Le devis a été signé, vous pouvez dès maintenant le retrouver dans l'espace "Mes contrats" !
      </div>

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
              <StyledTableCell align="center">
                {props.handleAdminPage && 'Convertir en contrat'}
              </StyledTableCell>
              {props.handleAdminPage && (
                <StyledTableCell align="center">Actions</StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {quotes.sort(getComparator(order, orderBy)).slice().map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.address}</StyledTableCell>
                <StyledTableCell align="center">{row.city}</StyledTableCell>
                <StyledTableCell align="center">{row.postalCode}</StyledTableCell>
                <StyledTableCell align="center">{row.housingType}</StyledTableCell>
                <StyledTableCell align="center">{row.nbRooms}</StyledTableCell>
                <StyledTableCell align="center">{row.nbFloors}</StyledTableCell>
                <StyledTableCell align="center">{row.surfaceArea}</StyledTableCell>
                <StyledTableCell align="center">{row.premium}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    aria-label="Signer"
                    title="Signer"
                    value={row.id}
                    onClick={handleOnClick}
                    disabled={row.signed}
                  >
                    <BorderColorIcon />
                  </IconButton>
                </StyledTableCell>
                {props.handleAdminPage && (
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
    </div>
  );
}
