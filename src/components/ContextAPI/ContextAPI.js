import React, { useState, useEffect, createContext } from "react";
// socket
import io from "socket.io-client"   
const socket = io.connect("http://localhost:10000")
// Context
export const Context = createContext();

const ContextAPI = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState({
        username: "",
        id: 0,
        statusLoggedIn: false,
    }); // state to check/control logged in user
    const [chatRoom, setChatRoom] = useState("");
    const [showChatRoom, setShowChatRoom] = useState(false)

    // username input box
    const onChangeUsername = (event) => {
        setIsLoggedIn(prevState => ({...prevState, username: event.target.value}))
    }

    // chat room input box
    const onChangeChatRoom = (event) => {
        setChatRoom(event.target.value)
    }

    const onClickJoinRoom = () => {
        if(isLoggedIn.username !== "" && chatRoom !=="") {
            socket.emit("join_room", chatRoom)
        }
    }

    const contextValues = {isLoggedIn, setIsLoggedIn, chatRoom, setChatRoom,onClickJoinRoom, onChangeUsername, onChangeChatRoom, socket, showChatRoom, setShowChatRoom }

    useEffect(() => {}, [])
    return (
        <div>
          <Context.Provider value={contextValues}>
            {props.children}
          </Context.Provider>
        </div>
      );
}

export default ContextAPI;