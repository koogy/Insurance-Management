import useFetch from 'react-fetch-hook';
import { parseURL } from '../../helpers/helperFunctions';
import QuoteList from '../List/QuoteList';
import { Quote } from '../Account/UserQuote';

export default function AdminQuotes() {
  const { data, error } = useFetch<Quote[]>(parseURL('/api/quotes/list'));

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }
  if (!data) {
    return <div>Loading ...</div>;
  }

  return <QuoteList data={data} handleAdminPage={true} />;
}
