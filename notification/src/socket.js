import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

function subscribeToTimer(cb) {
    socket.on('notification', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 50000);
}
export { subscribeToTimer };
