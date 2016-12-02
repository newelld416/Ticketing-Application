$("#speechButton").click( function() { startListening(); } );

$("#searchButton").click( function() {
	var inputValue = $("#searchInput")[0].value
	addToSpeechLog(inputValue, "Let me see if we have that movie.", false);
	processSearch(); } );

	
$( "#searchInput" ).keydown(function() {
  	var e = window.event;
	if(e.keyCode == 13){ 
	var inputValue = $("#searchInput")[0].value
		addToSpeechLog(inputValue, "Let me see if we have that movie.", false);
		processSearch(inputValue);
	}
});

// Remove selections when user closes modal windows
$('#selectLocation').on('hidden.bs.modal', function (e) {
		$("#selectedTheater").text("none");
});


$('.movieSelection').on('hidden.bs.modal', function (e) {
	 $("#selectedMovie").text("none");
});

function startListening(event) {

	if (!('webkitSpeechRecognition' in window)) {
	  alert("Your browser does not support Speach Recognition.  Please try using Google Chrome 25 or later.")
	} else {
	
		var final_transcript = '';

		var recognition = new webkitSpeechRecognition();
		recognition.lang = 'en-US';
		recognition.start();
		recognition.continuous = false;
		recognition.interimResults = true;
		//recognition.grammars = speechRecognitionList;
		//var speechRecognitionList = new SpeechGrammarList();
		//var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
		//speechRecognitionList.addFromString(grammar, 1);


		recognition.onstart = function() {
			// var text = $("#speechOutput").text();
			// if (!text.includes("What would you like to do?")) {
			// 	addToSpeechLog("", "What would you like to do?");
			// }
		}
		
		recognition.onresult = function(event) {
			//Want to make sure the system has some confidence in the result before we take action
			if (event.results[0][0].confidence >= .6) {
				var interim_transcript = '';
				for (var i = event.resultIndex; i < event.results.length; ++i) {
					if (event.results[i].isFinal) {
						final_transcript += event.results[i][0].transcript;
					}else {
						interim_transcript += event.results[i][0].transcript;
					}
				}

				if (final_transcript.includes("finished") || final_transcript.includes("stop") || final_transcript.includes("cancel")){
					//Speech recognition is done at this point
					recognition.stop();
				} else if (final_transcript.includes("help")){
					//We should give the user a list of good commands they can use here
				} else if (processSearch(final_transcript)){
					
				} else {
					//The user said a command we did not plan for 
					addToSpeechLog(final_transcript, "Sorry, that is not a command I know", true);
					sleep(200);
				}
			}else{
				//don't do an alert, or it will popup constantly...
				//alert("I was unable to understand what you said, please try again.");
			}
		}
		
		recognition.onerror = function(event) {
			//An error has occured
			addToSpeechLog("Error");
		}
		  
		recognition.onend = function() {
			if (final_transcript.includes("finished") || final_transcript.includes("stop") || final_transcript.includes("cancel")) {
				addToSpeechLog(final_transcript, "Stopping audio recognition", true);
				recognition.stop();
			} else {
				sleep(100);
				recognition.start();
				final_transcript = '';
			}
		}
	}
}

function addToSpeechLog(userMessage, computerMessage, isSpeech) {
	var element = $("#speechOutput");
	if (isSpeech){
		element.html("You said: " + userMessage);
	} else {
		element.html("You searched for: " + userMessage);
	}
	
	element.html(element.html() + "<br>" + computerMessage);
}


function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}




