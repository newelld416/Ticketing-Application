
$("#speechButton").click( function() { startListening(); } );

$( "#searchInput" ).keydown(function() {
  	var e = window.event;
	if(e.keyCode == 13){ 
		addToSpeechLog($("#searchInput")[0].value, "Let me see if we have that movie.", false);
	}
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

				if(final_transcript.toLowerCase().includes("buy") || final_transcript.toLowerCase().includes("purchase")){
					//We should do something to allow the user to buy tickets here
					addToSpeechLog(final_transcript, "Awesome, lets get you some tickets", true);
					sleep(100);
				} else if (final_transcript.includes("finished") || final_transcript.includes("stop") || final_transcript.includes("cancel")){
					//Speech recognition is done at this point
					recognition.stop();
				} else if (final_transcript.includes("help")){
					//We should give the user a list of good commands they can use here
				} else {
					//The user said a command we did not plan for 
					addToSpeechLog(final_transcript, "Sorry, that is not a command I know", true);
					sleep(200);
				}
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
