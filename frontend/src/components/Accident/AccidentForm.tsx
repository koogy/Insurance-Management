import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import useFetch from "react-fetch-hook";
import { parseURL } from "../../helpers/helperFunctions";
import { useAuth } from "../../providers/AuthProvider";
import { Contract } from "../Account/Contract";

enum AccidentType {
    WaterDamage = "Dégat des eaux",
    Earthquake = "Séisme",
}

export default function AccidentForm() {
    const authContext = useAuth();
    const [selectedContract, setSelectedContract] = useState(0);
    const [accidentType, setAccidentType] = useState(AccidentType.WaterDamage)

    const { data, error } = useFetch<Contract[]>(
        parseURL(`/api/contract/list/${authContext.currentUser?.email}`),
    );

    if (error) {
       console.log('Erreur:', error.message);
        return <p>Error</p>;
    }
    if (!data) {
        return <p>Loading ...</p>;
    }
    if (data.length === 0) {
        return <p>Créer un contrat !</p> //TODO
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                accidentType: accidentType,
                contractId: data[selectedContract].id,
            })
        };
        fetch(parseURL('/api/accident/'), requestOptions)
            .then(response => {
                if (response.ok) console.log("good");
            })
            .catch(error => console.log('Erreur: ', error));
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
                <Grid item xs={12} sx={{mt: 2}}>
                    <Typography><b>Déclarez votre sinistre</b></Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ m: 2, minWidth: 400 }}>
                        <InputLabel id="housing-select-label">Contrat</InputLabel>
                        <Select 
                            name="housingType" 
                            labelId="housing-select-label" 
                            id="housin-select" 
                            label="Contrat" 
                            value={selectedContract}
                            fullWidth
                            onChange={(event) => {
                                setSelectedContract(event.target.value as number)
                            }}
                            renderValue = {value => data[value].address}
                        >
                            {data.map((contract, index) => (
                                <MenuItem key={index} value={index}>{contract.address}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ m: 2, minWidth: 400 }}>
                        <InputLabel id="accident-type-select-label">Type d'accident</InputLabel>
                        <Select 
                            name="accidentType" 
                            labelId="accident-type-select-label" 
                            id="accident-type-select" 
                            label="Type d'accident" 
                            value={accidentType}
                            fullWidth
                            onChange={(event) => {
                                setAccidentType(event.target.value as AccidentType)
                            }}
                        >
                            {Object.values(AccidentType).map(value => (
                                <MenuItem key={value} value={value}>{value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Button variant="contained" type="submit">
                        Envoyer
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}