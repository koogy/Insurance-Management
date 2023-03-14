import { Button, Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router";
import { parseURL } from "../../helpers/helperFunctions";
import { useAuth } from "../../providers/AuthProvider";

export default function SignIn () {
    const [data, setData] = useState({
        password : "",
        email : "",
    })
    const [hideDialog, setHideDialog] = useState(true);

    const handleChange = (event: { target: { name: string; value: string; }; }) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}))
    }

    const navigate = useNavigate()

    const authContext = useAuth()

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(parseURL('/api/auth/signin'), requestOptions)
            .then(response => {
                if (response.ok) {
                    console.log(response)
                    return response.json()
                }
                else {
                    setHideDialog(false);
                    console.log("error : ", response)
                }
            })
            .then((data) => {
                if (data) {
                    authContext.loginUser(data)
                    navigate("/user/signin/success")
                }
            })
            .catch((error) => console.log(error));
    }


    return (
        <div>
            <div className="dialog" hidden={hideDialog}>
                L'utilisateur n'existe pas ou la combinaison email / mot de passe n'est pas correcte.
            </div>
            <Container sx={{
                width: 1/2,
                my: 2
            }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField name="email" label="Email" onChange={handleChange} type="email" fullWidth/>
                        </Grid>
                        <Grid item xs={12}> 
                            <TextField name="password" label="Mot de passe" onChange={handleChange} type="password" fullWidth/>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" type="submit">
                                Connexion
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    )
}