import './loader.css';

export default function Loading(): JSX.Element {

  return (
    <div className="cities">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places cities__no-places--loader">
          <span className="loader"></span>
        </section>
        <div className="cities__right-section"></div>
      </div>
    </div>
  );
}
