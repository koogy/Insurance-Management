import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PaymentIcon from '@mui/icons-material/Payment';
import CloseIcon from '@mui/icons-material/Close';
import React, {useState} from 'react';
import {parseURL} from '../../helpers/helperFunctions';
import {Contract} from '../Account/Contract';
import {styledTableCell, styledTableRow} from './TableStyles';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import {PDFDownloadLink} from '@react-pdf/renderer';
import ContractPDF from '../ContractPDF'
import DownloadIcon from '@mui/icons-material/Download';
import PendingIcon from '@mui/icons-material/Pending';
import TerminateContractButton from '../Contract/TerminateContractButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import EmailIcon from '@mui/icons-material/Email';
import { Box, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';



interface ContractProps {
    data: Contract[];
    handleAdminPage: boolean;
}
interface Data {
    id: number,
    name: string,
    address: string,
    city: string,
    postalCode: string,
    premium: string,
    state: string,
    housingType: string,
    nbRooms: number,
    nbFloors: number,
    surfaceArea: number,
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
    {id: 'address', name: 'Adresse', isCentered: true},
    {id: 'city', name: 'Ville', isCentered: true},
    {id: 'postalCode', name: 'Code Postal', isCentered: true},
    {id: 'housingType', name: 'Type de logement', isCentered: true},
    {id: 'nbRooms', name: 'Nombre de pièces', isCentered: true},
    {id: 'nbFloors', name: "Nombre d'étages", isCentered: true},
    {id: 'surfaceArea', name: 'Surface', isCentered: true},
    {id: 'premium', name: 'Premium', isCentered: true},
    {id: 'state', name: 'Statut', isCentered: true},
];

export default function ContractList(props: ContractProps) {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [hideDialog, setHideDialog] = useState(true);
    const StyledTableCell = styledTableCell;
    const StyledTableRow = styledTableRow;

  const updateContractState = (id : number, newState : string) => {
    const newContracts = contracts.map((obj) => {
        if (obj.id === id) {
          return { ...obj, state: newState };
        }

        return obj;
      });
    setContracts(newContracts);
  }


  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const title = e.currentTarget.title;
    const value = e.currentTarget.value;
    const contractIDString = e.currentTarget.getAttribute('data-contract');

    if (contractIDString) {
      const contractID = parseInt(contractIDString);

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: value }),
      };

      fetch(parseURL(`/api/contract/updateState/${contractID}`), requestOptions)
        .then((response) => {
          if (response.ok) {
            updateContractState(contractID, value)
          } else {
            console.log('error : ');
            console.log(response);
          }
        })
        .catch((error) => console.log(error));

        const selectedQuote = props.data.find((obj) => obj.id === contractID);
        const currentExpiredDate = selectedQuote?.expirationDate as Date

        var newDate 
        if(title ==="Renouveler") {
            newDate =  JSON.stringify({ expirationDate: new Date(new Date(currentExpiredDate).setFullYear(new Date(currentExpiredDate).getFullYear() + 1))})
        } else if(value ==="Confirmé")  {
            newDate = JSON.stringify({ expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) })
        }

        if(value==='Confirmé' || title ==="Renouveler"){
            fetch(parseURL(`/api/contract/updateExpirationDate/${contractID}`), 
            {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: newDate, })
            .catch((error) => console.log(error));

            /*  Set notified to false on renewal */
            fetch(parseURL(`/api/contract/updateNotified/${contractID}`), 
            {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ notified : false}), })
            .catch((error) => console.log(error));
        }
    }
  };

    const handleState = (row: Contract) => {
        const resetButton = (
            <IconButton
                aria-label="Réinitialiser"
                title="Réinitialiser"
                data-contract={row.id}
                value="En cours de traitement"
                onClick={handleOnClick}
            >
                <RestartAltIcon/>
            </IconButton>
        );
        const signButton = (
            <IconButton
                aria-label="Signer"
                title="Signer"
                data-contract={row.id}
                value="Signé"
                onClick={handleOnClick}
            >
                <BorderColorIcon/>
            </IconButton>
        );

        const renewButton = (
            <IconButton
                aria-label="Payer & Renouveler"
                title="Renouveler"
                data-contract={row.id}
                value="Confirmé"
                onClick={handleOnClick}
            >
                <AutorenewIcon/>
            </IconButton>
        );

        const payButton = (
            <IconButton
                aria-label="Payer"
                title="Payer"
                data-contract={row.id}
                value="Confirmé"
                onClick={handleOnClick}
            >
                <PaymentIcon/>
            </IconButton>
        );
        const cancelButton = (
            <IconButton
                aria-label="Annuler"
                title="Annuler"
                data-contract={row.id}
                value="Annulé"
                onClick={handleOnClick}
            >
                <CloseIcon/>
            </IconButton>
        );

        if (props.handleAdminPage) {
            return (
                <StyledTableCell align="center">
                    {resetButton}
                    {signButton}
                    {payButton}
                    {cancelButton}
                    <TerminateContractButton contract={row} updateContractTerminate={updateContractState}/>
                </StyledTableCell>
            );
        }

        return (
            <StyledTableCell align="center">
                {row.state.includes('traitement') && signButton}
                {row.state.includes('Sign') && payButton}
                {row.state.includes('Confirm') && <TerminateContractButton contract={row} updateContractTerminate={updateContractState}/>}
                {(row.state.includes('Expir') || row.state.includes('Renouveler'))  && renewButton}
                {(row.state.includes('traitement') || row.state.includes('Sign')) &&
                    cancelButton}
            </StyledTableCell>
        );
    };

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.value;
        const contractID = parseInt(value);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: contractID}),
        };
        fetch(parseURL(`/api/contract/delete/${contractID}`), requestOptions)
            .then((response) => {
                if (response.ok) {
                    const newContracts = contracts
                        .filter((obj) => {
                            if (obj.id === contractID) {
                                return false;
                            }
                            return true;
                        })
                        .map((obj) => {
                            return obj;
                        });

                    setContracts(newContracts);
                    setDialog(true);
                } else {
                    console.log('error : ');
                    console.log(response);
                }
            })
            .catch((error) => console.log(error));
    };

    const handleSendEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.value;
        const contractID = parseInt(value);
        fetch(parseURL(`/api/contract/expiring/${contractID}`))
        setDialog(false);
    };

    if (contracts.length === 0 && props.data.length !== 0) {
        setContracts(props.data);
    }

    function setDialog(value: boolean): void {
        setHideDialog(value);
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
                Un mail de renouvellement de contrat a été envoyé au client !
            </div>
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
                            <StyledTableCell align="center">Téléchargement</StyledTableCell>
                            <StyledTableCell align="center">
                                {props.handleAdminPage ? 'Changer les statuts' : 'Changer le statut'}
                            </StyledTableCell>
                            {props.handleAdminPage && (
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contracts.sort(getComparator(order, orderBy)).slice().map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.name}</StyledTableCell>
                                <StyledTableCell align="center">{row.address}</StyledTableCell>
                                <StyledTableCell align="center">{row.city}</StyledTableCell>
                                <StyledTableCell align="center">{row.postalCode}</StyledTableCell>
                                <StyledTableCell align="center">{row.housingType}</StyledTableCell>
                                <StyledTableCell align="center">{row.nbRooms}</StyledTableCell>
                                <StyledTableCell align="center">{row.nbFloors}</StyledTableCell>
                                <StyledTableCell align="center">{row.surfaceArea}</StyledTableCell>
                                <StyledTableCell align="center">{row.premium}</StyledTableCell>
                                <StyledTableCell align="center">{row.state}</StyledTableCell>
                                <StyledTableCell align="center">     
                                    {row.state.includes('Confirmé') && 
                                        <PDFDownloadLink document={ContractPDF(row)}
                                                     fileName={"CONTRAT#" + row.id + "-" + row.name}>
                                          {({loading}) => (loading ? <IconButton><PendingIcon/></IconButton> :
                                            <IconButton><DownloadIcon/></IconButton>)}
                                      </PDFDownloadLink>}
                                </StyledTableCell>

                                {handleState(row)}
                                {props.handleAdminPage && (
                                    <StyledTableCell align="center">
                                        <IconButton
                                            aria-label="Supprimer"
                                            title="Supprimer"
                                            value={row.id}
                                            onClick={handleRemove}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                        {row.state.includes('Expiré') &&
                                            <IconButton
                                                aria-label="Notifier"
                                                title="Notifier"
                                                value={row.id}
                                                onClick={handleSendEmail}
                                            >
                                                <EmailIcon/>
                                            </IconButton>}
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
