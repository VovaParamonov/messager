const express =require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = 3000;

io.on('connection', socket => {
    console.log('a user connected!');

    socket.emit('getId', socket.id);
});

server.listen(port, () => console.log(`server running on port: ${port}`));




// const io = require('socket.io')();
//
// io.on('connection', (client) => {
//     client.on('subscribeToTimer', (interval) => {
//         console.log('client is subscribing to timer with interval ', interval);
//         setInterval(() => {
//             client.emit('timer', new Date());
//         }, interval);
//     });
//
//     client.on('disconnect', ()=>console.log("disconnected"));
//
//     client.on('test', text=>console.log(text));
// });
//
// const port = 8000;
// io.listen(port);
// console.log('listening on port ', port);