function processSearch(inputValue ) {
	//movies
	if(inputValue.toLowerCase().includes("harry") && inputValue.toLowerCase().includes("potter")){
		addToSpeechLog(inputValue, "great - Harry Potter2.", false);
		$("#selectedMovie").text("portfolioModal1");
		$("#portfolioModal1").modal('show');
		
		$("#selectMyTickets").val("Harry Potter and the Order of the Phoenix");
		return true;
	}else if(inputValue.toLowerCase().includes("finding") || inputValue.toLowerCase().includes("nemo")){
		addToSpeechLog(inputValue, "great - Finding Nemo.", false);
		$("#selectedMovie").text("portfolioModal6");
		$("#portfolioModal6").modal('show');
		$("#selectMyTickets").val("Finding Nemo");
		return true;
	}else if(inputValue.toLowerCase().includes("captain") && inputValue.toLowerCase().includes("america")){
		addToSpeechLog(inputValue, "great - Captian America.", false);
		$("#selectedMovie").text("portfolioModal3");
		$("#portfolioModal3").modal('show');
		$("#selectMyTickets").val("Captain America");
		return true;
	}else if(inputValue.toLowerCase().includes("django") && inputValue.toLowerCase().includes("unchained")){
		addToSpeechLog(inputValue, "great - django", false);
		$("#selectedMovie").text("portfolioModal2");
		$("#portfolioModal2").modal('show');
		$("#selectMyTickets").val("Django Unchained");
		return true;
	}else if(inputValue.toLowerCase().includes("star") && inputValue.toLowerCase().includes("wars") || inputValue.toLowerCase().includes("force") && inputValue.toLowerCase().includes("awakens")){
		addToSpeechLog(inputValue, "great - Star Wars.", false);
		$("#selectedMovie").text("portfolioModal5");
		$("#portfolioModal5").modal('show');
		$("#selectMyTickets").val("Star Wars: The Force Awakens");
		return true;
	}else if(inputValue.toLowerCase().includes("ghost") && inputValue.toLowerCase().includes("busters") || inputValue.toLowerCase().includes("ghostbusters")) {
		addToSpeechLog(inputValue, "great - Ghostbusters.", false);
		$("#selectedMovie").text("portfolioModal4");
		$("#portfolioModal4").modal('show');
		$("#selectMyTickets").val("Ghostbusters");
		return true;
	}
	//locations
	else if(inputValue.toLowerCase().includes("celebration") && inputValue.toLowerCase().includes("north")){
		addToSpeechLog(inputValue, "great -Location North.", false);
		$("#selectedTheater").text("cbn");
		return true;
	}else if(inputValue.toLowerCase().includes("celebration") && inputValue.toLowerCase().includes("south")){
		addToSpeechLog(inputValue, "great - Location South.", false);
		$("#selectedTheater").text("cbs");
		return true;
	}else if(inputValue.toLowerCase().includes("celebration") && inputValue.toLowerCase().includes("east")){
		addToSpeechLog(inputValue, "great - Location East.", false);
		$("#selectedTheater").text("cbe");
		return true;
	}else if(inputValue.toLowerCase().includes("celebration") && inputValue.toLowerCase().includes("west")){
		addToSpeechLog(inputValue, "great - Location West.", false);
		$("#selectedTheater").text("cbw");
		return true;
	}else if(inputValue.toLowerCase().includes("cinema") && inputValue.toLowerCase().includes("country")){
		addToSpeechLog(inputValue, "great - Location Country.", false);
		$("#selectedTheater").text("cc");
		return true;
	}else if(inputValue.toLowerCase().includes("acm") && inputValue.toLowerCase().includes("18")){
		addToSpeechLog(inputValue, "great - Location ACM.", false);
		$("#selectedTheater").text("acmgr18");
		return true;
	}
	//actors
	else if(inputValue.toLowerCase().includes("david") && inputValue.toLowerCase().includes("yates")){
		addToSpeechLog(inputValue, "great - Harry Potter.", false);
		return true;
	}else if(inputValue.toLowerCase().includes("anthony") && inputValue.toLowerCase().includes("russo")){
		addToSpeechLog(inputValue, "great - Harry Potter.", false);
		return true;
	}else if(inputValue.toLowerCase().includes("harry") && inputValue.toLowerCase().includes("potter")){
		addToSpeechLog(inputValue, "great - Harry Potter.", false);
		return true;
	}else if(inputValue.toLowerCase().includes("harry") && inputValue.toLowerCase().includes("potter")){
		addToSpeechLog(inputValue, "great - Harry Potter.", false);
		return true;
	}else if(inputValue.toLowerCase().includes("harry") && inputValue.toLowerCase().includes("potter")){
		addToSpeechLog(inputValue, "great - Harry Potter.", false);
		return true;
	
	}
	//select a theater page
	else if (inputValue.toLowerCase().includes("theater")){
		addToSpeechLog(inputValue, "Showing Selct a theater page.", false);
			$("#selectLocation").modal('show');
	}
	else if (( inputValue.toLowerCase().includes("buy") || (inputValue.toLowerCase().includes("purchase")  )&& inputValue.toLowerCase().includes("tickets") )){
		addToSpeechLog(inputValue, "Showing Selct a theater page.", false);
			$("#purchaseTickets").modal('show');
	}
	//error
	else{
		addToSpeechLog(inputValue, "Unable to process your request.", false);
	}
	
}


