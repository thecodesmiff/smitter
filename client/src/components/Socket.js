import { io } from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_SERVERURL}`, { autoConnect: false });

export default socket;