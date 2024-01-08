import React, { useEffect, useState } from "react";
import { customAxios } from "@/api/custom-axios";
import socket from "@socket/socket";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";

const Test = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const user = useSelector(selectUser);
  useEffect(() => {
    socket.io.opts.query = {
      userId: user.id,
    };

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      <h1>Socket.io Test</h1>
      <p>Connected: {isConnected ? "true" : "false"}</p>
      <p>Foo Events: {fooEvents.length}</p>
      <button
        onClick={() => {
          socket.connect();
        }}
      >
        Connect socket
      </button>

      <button
        onClick={() => {
          socket.disconnect();
        }}
      >
        Disconnect
      </button>
      <button
        onClick={() => {
          socket.emit("message", "welcome");
        }}
      >
        Send message
      </button>
    </div>
  );
};

export default Test;
