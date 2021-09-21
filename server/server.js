"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// producer.js
var zmq = __importStar(require("jszmq"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var sock = new zmq.Pub();
sock.bind('ws://localhost:3000');
console.log('Producer bound to port 3000');
var images = path_1.default.join(__dirname, 'video_images');
var frames = fs_1.default.readdirSync(images)
    .sort(function (a, b) { return a.localeCompare(b); })
    .map(function (file) { return fs_1.default.readFileSync(path_1.default.join(images, file), { encoding: 'base64' }); });
var idx = 0;
setInterval(function () {
    console.log('sending frame', idx);
    sock.send(frames[idx].toString());
    idx = (idx + 1) % frames.length;
}, 1000 / 29);
