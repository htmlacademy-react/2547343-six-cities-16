import OfferCardMemoized from '../offer-card/offer-card.tsx';
import { OfferType } from '../../types.ts';
import { Dispatch, SetStateAction } from 'react';

type NearOffersProps = {
  offersData: OfferType[];
  setActiveOffer?: Dispatch<SetStateAction<string>>;
}

function NearOffers({ offersData, setActiveOffer }: NearOffersProps) {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offersData.map((offer: OfferType) =>
          <OfferCardMemoized key={offer.id} offerData={offer} setActiveOffer={setActiveOffer} />
        )}
      </div>
    </section>
  );
}


export default NearOffers;
