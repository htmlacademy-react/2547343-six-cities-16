import OfferCard from '../offer-card/offer-card.tsx';
import { OfferType } from '../../types.ts';
import { Dispatch, SetStateAction } from 'react';

type OfferListProps = {
  offersData: OfferType[];
  setActiveOffer?: Dispatch<SetStateAction<string>>;
}

function OfferList({ offersData, setActiveOffer }: OfferListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">

      {offersData.map((offer: OfferType) =>
        <OfferCard key={offer.id} offerData={offer} setActiveOffer={setActiveOffer} />
      )}

    </div>
  );
}


export default OfferList;
