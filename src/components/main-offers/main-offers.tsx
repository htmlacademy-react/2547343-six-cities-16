import OfferCard from '../offer-card/offer-card.tsx';
import { OfferType } from '../../types.ts';
import { Dispatch, SetStateAction } from 'react';
import SortingBlock from '../sorting-block/sorting-block.tsx';

type MainOffersProps = {
  offersData: OfferType[];
  setActiveOffer?: Dispatch<SetStateAction<string>>;
  activeCity: string;
}

function MainOffers({ offersData, setActiveOffer, activeCity }: MainOffersProps) {
  return (
    < section className="cities__places places" >
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offersData.length} places to stay in {activeCity}</b>
      <SortingBlock />

      <div className="cities__places-list places__list tabs__content">

        {offersData.map((offer: OfferType) =>
          <OfferCard key={offer.id} offerData={offer} setActiveOffer={setActiveOffer} />
        )}

      </div>

    </section >

  );
}

export default MainOffers;
