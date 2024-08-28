import { useEffect } from 'react';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuthAction } from '../../services/api-actions';
import { selectAutorizationStatus } from '../../store/slices/authorization-slice';

type PrivateRouteProps = {
  children: JSX.Element;
}

function FavoritePrivateRoute({ children }: PrivateRouteProps) {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);
  const authorizationStatus = useAppSelector(selectAutorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default FavoritePrivateRoute;
