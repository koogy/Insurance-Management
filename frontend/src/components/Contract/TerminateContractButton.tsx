import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import BlockIcon from '@mui/icons-material/Block';
import { Contract } from "../Account/Contract";
import { parseURL } from "../../helpers/helperFunctions";
import { useState } from "react";

interface TerminateContractButtonProps {
  contract: Contract;
  updateContractTerminate: (id : number, newState : string) => void
}

export default function TerminateContractButton({ contract, updateContractTerminate } : TerminateContractButtonProps) {
    const [ open, setOpen ] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAcceptClick = () => {
        handleClose()
        const contractID = contract.id;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ state: "Resilié" }),
        };
        fetch(parseURL(`/api/contract/terminate/${contractID}`), requestOptions)
            .then((response) => {
                if (response.ok) {
                    updateContractTerminate(contractID, "Résilié");
                } 
                else {
                    console.log('error : ');
                    console.log(response);
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <IconButton
                onClick={handleClickOpen}>
                <BlockIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Résilier le contrat ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Êtes-vous sûr de vouloir résilier votre contrat ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleAcceptClick} autoFocus>Résilier</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}