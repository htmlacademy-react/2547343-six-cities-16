import OfferCard from '../offer-card/offer-card.tsx';
import { OfferCardType } from '../../types.ts';
import { useState } from 'react';

type OfferListProps = {
  offersData: OfferCardType[];
}

function OfferList({ offersData }: OfferListProps) {
  // eslint-disable-next-line
  const [activeOffer, setActiveOffer] = useState('');

  return (
    <div className="cities__places-list places__list tabs__content">

      {offersData.map((offer: OfferCardType) =>
        <OfferCard key={offer.id} offerData={offer} setActiveOffer={() => setActiveOffer(offer.id)} />
      )}

    </div>
  );
}

export default OfferList;
