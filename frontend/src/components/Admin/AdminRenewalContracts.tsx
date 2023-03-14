import useFetch from "react-fetch-hook";
import {Contract} from "../Account/Contract";
import {parseURL} from "../../helpers/helperFunctions";
import ContractList from "../List/ContractList";

export default function AdminRenewalContracts() {
    const {data, error} = useFetch<Contract[]>(
        parseURL(`/api/contract/state/Renouveler`)
    );

    if (error) {
        console.log(error);
        return <div>Error</div>
    }
    if (!data) {
        return <div>Loading ...</div>;
    }

    return <ContractList data={data} handleAdminPage={true} />;
}