module.exports = function () {
	var colors = require('colors');

	// Create Timecode for Output
	var timecode = function () {
		var local 		= new Date(),
				hours 		= local.getHours(),
				mins 			= local.getMinutes(),
				secs 			= local.getSeconds(),
				str 			= hours + ':' + mins + ':' + secs;
				return '[' + str.gray + '] ';
	};
	

	var _debug = function (obj, label, status){
		var env = process.env.NODE_ENV || "development";
		var msg = "";
		if(label !== undefined){
			if(status !== undefined){
				msg = label + ' [' + status + ']';	

				// Success or Error Formatting
				if(status){
					msg = msg.green;
				} else {
					msg = msg.red;
				}
			} else {
				msg = label.white;
			}
		}

		// Output is NODE_ENV dependent
		if(process.env.NODE_ENV === "development"){
			console.log(timecode(), msg, obj);
		} else {
			// todo create server log
		}
	};

  // Publicly Available
  // ============================================================================================================
	return {
		debug : _debug, // usage .debug({port:3000}, "Connection", true);
	};
}();