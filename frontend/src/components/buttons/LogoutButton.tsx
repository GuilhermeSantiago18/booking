import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import MainButton from '@/components/buttons/MainButton';

interface LogoutButtonProps {
  style?: string;
}

export default function LogoutButton(className: LogoutButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    queryClient.clear();

    router.push('/login');
  };

  return (
    <MainButton onClick={handleLogout} className={className.style}>
      Logout
    </MainButton>
  );
}
