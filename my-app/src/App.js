import { useState } from "react";
import "./App.scss";
import Switch from "./components/switch/Switch";

function useToggle() {
    const [on, setOn] = useState(false);
    const toggle = () => setOn(!on);

    return { on, toggle };
}

function App() {
    const { on, toggle } = useToggle();
    return (
        <div>
            <Switch on={on} onClick={toggle}></Switch>
            <hr />
            <button aria-label="custom-button">{on ? "on" : "off"}</button>
        </div>
    );
}

export default App;
