import "./App.scss";
import { Dropdown } from "./components/advanced-react/inversion-of-control";
const options = [
  { title: "Frontend Developer", onClick: () => {} },
  { title: "Backend Developer", onClick: () => {} },
  { title: "Fullstack Developer", onClick: () => {} },
];
function App() {
  return (
    <div>
      <Dropdown placeholder="Please select your job"></Dropdown>
    </div>
  );
}

export default App;
