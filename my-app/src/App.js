import { useState } from "react";
import "./App.scss";
import ModalBase from "./components/modal/ModalBase";
import ModalAdvanced from "./components/modal/ModalAdvanced";
import TooltipAdvanced from "./components/tooltip/TooltipAdvanced";

function App() {
  const [openModalBase, setOpenModalBase] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex items-center justify-center h-screen p-5">
      <button
        className="p-5 text-center text-white bg-blue-400 rounded-lg"
        onClick={() => setOpenModalBase(true)}
      >
        Open modal base
      </button>
      <button
        className="p-5 ml-5 text-center text-white bg-blue-400 rounded-lg"
        onClick={() => setOpenModal(true)}
      >
        Open modal
      </button>
      <ModalBase
        visible={openModalBase}
        onClose={() => setOpenModalBase(false)}
        bodyClassName="relative z-10"
      >
        <div className="p-10 bg-white rounded-lg w-full max-w-[320px]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
          excepturi nam architecto nostrum quibusdam minus ab itaque vel
          blanditiis necessitatibus, quam mollitia exercitationem vitae eveniet
          non est quis qui laboriosam!
        </div>
      </ModalBase>
      <ModalAdvanced
        visible={openModal}
        onClose={() => setOpenModal(false)}
        // heading="Welcome Back!"
        bodyClassName="w-full max-w-[400px] bg-white p-10 rounded-lg"
      >
        <div className="flex flex-col gap-3 mb-5">
          <label htmlFor="email" className="text-sm cursor-pointer">
            Email address
          </label>
          <input
            id="email"
            type="email"
            className="w-full text-sm leading-normal bg-[#E7ECF3] rounded-lg p-4"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col gap-3 mb-5">
          <label htmlFor="password" className="text-sm cursor-pointer">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full text-sm leading-normal bg-[#E7ECF3] rounded-lg p-4"
            placeholder="Enter your password"
          />
        </div>
        <button className="w-full p-4 text-base text-white bg-[#316BFF] rounded-lg font-semibold">
          Sign In
        </button>
      </ModalAdvanced>
      <div className="ml-5">
        <TooltipAdvanced title="Hover me">This is tooltip</TooltipAdvanced>
      </div>
    </div>
  );
}

export default App;
