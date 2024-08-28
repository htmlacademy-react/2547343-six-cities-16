import { AppRoute, AuthorizationStatus } from '../../constants';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { selectAutorizationStatus } from '../../store/slices/authorization-slice';

type PrivateRouteProps = {
  children: JSX.Element;
}

function LoginPublicRoute({ children }: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(selectAutorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <Navigate to={AppRoute.Main} />
      : children
  );
}

export default LoginPublicRoute;
