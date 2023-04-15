import "./App.scss";
import Dropdown from "./components/Dropdown";
import SidebarMenu from "./components/SidebarMenu";
import useClickOutSide from "./components/hooks/useClickOutSide";

function App() {
  const { show, setShow, nodeRef } = useClickOutSide();
  return (
    <div className="p-5">
      <button
        onClick={() => setShow(true)}
        className="inline-block m-3 p-3 rounded-lg text-white bg-green-400"
      >
        Show Menu
      </button>
      <SidebarMenu show={show} ref={nodeRef}></SidebarMenu>
      <Dropdown></Dropdown>
    </div>
  );
}

export default App;
