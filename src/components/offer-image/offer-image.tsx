type OfferImageProps = {
  src: string;
  altName: string;
}

function OfferImage({ src, altName }: OfferImageProps) {
  return (
    <div className="offer__image-wrapper">
      <img className="offer__image" src={src} alt={altName} />
    </div>
  );
}

export default OfferImage;
