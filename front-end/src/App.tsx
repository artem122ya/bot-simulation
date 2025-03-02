import BotsPage from "./pages/BotsPage/BotsPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BotsPage />
    </QueryClientProvider>
  )
}

export default App
