var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );

app.set('views', require('path').join(__dirname, 'views'));
app.use(express.static(require('path').join(__dirname, 'public')));



function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

app.get('/', function(req, res) {
    var headers = req.headers, software = 'null';
    var language = (headers['accept-language']).split(',')[0] || 'null';
    (headers['user-agent']).replace(/^[^\(]*\((.*)\)[^\)]*$/, function(p, v){
        software = v || 'null';
    });
    var data = {
        ipaddress: getClientIp(req),
        language: language,
        software: software
    };
    res.send(data);
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


