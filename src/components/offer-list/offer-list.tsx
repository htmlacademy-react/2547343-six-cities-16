import OfferCard from '../offer-card/offer-card.tsx';
import { OfferCardType } from '../../types.ts';
import { Dispatch, SetStateAction } from 'react';

type OfferListProps = {
  offersData: OfferCardType[];
  setActiveOffer: Dispatch<SetStateAction<string>>;
}

function OfferList({ offersData, setActiveOffer }: OfferListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">

      {offersData.map((offer: OfferCardType) =>
        <OfferCard key={offer.id} offerData={offer} setActiveOffer={setActiveOffer} />
      )}

    </div>
  );
}


export default OfferList;
