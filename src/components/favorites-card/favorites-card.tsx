import { Link } from 'react-router-dom';
import { OfferType } from '../../types';
import { formatRating } from '../../utils';
import FavoritesButton from '../favorite-button/favorite-button';

type FavoritesCardType = {
  offerData: OfferType;
}

function FavoritesCard({ offerData }: FavoritesCardType): JSX.Element {
  const ratingInStarsFormat: string = formatRating(offerData.rating);

  const previewImage = offerData.previewImage || offerData.images![0];

  return (
    <article className="favorites__card place-card">
      {offerData.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offerData.id}`}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt={offerData.title} />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offerData.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoritesButton offerData={offerData} type={'place-card'} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingInStarsFormat}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offerData.id}`}>{offerData.title}</Link>
        </h2>
        <p className="place-card__type">{offerData.type}</p>
      </div>
    </article>

  );
}

export default FavoritesCard;
