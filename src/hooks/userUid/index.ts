import { useParams } from 'next/navigation';

export function UserUid() {
  const { uid } = useParams<{ uid: string }>();
  return uid;
}
