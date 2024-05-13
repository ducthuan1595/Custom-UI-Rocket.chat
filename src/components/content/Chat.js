import {useEffect, useRef} from 'react';
import { StoreContext } from '../../store';
import LiveChat from '../LiveChat';

function Chat() {

    const {currentUser} = StoreContext();
    const iframe = useRef();

    useEffect(() => {
        
        iframe.onload = function() {
        // Get the authentication token
        const authToken = currentUser?.authToken;

        iframe.contentWindow.postMessage({
            externalCommand: 'login-with-token',
            token: authToken
            }, '*');
        };
    }, [currentUser])

    return (
        <div>
            {/* <iframe 
                ref={iframe}
                src="http://localhost:3000/group/Reactjs?layout=embedded"
                width="800px"
                height="500px"
                frameborder="1"
                allow="camera;microphone"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms">
            </iframe> */}

            <LiveChat />
        </div>
    );
}

export default Chat;