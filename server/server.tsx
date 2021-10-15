import * as zmq from 'jszmq';
import path from "path";
import fs from "fs";

const port = process.env.PORT || 3000
const address = `ws://localhost:${port}`

const sock = new zmq.Pub();
console.log(`Binding to ${address}`)
sock.bind(address);
console.log(`Producer bound to ${address}`);


const images = path.join(__dirname, 'video_images')
const frames = fs.readdirSync(images)
    .sort((a, b) => a.localeCompare(b))
    .map(file => fs.readFileSync(path.join(images, file), { encoding: 'base64' }))

let idx = 0
setInterval(function(){
    sock.send(frames[idx].toString());
    idx = (idx + 1) % frames.length;
}, 1000 / 29);