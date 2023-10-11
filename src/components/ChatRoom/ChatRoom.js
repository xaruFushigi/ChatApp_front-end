import React, { useContext, useState, useEffect } from "react";

// Context
import {Context} from "../ContextAPI/ContextAPI";

const ChatRoom = () => {
    const {isLoggedIn, chatRoom, socket } = useContext(Context);
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])
    
    // catch message input value
    const onChangeMessageInput = (event) => {
        setCurrentMessage(event.target.value)
    }

    const onClickSendMessage = async () => {
        if(currentMessage !== "") {
            const messageData = {
                room: chatRoom,
                author: isLoggedIn.username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData)
        }
    }

    const mapMessageList = () => {
      return( messageList.map((messageContent) => {
            return(<h2>{messageContent.message}</h2>);
        })
    )}

    useEffect(() => {
        socket.on("receive_message", (message_received) => {
            setMessageList((list) => [...list, message_received])
        })
    }, [socket])

    return(
        <div className="ChatRoom-container">
            <div className="ChatRoom-header">
                <p>Live Chat</p>
            </div>

            <div className="ChatRoom-body">
                {mapMessageList()}
            </div>

            <div className="ChatRoom-footer">
                <input type="text" placeholder="Heyy..." onChange={onChangeMessageInput} />
                <button onClick={onClickSendMessage}> &#9658; </button>
            </div>

        </div>
    )
}

export default ChatRoom