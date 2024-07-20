import { OfferCardType } from '../../types';
import { Link } from 'react-router-dom';


type OfferCardProps = {
  offerData: OfferCardType;
  setActiveOffer: (id: string) => void;
  activeOffer: boolean;
}
// удалить пропс activeOffer
function OfferCard({ offerData, setActiveOffer, activeOffer }: OfferCardProps): JSX.Element {
  const ratingInStarsFormat: string = String(parseInt(offerData.rating, 10) * 20);
  const isPremium: boolean = (/true/i).test(offerData.premium);

  return (
    <article className={`cities__card place-card ${activeOffer ? '' : 'place-card--active'}`} onMouseEnter={() => setActiveOffer(offerData.id)}>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src="img/apartment-01.jpg" width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{offerData.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingInStarsFormat}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offerData.id}`}>{offerData.name}</Link>
        </h2>
        <p className="place-card__type">{offerData.type}</p>
      </div>
    </article >
  );
}

export default OfferCard;
