import $ from 'jquery'
import * as zmq from 'jszmq'


$(() => {
    const sock = new zmq.Sub();
    sock.connect('ws://localhost:3000');
    console.log('Worker trying to connect to port 3000');

    sock.subscribe('');
    sock.on('message', msg => {
        $('#video').attr('src', `data:image/png;base64, ${msg.toString()}`);
    });
})