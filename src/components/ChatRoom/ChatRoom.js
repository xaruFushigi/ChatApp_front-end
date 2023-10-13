import React, { useContext, useState, useEffect } from "react";

// Context
import { Context } from "../ContextAPI/ContextAPI";

const ChatRoom = () => {
  const { isLoggedIn, chatRoom, socket } = useContext(Context);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // catch message input value
  const onChangeMessageInput = (event) => {
    setCurrentMessage(event.target.value);
  }

  // send message to user
  const onClickSendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: chatRoom,
        author: isLoggedIn.username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData])
    }
    // cleare input box after sending message
    setCurrentMessage("")
  }

  // map messageList and display it in chat
  const mapMessageList = () => {
    return messageList.map((messageContent, index) => (
        <div key={index} className="message" id={isLoggedIn.username === messageContent.author ? "you" : "other"}>
            <div>
                <div className="message-content">
                    <p>
                        {messageContent.message}
                    </p>
                </div>

                <div className="message-meta">
                    <p>{messageContent.time}</p>
                    <p>{messageContent.author}</p>
                </div>
            </div>

        </div>
      
    ));
  }

  useEffect(() => {
    // Set up the event listener for receiving messages
    const receiveMessageList = (message_received) => {
      setMessageList((list) => [...list, message_received]);
    };

    socket.on("receive_message", receiveMessageList);

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("receive_message", receiveMessageList);
    };
  }, [socket]);

  return (
    <div className="ChatRoom-container">
      <div className="ChatRoom-header">
        <p>Live Chat</p>
      </div>

      <div className="ChatRoom-body">{mapMessageList()}</div>

      <div className="ChatRoom-footer">
        <input type="text" placeholder="Heyy..." onChange={onChangeMessageInput} value={currentMessage} />
        <button onClick={onClickSendMessage}> &#9658; </button>
      </div>
    </div>
  );
}

export default ChatRoom;
