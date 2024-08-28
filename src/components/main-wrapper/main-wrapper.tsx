import { useParams, Navigate } from 'react-router-dom';
import { AppRoute } from '../../constants';

const CITY_LIST = ['paris', 'cologne', 'brussels', 'amsterdam', 'hamburg', 'dusseldorf'];

type propsType = {
  children: JSX.Element;
}
const MainWrapper = ({ children }: propsType) => {
  const { city } = useParams();
  const isValid = city !== undefined && CITY_LIST.includes(city);

  return isValid ? children : <Navigate to={AppRoute.Error} replace />;
};

export default MainWrapper;
