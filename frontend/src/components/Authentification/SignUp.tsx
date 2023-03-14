import {Button, Grid, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {useState} from "react";
import { parseURL } from "../../helpers/helperFunctions";
import { adressModel } from "../../models/adressModel";
import AdressAutoComplete from "../AdressAutoComplete";

export default function SignUp() {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        city: "",
        phoneNumber: "",
        address: "",
        postalCode: "",
    })

    const [hideDialog, setHideDialog] = useState(true);

    const handleChange = (event: { target: { name: string; value: string; }; }) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}))
    }

    const handleChangeAddress = (address : adressModel | null) => {
        if (address) {
            setData(data => ({...data, address: address.label, city: address.city, postalCode: address.postcode}))
        }
        else {
            setData(data => ({...data, address: "", city: "", postalCode: ""}))
        }
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        fetch(parseURL('/api/auth/signup'), requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                setHideDialog(false)
            })
            .catch((error) => console.log(error));
    }


    return (
        <div>
            <div className="dialog" hidden={hideDialog}>
                Votre espace client a été créé, veuillez confirmer votre adresse email !
            </div>
            <Container sx={{
                width: 1 / 2,
                my: 2
            }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField name="firstName" label="Prénom" onChange={handleChange} fullWidth/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name="lastName" label="Nom" onChange={handleChange} fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="password" label="Mot de passe" onChange={handleChange} type="password"
                                       fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="email" label="Email" onChange={handleChange} type="email" fullWidth/>
                        </Grid>
                        <AdressAutoComplete handleChange={handleChangeAddress} city={data.city} postalCode={data.postalCode}/>
                        <Grid item xs={12}>
                            <TextField name="phoneNumber" label="Numéro de téléphone" onChange={handleChange} fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type="submit">
                                Créer votre compte
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>


    )
}