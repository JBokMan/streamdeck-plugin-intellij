/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />
const myAction = new Action('com.jbokman.intellij.action');

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
	console.log('Stream Deck connected!');
});

myAction.onKeyUp(({ action, context, device, event, payload }) => {
	const socket = new WebSocket('ws://127.0.0.1:12345');

	socket.addEventListener('open', event => {
		console.log('Socket connection established');
		socket.send("Hello Server!")
	});

	socket.addEventListener('message', event => {
		console.log(`Received message: ${event.data}`);
	});

	socket.addEventListener('error', event => {
		console.error('Socket error:', event.error);
	});

	socket.addEventListener('close', event => {
		console.log('Socket connection closed');
	});
});

myAction.onDialRotate(({ action, context, device, event, payload }) => {
	console.log('Your dial code goes here!');
});
