import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header.tsx';
import { AppRoute } from '../../constants';


function ErrorScreen(): JSX.Element {

  return (

    <div className="page page--gray page--login">
      <Helmet>
        <title>Six cities. Page not found.</title>
      </Helmet>
      <Header hasNavigation={false} />
      <main className="page__main page__main--login">
        <div
          style={{ textAlign: 'center', }}
          className="page__login-container container"
        >
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
