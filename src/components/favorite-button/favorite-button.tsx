import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleFavoriteAction } from '../../services/api-actions';
import { toggleFavoriteProperty } from '../../store/slices/favorite-slice';
import { toggleFavoriteInOffers } from '../../store/slices/offers-slice';
import { OfferType } from '../../types';
import cn from 'classnames';
import { toggleFavoriteInOffer } from '../../store/slices/offer-slice';
import { selectAutorizationStatus } from '../../store/slices/authorization-slice';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { useNavigate } from 'react-router-dom';

const buttonsSettings = {
  'place-card': {
    width: 18,
    height: 19
  },
  'offer': {
    width: 31,
    height: 33
  },
};

type FavoriteButtonType = {
  offerData: OfferType;
  type: keyof typeof buttonsSettings;
}


function FavoritesButton({ offerData, type }: FavoriteButtonType): JSX.Element {
  const [isFavorite, setFavorite] = useState(offerData.isFavorite);

  const authStatus = useAppSelector(selectAutorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToggleFavorite = () => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    } else {
      dispatch(toggleFavoriteAction({
        id: offerData.id,
        status: isFavorite ? 0 : 1,
      }));
      dispatch(toggleFavoriteProperty({ ...offerData, isFavorite: !offerData.isFavorite }));
      if (type === 'place-card') {
        dispatch(toggleFavoriteInOffers(offerData.id));
      } else {
        dispatch(toggleFavoriteInOffer());
      }
      setFavorite((prev) => !prev);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={cn(
        `${type}__bookmark-button`,
        'button',
        { 'place-card__bookmark-button--active': type === 'place-card' && isFavorite },
        { 'offer__bookmark-button--active': type === 'offer' && isFavorite }
      )}
      type="button"
    >
      <svg className={`${type}__bookmark-icon`} width={buttonsSettings[type].width} height={buttonsSettings[type].height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {!isFavorite ? 'To bookmarks' : 'In bookmarks'}
      </span>
    </button>
  );
}

export default FavoritesButton;

