import { useEffect } from 'react';

const LiveChat = () => {
    useEffect(() => {
        // Load the Rocket.Chat Livechat script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'http://localhost:3000/livechat/rocketchat-livechat.min.js?_=201903270000';
        document.body.appendChild(script);
    
        // Clean up the script when the component unmounts
        return () => {
          document.body.removeChild(script);
        };
      }, []);

  return null; // The component doesn't render anything, it just loads the script
};

export default LiveChat;

