import BaseRoute from "./navigation/stack-navigation/BaseRoute";
import ContextProvider from "./context/ContextProvider";
import { getAccessFromRefresh } from "./src/components/RefreshToken"; 


const App = () => {

  const token = getAccessFromRefresh()
  console.log(token)

  return (
    <ContextProvider>
      <BaseRoute />
    </ContextProvider>
  );
};


export default App;


