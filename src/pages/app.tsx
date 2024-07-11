import MainScreen from '../pages/main';

type AppProps = {
  placeCardsCount: number;
  cities: string[];
  hasNavigation: boolean;
}

function App({ placeCardsCount, cities, hasNavigation }: AppProps): JSX.Element {
  return (
    <MainScreen placeCardsCount={placeCardsCount} cities={cities} hasNavigation={hasNavigation} />
  );
}

export default App;
