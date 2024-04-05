const AmiClient = require('asterisk-ami-client');
const { v4: uuidv4 } = require('uuid');
const config = require('./config/config.json');

let client = new AmiClient({
    reconnect: true,
    keepAlive: true,
    emitEventsByTypes: true,
    emitResponsesById: true
});


actionid = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


// Conexão 
client.connect(config.AST_USER, config.AST_PASS, { host: config.AST_URI, port: config.AST_PORT })
.then(() => { // any action after connection
    return client.action(
        {
            Action: 'Command',
            ActionID: actionid,
            Command: `agent show 1001`,
        }, true);
})
.then(response1 => { // response of first action
    console.log(response1);
})
// .then(() => { // any second action
//     return client.action(
//         {
//             Action: 'Command',
//             ActionID: actionid,
//             Command: `pjsip show aors`,
//         }, true);
// })
// .then(response2 => { // response of second action
//     console.log(response2)
// })
.catch(error => error)
.then(error => {
    client.disconnect(); // disconnect
    if(error instanceof Error){ throw error; }
});