import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { PersonaAuthResponse, registerUser } from '../api';
import { RegisterForm } from '../components/RegisterForm';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <div className="h-100 flex w-full items-center justify-center">
      <RegisterForm
        registerPersona={registerUser}
        onSuccess={(authResponse: PersonaAuthResponse) => {
          window.localStorage.setItem('token', authResponse.token);
          void queryClient.invalidateQueries({ queryKey: ['auth'] });

          navigate('/user/portal');
        }}
      />
    </div>
  );
};
