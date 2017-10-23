// npm modules
var express 		= require('express'),
    app 			= express(),
    exphbs 			= require('express-handlebars'),
    outputs 		= require('./lib/outputs.js');

// View Config
// =============================================================================
var port = process.env.PORT || 3000;

// View Engine
// =============================================================================
app.engine('handlebars', exphbs({
    defaultLayout: 'default'
}));
app.set('view engine', 'handlebars');

// static file handling
app.use(express.static(__dirname + '/public'));

// ROUTES
// =============================================================================
require('./routes/master')(app);

// START THE SERVER
// =============================================================================
var server = app.listen(port);
outputs.debug(port, 'Server Status', true);