import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import ControlLayer from "./layouts/ControlLayer";
import AuthButton from "./components/Global/AuthButton";

const client = new QueryClient();

const App = () => {

  return <QueryClientProvider client={client}>
    <ControlLayer>
      <AuthButton/>
    </ControlLayer>
  </QueryClientProvider>
}

export default App
