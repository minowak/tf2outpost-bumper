chrome.storage.local.get('log', function(t) {
		document.write('<link rel="stylesheet" type="text/css" href="style.css">');
    	document.write(t['log']);
    });