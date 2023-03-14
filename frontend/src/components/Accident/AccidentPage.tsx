import { useAuth } from '../../providers/AuthProvider';
import Banner from '../Banner';
import useFetch from 'react-fetch-hook';
import { parseURL } from '../../helpers/helperFunctions';
import { Contract } from '../Account/Contract';
import AccidentList from './AccidentList';

export interface Accident {
  id: number;
  accidentType: string;
  contract: Contract
}

export interface AccidentFormatted {
  id: number;
  accidentType: string;
  address: string,
}

export default function AccidentPage() {
  const authContext = useAuth()

  const { data, error } = useFetch<Accident[]>(
    parseURL(`/api/accident/list/${authContext.currentUser?.email}`)
  )
  
  if (error) {
    console.log('Erreur:', error.message);
    return <p>Error</p>;
  }
  if (!data) {
    return <p>Loading ...</p>;
  }

  const description = 'Retrouvez vos contrats ici !';
  const backgroundImage = '/papers.jpg';

  const accidentCorrectlyFormatted = data.map(value => {
    const newAccident : AccidentFormatted = {
      id: value.id,
      accidentType: value.accidentType,
      address: value.contract.address,
    }
    return newAccident
  })
  return (
    <div>
      <Banner
        description={description}
        quotation_button={false}
        image={backgroundImage}
      />
      <AccidentList data={accidentCorrectlyFormatted} handleAdminPage={false} />
    </div>
  );
}
