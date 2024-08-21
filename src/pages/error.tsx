import Header from '../components/header/header.tsx';
import { Link } from 'react-router-dom';
import { AppRoute } from '../constants';


function ErrorScreen(): JSX.Element {

  return (

    <div className="page page--gray page--login">
      <Header hasNavigation={false} />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <div>
            <h1>404. Page not found</h1>
            <p style={{
              color: '#fff',
              backgroundColor: '#4481c3',
              display: 'inline-block',
              marginTop: '0',
              padding: '9px 21px 6px 11px',
              fontSize: '19px',
              fontWeight: '700',
              fontStyle: 'oblique',
              borderRadius: '3px'
            }}
            >
              <Link to={AppRoute.Main}>Вернуться на главную</Link>
            </p>
          </div>

        </div>
      </main >
    </div >
  );
}

export default ErrorScreen;
