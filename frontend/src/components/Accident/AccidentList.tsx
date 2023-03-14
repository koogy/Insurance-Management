import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, {useState} from 'react';
import {styledTableCell, styledTableRow} from '../List/TableStyles';
import { Box, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { AccidentFormatted } from './AccidentPage';

interface ContractProps {
    data: AccidentFormatted[];
    handleAdminPage: boolean;
}
interface Data {
    id: number,
    accidentType: string,
    address: string,
}

type Order = 'asc' | 'desc';
interface Header {
    id: keyof Data,
    name: string,
    isCentered: boolean
}

const headers: Header[] = [
    {id: 'id', name: 'ID', isCentered: false},
    {id: 'accidentType', name: "Type d'accident", isCentered: true},
    {id: 'address', name: 'Adresse', isCentered: true},
];

export default function AccidentList(props: ContractProps) {
    const [accidents] = useState<AccidentFormatted[]>(props.data);
    const StyledTableCell = styledTableCell;
    const StyledTableRow = styledTableRow;

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
            <TableContainer component={Paper} sx={{mt: 2}}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accidents.sort(getComparator(order, orderBy)).slice().map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.accidentType}</StyledTableCell>
                                <StyledTableCell align="center">{row.address}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
