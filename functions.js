function getCookies(domain, name, callback) {
    chrome.cookies.getAll({"domain": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie[0]);
        }
    });
}

function docWrite(msg) {
	document.write(msg);
}

// Main
getCookies('tf2outpost.com', 'tf2op_userid', function(cookie) {
	if(cookie && cookie.value) {
		// already logged in
    	var userid = cookie.value;
    	final var tradesUrl = "http://tf2outpost.com/trades";

    	docWrite(cookie.value);
	} else {
		// login
		window.open('http://tf2outpost.com/login', '_newtab');
	}
});