import useFetch from 'react-fetch-hook';
import { parseURL } from '../../helpers/helperFunctions';
import ContractList from '../List/ContractList';
import { Contract } from '../Account/Contract';

export default function AdminContracts() {
  const { data, error } = useFetch<Contract[]>(parseURL('/api/contract/list'));

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }
  if (!data) {
    return <div>Loading ...</div>;
  }

  return <ContractList data={data} handleAdminPage={true} />;
}
