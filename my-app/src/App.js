import "./App.scss";
import Dropdown from "./components/advanced-react/inversion-of-control/Dropdown";
const options = [
    { title: "Frontend Developer", onClick: () => {} },
    { title: "Backend Developer", onClick: () => {} },
    { title: "Fullstack Developer", onClick: () => {} },
];
function App() {
    return (
        <div>
            <Dropdown options={options} placeholder="Please select your job" inputPlaceHolder={'Search your jobs ...'}></Dropdown>
        </div>
    );
}

export default App;
