import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { CustomInputEvent } from "../models/CustomEvent";

interface HouseQuoteProps {
    handleChange: (event: CustomInputEvent) => void,
    housingType: string,
}

export default function HouseQuote({handleChange, housingType} : HouseQuoteProps) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControl sx={{ width: 1 }}>
                    <InputLabel id="housing-select-label">Type de logement</InputLabel>
                    <Select 
                        name="housingType" 
                        labelId="housing-select" 
                        id="housin-select" 
                        label="Type de logement" 
                        value={housingType}
                        fullWidth
                        onChange={handleChange}
                    >
                        <MenuItem value="Appartement">Appartement</MenuItem>
                        <MenuItem value="Maison">Maison</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            
            <Grid item xs={12}>
                <TextField name="nbRooms" label="Nombre de pièces" type="number" onChange={handleChange} fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField name="nbFloors" label="Nombre d'étages" type="number" onChange={handleChange} fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    name="surfaceArea"
                    label="Surface" 
                    type="number"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">m<sup>2</sup></InputAdornment>
                    }}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
        </Grid>
    )
}