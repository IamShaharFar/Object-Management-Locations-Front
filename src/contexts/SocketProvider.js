// src/contexts/SocketProvider.js

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import SocketContext from './SocketContext';

const SocketProvider = ({ userId, children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (userId) {
      const newSocket = io(`${process.env.REACT_APP_SERVER_URL}`, {
        query: {
          userId: userId,
        },
      });
      setSocket(newSocket);

      return () => {
        newSocket.close(); 
      };
    }
  }, [userId]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
