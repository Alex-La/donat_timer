import { useTimer } from "react-timer-hook";

const App: React.FC = () => {
  const { hours, minutes, seconds } = useTimer({
    expiryTimestamp: new Date(),
  });

  return (
    <div className="App">
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "orange", fontSize: 100 }}>
          {hours}:{minutes}:{seconds}
        </h1>
      </div>
    </div>
  );
};

export default App;
