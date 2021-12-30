const https = require('https');
const http = require('http');
const app = require("./app");
const fs = require("fs");
const config = require("config");
const morgan = require("morgan");


if(app.get('env')==='production'){
    const httpServer = http.createServer(app);
    const httpsServer = https.createServer({
        key: fs.readFileSync('../../etc/letsencrypt/live/metalcoding.eu/privkey.pem'),
        cert: fs.readFileSync('../../etc/letsencrypt/live/metalcoding.eu/fullchain.pem'),
    }, app);

    httpServer.listen(config.get('port'), () => {
        console.log(`HTTP Server running on port ${config.get('port')}`);
    });

    httpsServer.listen(443, () => {
        console.log('HTTPS Server running on port 443');
    });
}
else if(app.get('env')==='development'){
    app.use(morgan('tiny'));//kiírja a (defaultként)console-ra hogy milyen requestek történtek és hogy milyen státuszkóddal végződtek
    console.log('Morgan enabled...');
    app.listen(config.get('port'), ()=> console.log(`Listening in port ${config.get('port')}...`));
}