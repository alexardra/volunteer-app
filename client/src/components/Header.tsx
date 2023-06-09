import { Link } from 'react-router-dom';
import { Button } from './Button';
import { useAuth } from '@/hooks/useAuth';
import { PersonaRoleTypes } from '@/features/auth/api';

export const Header = ({ children }: { children?: React.ReactNode }) => {
  const { persona } = useAuth();

  let route = '/';

  if (persona !== null) {
    route = {
      [PersonaRoleTypes.ADMIN]: '/admin/dashboard',
      [PersonaRoleTypes.USER]: '/user/portal',
    }[persona.role];
  }

  return (
    <header className="bg-purple-600 px-4 py-2.5 lg:px-6">
      <div className="mx-auto flex max-w-screen-lg flex-wrap items-center justify-between">
        <Link to={route}>
          <div className="align-center flex">
            <Button variant="plain" className="!px-0 text-white">
              Volunteer App
            </Button>
          </div>
        </Link>
        {children}
      </div>
    </header>
  );
};
