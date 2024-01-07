import React, { useContext } from "react";

// CSS
import "./LogInToRoom_Desktop.css"
import "./LogInToRoom_Mobile_Portrait.css"
import "./LogInToRoom_Mobile_Landscape.css"

// Context
import {Context} from "../ContextAPI/ContextAPI";

const LogInToRoom = () => {
    const { onClickJoinRoom, onChangeUsername, onChangeChatRoom } = useContext(Context);
    const myStyle = {
        minWidth: '400px',
        width: '100%',
        minHeight: '500px',
      };
    return(
        <div className="LogInToRoom-container">
            <h3>Join a Chat</h3>
            <label>
                Username:
                <input type="text" placeholder="Username..." className="global__input" onChange={onChangeUsername} />
            </label>
            <label>
                Room No:
                <input type="text" placeholder="Room No" className="global__input" onChange={onChangeChatRoom} />
            </label>

            <button onClick={onClickJoinRoom} className="globall__button">Join Chat Room</button>

            <iframe src='https://webchat.botframework.com/embed/AzureSampleBot945?s=17MW9w_5IIw.-PWJbMvzvbCnD2T4tDVbpFQo64DzcUCrPfkkRcm6-WA'  style={myStyle}>
            </iframe>
            
        </div>
    )
}

export default LogInToRoom;
