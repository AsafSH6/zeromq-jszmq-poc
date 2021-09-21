"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jquery");
var jszmq_1 = require("jszmq");
$(function () {
    var sock = (0, jszmq_1.socket)('sub');
    sock.connect('tcp://127.0.0.1:3000');
    console.log('Worker connected to port 3000');
    sock.subscribe('');
    sock.on('message', function (msg) {
        console.log('work: %s', msg.toString());
    });
});
