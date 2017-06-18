/*------------------------------------*\
  #VARIABLES AND REQUIRED NODE MODULES
\*------------------------------------*/

//mysql node module:
var mysql = require('mysql');
var connection = '';
var connected = false;

//mysql node module:
var mysql = require('mysql');

//Declare database connection function:
function makeConnection() {

	//Create new connection object:
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		port : '8889',
		database : 'matthewdhuntley'
	});

	//Attempt to connect to matthewdhuntley.com database:
	connection.connect(function(err) {
		if (err) {
			console.log(err.code);
			console.log(err);
			console.error('error connecting: ' + err.stack);
			return;
		} 

		//Confirm connection:
		console.log('connected as id ' + connection.threadId);
	});

	//Handle Database connection errors:
	connection.on('error', function(err){
		console.log(err.code);
		if(err.code === 'PROTOCOL_CONNECTION_LOST')
			connection.destroy();
			connected = false;
		if(err.fatal)
			//console.log("Fatal error");
			connection.destroy();
			connected = false;
		if(!err.fatal)
			//console.log("Non-fatal error");
			connection.destroy();
			connected = false;
		  	return;
		if(err.code !== 'PROTOCOL_CONNECTION_LOST')
			throw err;
			connection.destroy();
	});

	return connection;
}

/*module.exports.connection = connection; 
module.exports.connected = makeConnection(); */
module.exports.makeConnection = makeConnection; 
