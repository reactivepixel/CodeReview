var mongoose = require("mongoose"),
	outputs  = require('../lib/outputs.js');
		
// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/seed';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function(err, res) {
    if (err) {
        outputs.debug(uristring + ' - ' + err, "MongoDB Connection", false);
    } else {
        outputs.debug(uristring, "MongoDB Connection", true);
    }
});
