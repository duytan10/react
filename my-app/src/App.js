import "./App.scss";
import HeaderMain from "./components/HeaderMain";
import { AuthProvider } from "./contexts/authContext";

function App() {
  return (
    <>
    <AuthProvider>
      <HeaderMain></HeaderMain>
    </AuthProvider>
    </>
  );
}

export default App;
