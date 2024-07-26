import OfferCard from '../offer-card/offer-card.tsx';
import { OfferCardType } from '../../types.ts';
import { useState } from 'react';

type OfferListProps = {
  offersData: OfferCardType[];
}

function OfferList({ offersData }: OfferListProps) {
  const [activeOffer, setActiveOffer] = useState('');

  // тут происходит иммитация деятельсти с состоянием activeOffer
  // потому что по заданию (пункт 5) он должен быть, но пока приложить его не к чему
  // так что я передаю его в компонент, если ничего не делать, то линтер ругается ;-;
  return (
    <div className="cities__places-list places__list tabs__content">

      {offersData.map((offer: OfferCardType) =>
        <OfferCard key={offer.id} offerData={offer} setActiveOffer={() => setActiveOffer(offer.id)} activeOffer={activeOffer === offer.id} />
      )}

    </div>
  );
}


export default OfferList;
