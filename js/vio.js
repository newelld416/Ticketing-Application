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
		$("#portfolioModal1").modal('show');
		$("#selectMyTickets").val("Harry Potter and the Order of the Phoenix");
		
	}else if(inputValue.toLowerCase().includes("finding") || inputValue.toLowerCase().includes("nemo")){
		addToSpeechLog(inputValue, "great - Finding Nemo.", false);
		$("#portfolioModal6").modal('show');
		$("#selectMyTickets").val("Finding Nemo");
		
	}else if(inputValue.toLowerCase().includes("captain") && inputValue.toLowerCase().includes("america")){
		addToSpeechLog(inputValue, "great - Captian America.", false);
		$("#portfolioModal3").modal('show');
		$("#selectMyTickets").val("Captain America");
		
	}else if(inputValue.toLowerCase().includes("django") && inputValue.toLowerCase().includes("unchained")){
		addToSpeechLog(inputValue, "great - django", false);
		$("#portfolioModal2").modal('show');
		$("#selectMyTickets").val("Django Unchained");
		
	}else if(inputValue.toLowerCase().includes("star") && inputValue.toLowerCase().includes("wars") || inputValue.toLowerCase().includes("force") && inputValue.toLowerCase().includes("awakens")){
		addToSpeechLog(inputValue, "great - Star Wars.", false);
		$("#portfolioModal5").modal('show');
		$("#selectMyTickets").val("Star Wars: The Force Awakens");
		
	}else if(inputValue.toLowerCase().includes("ghost") && inputValue.toLowerCase().includes("busters") || inputValue.toLowerCase().includes("ghostbusters")) {
		addToSpeechLog(inputValue, "great - Ghostbusters.", false);
		$("#portfolioModal4").modal('show');
		$("#selectMyTickets").val("Ghostbusters");
		
	}
	//actors
	else if(inputValue.toLowerCase().includes("david") && inputValue.toLowerCase().includes("yates")){
		addToSpeechLog(inputValue, "great - Harry Potter2.", false);
		$("#selectedMovie").text("portfolioModal1");
		$("#portfolioModal1").modal('show');
		
		$("#selectMyTickets").val("Harry Potter and the Order of the Phoenix");
		
	}else if(inputValue.toLowerCase().includes("stanton") && inputValue.toLowerCase().includes("andrew ")){
		addToSpeechLog(inputValue, "great - Finding Nemo.", false);
		$("#portfolioModal6").modal('show');
		$("#selectMyTickets").val("Finding Nemo");
		
	}else if(inputValue.toLowerCase().includes("anthony") && inputValue.toLowerCase().includes("russo")){
		addToSpeechLog(inputValue, "great - Captian America.", false);
		$("#portfolioModal3").modal('show');
		$("#selectMyTickets").val("Captain America");
		
	}else if(inputValue.toLowerCase().includes("quentin") && inputValue.toLowerCase().includes("tarantino")){
		addToSpeechLog(inputValue, "great - django", false);
		$("#portfolioModal2").modal('show');
		$("#selectMyTickets").val("Django Unchained");
		
	}else if(inputValue.toLowerCase().includes("jj") && inputValue.toLowerCase().includes("abrams")){
		addToSpeechLog(inputValue, "great - Star Wars.", false);
		$("#portfolioModal5").modal('show');
		$("#selectMyTickets").val("Star Wars: The Force Awakens");
		
	}else if(inputValue.toLowerCase().includes("paul") && inputValue.toLowerCase().includes("feig")) {
		addToSpeechLog(inputValue, "great - Ghostbusters.", false);
		$("#portfolioModal4").modal('show');
		$("#selectMyTickets").val("Ghostbusters");
	
	}
	
	//locations
	if(inputValue.toLowerCase().includes("celebration") && inputValue.toLowerCase().includes("north")){
		addToSpeechLog(inputValue, "great -Location North.", false);
		$("#purchaseTickets").modal('show');
		$("#selectMyTheater").val("Celebration Cinema North");
		
	}else if(inputValue.toLowerCase().includes("celebration") && inputValue.toLowerCase().includes("south")){
		//addToSpeechLog(inputValue, "great - Location South.", false);
		$("#purchaseTickets").modal('show');
		$("#selectMyTheater").val("Celebration Cinema South");
		
	}else if(inputValue.toLowerCase().includes("celebration") && inputValue.toLowerCase().includes("east")){
		addToSpeechLog(inputValue, "great - Location East.", false);
		$("#purchaseTickets").modal('show');
		$("#selectMyTheater").val("Celebration Cinema East");
		
	}else if(inputValue.toLowerCase().includes("celebration") && inputValue.toLowerCase().includes("west")){
		addToSpeechLog(inputValue, "great - Location West.", false);
			$("#purchaseTickets").modal('show');
		$("#selectMyTheater").val("Celebration Cinema West");
		
	}else if(inputValue.toLowerCase().includes("cinema") && inputValue.toLowerCase().includes("grand")){
		addToSpeechLog(inputValue, "great - Location Country.", false);
			$("#purchaseTickets").modal('show');
		$("#selectMyTheater").val("Grand Rapids Cinema 8");
		
	}else if(inputValue.toLowerCase().includes("amc") && inputValue.toLowerCase().includes("18")){
		addToSpeechLog(inputValue, "great - Location AMC.", false);
			$("#purchaseTickets").modal('show');
		$("#selectMyTheater").val("AMC Grand Rapids 18");
		
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
		return false;
	}
	return true;
	
}


