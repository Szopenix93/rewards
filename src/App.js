import Header from "./components/header/Header";
import RewardsTable from "./components/rewards/RewardsTable";
import ErrorBoundary from "./components/error/ErrorBoundary";
import ErrorFallback from "./components/error/ErrorFallback";

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback/>}>
      <Header/>
      <RewardsTable/>
    </ErrorBoundary>
  );
}

export default App;
