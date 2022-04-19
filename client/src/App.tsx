import { useTimer } from "react-timer-hook";
import Preloader from "~components/loaders/Preloader";

const App: React.FC = () => {
  const { hours, minutes, seconds } = useTimer({
    expiryTimestamp: new Date(),
  });

  return (
    <div className="App">
      <Preloader />
    </div>
  );
};

export default App;
