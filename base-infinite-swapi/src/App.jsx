import "./App.css";
import { InfinitePeople } from "./people/InfinitePeople";
import { InfiniteSpecies } from "./species/InfiniteSpecies";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";


//queryClient
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <h1>Infinite SWAPI</h1>
      <InfinitePeople />
      {/* <InfiniteSpecies /> */}
    </div>
    </QueryClientProvider>
  );
}

export default App;
