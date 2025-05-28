import { CookieStorage } from 'cookie-storage'
import { SERVER_URL } from '../../util/server_url';
import Cookies from 'js-cookie';
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const authentication = require('@feathersjs/authentication-client');
const io = require('socket.io-client');

// const cookieStorage = new CookieStorage({
//     secure: true,
//     sameSite: 'none',
// });

//const cookieStorage = new Cookies.get();

//const socket = io("https://dev.yuserapps.com", {
const socket = io(SERVER_URL, {
    transports: ['websocket'],
    upgrade: false,
    // extraHeaders: {
    //     'Authorization': Cookies.get('feathers-jwt')
    // }
});


// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();

client.configure(socketio(socket,{
    timeout: 40000
  }));
client.configure(authentication({
//    storage:typeof window === 'object'?cookieStorage:sessionStorage
}));

export default client
