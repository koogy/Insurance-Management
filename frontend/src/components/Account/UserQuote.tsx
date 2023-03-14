import {useAuth} from "../../providers/AuthProvider";
import useFetch from "react-fetch-hook";
import Banner from "../Banner";
import React from "react";
import { parseURL } from "../../helpers/helperFunctions";
import QuoteList from "../List/QuoteList";

export interface Quote {
    id: number;
    address: string;
    city: string;
    postalCode: string;
    premium: number;
    name: string;
    email: string;
    signed: boolean;
    housingType: string,
    nbRooms: number,
    nbFloors: number,
    surfaceArea: number,
    createdAt: Date;
    updatedAt: Date;
}

export default function UserQuote() {
    const authContext = useAuth()
    const description =
        "Chez WIC, nous vous offrons une gamme d'assurances de prêt immobilier adaptée à vos besoins";
    const backgroundImage = '/happy.jpg';
    const email = authContext.currentUser?.email;
    const {data, error} = useFetch<Quote[]>(
        parseURL(`/api/quotes/list/${email}`),
    );
    if (error) {
        console.log(error);
        return <p>Error</p>;
    }
    if (!data) {
        return <p>Loading ...</p>;
    }

    return (
        <div>
            <Banner
                description={description}
                quotation_button={true}
                image={backgroundImage}
            />
            <QuoteList 
                data={data}
                handleAdminPage={false}
                email={email}
            />
        </div>
    )
}