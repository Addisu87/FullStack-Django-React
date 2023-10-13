import { useState } from "react";

const useTimedMessage = () => {
  const [messages, setMessages] = useState([]);

  const showMessage = (message, type, duration) => {
    const id = Date.now(); // Use a unique ID for each message
    setMessages((prevMessages) => [...prevMessages, { id, message, type }]);
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== id)
      );
    }, duration);
  };

  return [messages, showMessage];
};

export default useTimedMessage;
