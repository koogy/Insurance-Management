import useFetch from "react-fetch-hook";
import { parseURL } from "../../helpers/helperFunctions";
import AccidentList from "../Accident/AccidentList";
import { Accident, AccidentFormatted } from "../Accident/AccidentPage";

export default function AdminAccidents() {
    const { data, error } = useFetch<Accident[]>(
        parseURL(`/api/accident/list/`)
    )
  
    if (error) {
        console.log('Erreur:', error.message);
        return <p>Error</p>;
    }
    if (!data) {
        return <p>Loading ...</p>;
    }

    const accidentCorrectlyFormatted = data.map(value => {
        const newAccident : AccidentFormatted = {
            id: value.id,
            accidentType: value.accidentType,
            address: value.contract?.address,
        }
        return newAccident
    })

    return (
        <AccidentList data={accidentCorrectlyFormatted} handleAdminPage={false} />
    )
}