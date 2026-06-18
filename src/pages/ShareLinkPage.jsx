import { useParams } from 'react-router-dom';
import OpenInApp from '../components/OpenInApp.jsx';

export function PostSharePage() {
  const { id } = useParams();
  return <OpenInApp type="post" id={id} />;
}

export function ProfileSharePage() {
  const { id } = useParams();
  return <OpenInApp type="profile" id={id} />;
}
