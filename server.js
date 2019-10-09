// ./server.js

const app = require('./app/app');

// Definition du port
const port = process.env.APP_PORT;
app.listen(port);
console.log('Ecoute sur le port ' + port);

