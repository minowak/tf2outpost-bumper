// Writes
var dLog = "";
function docWrite(msg) {
	var d = new Date();
	// document.write('<link rel="stylesheet" type="text/css" href="style.css">');
	var tag = '[' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ']'
	var dMesg = tag + msg + '<br>';
	document.write(dMesg);
	dLog += dMesg;
	chrome.storage.local.set({'log': dLog}, function(v) {

	})
}

function getCookies(domain, name, callback) {
    chrome.cookies.getAll({"domain": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie[0]);
        }
    });
}

// Returns html of op trades page
function getTrades(callback) {
	var link = "http://www.tf2outpost.com/trades";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", link, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    };
    xhr.send(null);
}

function bumpTrade(link, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", link, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    };
    xhr.send(null);
}

// core function
function scanTrades() {
	docWrite('scanning trades');
	getCookies('tf2outpost.com', 'tf2op_userid', function(cookie) {
		if(cookie && cookie.value) {
			// already logged in
	    	var userid = cookie.value;
	    	// get trades
			getTrades(function(text) {
				var lines = text.split(/\r?\n/);
				var regexp = /href="\/trade\/[0-9]+\/bump/g;

				for(var i = 0 ; i < lines.length ; i++) {
					var line = lines[i];
				 	if(line.match(regexp)) {
				 		var bumpLink = line.substring(line.indexOf("href=") + 6, line.indexOf("bump") + 4);
				 		docWrite('found unbumped link');
				 		
				 		//bump trade
				 		bumpTrade("http://tf2outpost.com/" + bumpLink, function(text) {
				 			docWrite('trade bumped')
				 		});
				 	}
				}
			});
		} else {
			// login
			window.open('http://tf2outpost.com/login', '_newtab');
		}
	});
}

scanTrades();

// call this function every 30-35 minutes
window.setInterval(function() {
	scanTrades();
}, 1850000 + 300000 * Math.random());
