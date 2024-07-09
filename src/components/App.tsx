import MainScreen from '../pages/main';

type AppProps = {
  placeCardsCount: number;
  cities: string[];
  isNavigation: boolean;
}

function App(props: AppProps): JSX.Element {
  return (
    <MainScreen placeCardsCount={props.placeCardsCount} cities={props.cities} isNavigation={props.isNavigation} />
  );
}

export default App;
