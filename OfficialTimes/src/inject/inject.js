



//chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		//console.log("Hello. This message was sent from scripts/inject.js");
		//alert('working');
		
		const javascriptinject = document.createElement("script");
		javascriptinject.src = chrome.runtime.getURL("src/functions/officialtimes.js");
		document.body.appendChild(javascriptinject);


		
		


		
		
		// ----------------------------------------------------------

	}
	}, 10);
//});

