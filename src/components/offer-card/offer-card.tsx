import { memo } from 'react';
import { Link } from 'react-router-dom';
import { OfferType } from '../../types';
import FavoritesButton from '../favorite-button/favorite-button';
import { formatRating } from '../../utils';


type OfferCardProps = {
  offerData: OfferType;
  setActiveOffer?: (id: string) => void;
}

function OfferCard({ offerData, setActiveOffer }: OfferCardProps): JSX.Element {
  const ratingInStarsFormat: string = formatRating(offerData.rating);

  const handleOfferHover = () => {
    if (!offerData.id) {
      return;
    }
    setActiveOffer?.(offerData.id);
  };
  const handleOfferLeave = () => {
    if (!offerData.id) {
      return;
    }
    setActiveOffer?.('');
  };

  return (
    <article className='cities__card place-card' onMouseEnter={handleOfferHover} onMouseLeave={handleOfferLeave}>
      {offerData.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offerData.id}`}>
          <img className="place-card__image" src={offerData.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
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
    </article >
  );
}

const OfferCardMemoized = memo(OfferCard, (prevProps, nextProps) => prevProps.offerData === nextProps.offerData);

export default OfferCardMemoized;
