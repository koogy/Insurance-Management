import useFetch from 'react-fetch-hook';
import { parseURL } from '../../helpers/helperFunctions';
import { User } from '../../providers/AuthProvider';
import UserList from '../List/UserList';

export default function AdminUsers() {
  const { data, error } = useFetch<User[]>(parseURL('/api/user/list'));

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }
  if (!data) {
    return <div>Loading ...</div>;
  }

  return <UserList data={data} />;
}
