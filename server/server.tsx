import * as zmq from 'jszmq';
import path from "path";
import fs from "fs";

const sock = new zmq.Pub();
sock.bind('ws://localhost:3000');
console.log('Producer bound to port 3000');


const images = path.join(__dirname, 'video_images')
const frames = fs.readdirSync(images)
    .sort((a, b) => a.localeCompare(b))
    .map(file => fs.readFileSync(path.join(images, file), { encoding: 'base64' }))

let idx = 0
setInterval(function(){
    console.log('Sending frame', idx);

    sock.send(frames[idx].toString());
    idx = (idx + 1) % frames.length;
}, 1000 / 29);