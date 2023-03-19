/// <reference path="../../../libs/js/property-inspector.js" />
/// <reference path="../../../libs/js/utils.js" />

$PI.onConnected((jsn) => {
    const form = document.querySelector('#property-inspector');
    const {actionInfo} = jsn;
    const {payload} = actionInfo;
    const {settings} = payload;

    Utils.setFormValue(settings, form);

    form.addEventListener(
        'input',
        Utils.debounce(150, () => {
            const value = Utils.getFormValue(form);
            $PI.setSettings(value);
        })
    );
});

$PI.onDidReceiveGlobalSettings(({payload}) => {
    console.log('onDidReceiveGlobalSettings', payload);
})

/**
 * Provide window level functions to use in the external window
 * (this can be removed if the external window is not used)
 */
window.sendToInspector = (data) => {
    console.log(data);
};

document.querySelector('#open-external').addEventListener('click', () => {
    const username = '';
    const password = document.getElementById("token").value;
    let connected = false

    const socket = new WebSocket(`ws://${username}:${password}@127.0.0.1:12345/testConnection`);

    socket.addEventListener('open', _ => {
        console.log('Socket connection established');
        connected = true
        socket.send("ping")
    });

    socket.addEventListener('message', event => {
        console.log(`Received message: ${event.data}`);
        if (event.data === "pong") {
            document.getElementById("red-x-icon").style.visibility = "hidden";
            document.getElementById("green-check-icon").style.visibility = "visible";
            document.getElementById("connection-status-message").innerText = "Successfully connected"
        }
    });

    socket.addEventListener('error', event => {
        console.error('Socket error:', event.error);
        document.getElementById("green-check-icon").style.visibility = "hidden";
        document.getElementById("red-x-icon").style.visibility = "visible";
    });

    socket.addEventListener('close', _ => {
        console.log('Socket connection closed');
        document.getElementById("green-check-icon").style.visibility = "hidden";
        document.getElementById("red-x-icon").style.visibility = "visible";
        if (connected) {
            document.getElementById("connection-status-message").innerText = `Lost connection to the IntelliJ Stream-Deck-Connector plugin`
        } else {
            document.getElementById("connection-status-message").innerText = `Can not find IntelliJ Stream-Deck-Connector plugin or the Token is invalid`
        }
        connected = false
    })
});
