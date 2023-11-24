import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { IdleTimeOutModal } from "./idleTimeOutModal";

const IdleTimeOutHandler = (props) => {
  let timer = undefined;
  const events = ["click", "scroll", "load", "keydown"];
  const [showModal, setShowModal] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const eventHandler = (eventType) => {
    console.log(eventType);
    localStorage.setItem("lastInteractionTime", DateTime.now().toISO());
    if (timer) {
      props.onActive();
      startTimer();
    }
  };
  useEffect(() => {
    addEvents();

    return () => {
      removeEvents();
      clearTimeout(timer);
    };
  }, []);

  const startTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(
      () => {
        let lastInteractionTime = localStorage.getItem("lastInteractionTime");
        const diff = DateTime.now().diff(
          DateTime.fromISO(lastInteractionTime),
          "milliseconds"
        );
        let timeOutInterval = props.timeOutInterval
          ? props.timeOutInterval
          : 6000;

        if (diff < timeOutInterval) {
          startTimer();
          props.onActive();
        } else {
          props.onIdle();
          setShowModal(true);
        }
      },
      props.timeOutInterval ? props.timeOutInterval : 6000
    );
  };

  const addEvents = () => {
    events.forEach((eventName) => {
      window.addEventListener(eventName, eventHandler);
    });
    startTimer();
  };
  const removeEvents = () => {
    events.forEach((eventName) => {
      window.removeEventListener(eventName, eventHandler);
    });
  };

  const handleContinueSession = () => {
    setShowModal(false);
    setLogout(false);
  };
  const handleLogout = () => {
    removeEvents();
    clearTimeout(timer);
    setLogout(true);
    props.onLogout();
    setShowModal(false);
  };
  return (
    <div>
      <IdleTimeOutModal
        showModal={showModal}
        handleContinue={handleContinueSession}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default IdleTimeOutHandler;
