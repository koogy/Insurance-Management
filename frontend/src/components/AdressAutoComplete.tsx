import { Autocomplete, Grid, TextField } from "@mui/material"
import { useState } from "react"
import { adressAPiResultModel, adressModel } from "../models/adressModel"

interface AdressAutoCompleteProps {
    handleChange: (address : adressModel | null) => void,
    city: string,
    postalCode: string,
}

export default function AdressAutoComplete(props : AdressAutoCompleteProps) {

    const {
        handleChange,
        city,
        postalCode
    } = props

    const [ options, setOptions] = useState<adressModel[]>([])

    const onInputChange = (_event: React.SyntheticEvent, value: string) => {
        //Checking if length is > 2 otherwise there is an error with the fetch coming from the API
        const query = value.replaceAll(" ","+")
        if (query.length > 2) {
            fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&limit=15`)
            .then(response => {
                return response.json()
            })
            .then((adresses : adressAPiResultModel) => {
                const adressLabels = adresses.features.map(adress => adress.properties)
                setOptions(adressLabels)
            })
            .catch(error => console.log(error))
        }
        else {
            setOptions([])
        }
    }

    return (
        <>
            <Grid item xs={12}>
                <Autocomplete 
                    options={options} 
                    onChange = {(event, value : adressModel | null) => handleChange(value)}
                    onInputChange={onInputChange} 
                    renderInput={(params) => <TextField {...params} label="Adresse" />} 
                    fullWidth
            filterOptions={(options) => options}
                    selectOnFocus
                    clearOnBlur={false}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField value={city} name="city" label="Ville" fullWidth disabled/>
            </Grid>
            <Grid item xs={6}>
                <TextField value={postalCode} name="postalCode" label="Code Postal" fullWidth disabled/>
            </Grid>
        </>
    )
} 