import {useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import '../styles/Quote.css';
import {useAuth} from "../providers/AuthProvider";
import {Container} from "@mui/system";
import { Typography } from '@mui/material';
import { parseURL } from "../helpers/helperFunctions";
import AdressAutoComplete from "./AdressAutoComplete";
import { adressModel } from "../models/adressModel";
import HouseQuote from "./HouseQuote";
import { CustomInputEvent } from "../models/CustomEvent";

export default function Quote() {
    const authContext = useAuth()
    const currentUser = authContext.currentUser;

    const [hideDialog, setHideDialog] = useState(true);
    const [datas, setDatas] = useState({
        address: '',
        name: currentUser ? currentUser.lastName : '',
        email: currentUser ? currentUser.email : '',
        city: '',
        postalCode: "",
        housingType: "Appartement",
        nbRooms: "",
        nbFloors: "",
        surfaceArea: ""
    });

    const handleChange = (event: CustomInputEvent) => {
        const name = event.target.name;
        const data = event.target.value;
        setDatas(datas => ({...datas, [name]: data}))
    }

    const handleChangeAddress = (address : adressModel | null) => {
        if (address) {
            setDatas(datas => ({...datas, address: address.label, city: address.city, postalCode: address.postcode}))
        }
        else {
            setDatas(datas => ({...datas, address: "", city: "", postalCode: ""}))
        }
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datas)
        };
        fetch(parseURL('/api/quotes/'), requestOptions)
            .then(response => {
                if (response.ok) setHideDialog(false);
            })
            .catch(error => console.log('Erreur: ', error));
    }

    return (
        <div>
            <div className="dialog" hidden={hideDialog}>
                Merci pour votre confiance, votre devis a été créé, retrouvez le sur votre espace client.
            </div>
            <Container>
                <Typography variant="h4" sx={{ mb: 4, mt: 4 }}><b>Mon devis :</b></Typography>
                <Typography variant="h6">Mon assurance en moins de 3 minutes</Typography>
            </Container>
            <div className="quote-body">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs mx={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField value={datas.name} name="name" label="Nom" onChange={handleChange} fullWidth/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField value={datas.email} name="email" label="Email" onChange={handleChange} type="email" fullWidth/>
                                </Grid>
                                <AdressAutoComplete handleChange={handleChangeAddress} city={datas.city} postalCode={datas.postalCode}/>
                                
                            </Grid>
                        </Grid>
                        <Grid item xs mx={2} sx={{ borderLeft : 2, borderColor: 'primary.main' }}>
                            <HouseQuote handleChange={handleChange} housingType={datas.housingType}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type="submit">
                                Envoyer
                            </Button>
                        </Grid> 
                    </Grid>
                </form>
            </div>
        </div>
    )
}