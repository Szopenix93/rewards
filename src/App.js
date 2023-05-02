import Header from "./components/header/Header";
import RewardsTable from "./components/rewards/RewardsTable";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import ErrorFallback from "./components/ui/ErrorFallback";

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback/>}>
      <Header/>
      <RewardsTable/>
    </ErrorBoundary>
  );
}

export default App;
