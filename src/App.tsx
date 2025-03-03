import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import ControlLayer from "./layouts/ControlLayer";
import AuthButton from "./components/Global/AuthButton";
import Widget from "./components/Global/Widget";

const client = new QueryClient();

const App = () => {

  return <QueryClientProvider client={client}>
    <ControlLayer>
      <AuthButton/>
      <Widget/>
    </ControlLayer>
  </QueryClientProvider>
}

export default App
