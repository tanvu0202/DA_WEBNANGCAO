import React, { useRef } from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const TawkMessenger = () => {
  const tawkMessengerRef = useRef();

  const onLoad = () => {
    console.log('Next Coffee Chat is ready! ☕');
  };

  return (
    <div className="tawk-messenger-wrapper">
      <TawkMessengerReact
        propertyId="6698b83332dca6db2cb18681"
        widgetId="1i328v2vo"
        ref={tawkMessengerRef}
        onLoad={onLoad}
      />
    </div>
  );
};

export default TawkMessenger;