import { useAuth } from '../../providers/AuthProvider';
import Banner from '../Banner';
import useFetch from 'react-fetch-hook';
import { parseURL } from '../../helpers/helperFunctions';
import ContractList from '../List/ContractList';

export interface Contract {
  id: number;
  address: string;
  city: string;
  postalCode: string;
  premium: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  expirationDate : Date,
  notified: boolean,
  state: string; // En cours de traitement / Signé / Expiré / Confirmé / Annulé / Resilié
  housingType: string,
  nbRooms: number,
  nbFloors: number,
  surfaceArea: number,
}

export default function AccountContract() {
  const authContext = useAuth();

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

  const description = 'Retrouvez vos contrats ici !';
  const backgroundImage = '/papers.jpg';

  return (
    <div>
      <Banner
        description={description}
        quotation_button={false}
        image={backgroundImage}
      />
      <ContractList data={data} handleAdminPage={false} />
    </div>
  );
}
