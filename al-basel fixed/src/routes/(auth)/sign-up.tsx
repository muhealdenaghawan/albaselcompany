import { createFileRoute, redirect } from '@tanstack/react-router'
import SignUp from '@/features/auth/sign-up'
import isAuthenticated from '@/http-config/isAuthenticated';
import Cookies from 'js-cookie';
import { Constants, RolesConstant } from '@/constants/constants';

export const Route = createFileRoute('/(auth)/sign-up')({
  component: SignUp,
      beforeLoad: () => {
      if (isAuthenticated()){
     const account = JSON.parse(Cookies.get(Constants.ACCOUNT) as string);
    const role = account.user.role;
   
      if (role === RolesConstant.employee) throw redirect({ to: "/projects", search: {
            redirect: location.href,
          } });
      if (role === RolesConstant.CLIENT) throw redirect({ to: "/client", search: {
            redirect: location.href,
          } });
if (role === RolesConstant.ADMIN) throw redirect({ to: "/", search: {
            redirect: location.href,
          } });
   
      }
        
       
    },
})
