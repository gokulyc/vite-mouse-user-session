import { useState } from "react";
import IdleTimeOutHandler from "./components/IdleTimeOutHandler";
import "./App.css";

function App() {
  const [isActive, setIsActive] = useState(true);
  const [isLogout, setLogout] = useState(false);

  return (
    <>
      <div>
        <IdleTimeOutHandler
          onActive={() => {
            setIsActive(true);
          }}
          onIdle={() => {
            setIsActive(false);
          }}
          onLogout={() => {
            setLogout(true);
          }}
          timeOutInterval={6000}
        />
        <p>
          {isLogout
            ? "Please reload to Login"
            : isActive
            ? "Hello There"
            : "Interact to be active"}
        </p>
      </div>
    </>
  );
}

export default App;
