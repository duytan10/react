import { useState } from "react";
import "./App.scss";
import Count from "./components/advanced-react/performance/Count";
function App() {
    const [filters, setFilters] = useState("");
    return (
        <div>
            <input type="text" className="p-3 rounded border border-gray-300" onChange={(e) => setFilters(e.target.value)} />
            <Count></Count>
        </div>
    );
}

export default App;
