
$("#speechButton").click( function() { startListening(); } );

$( "#searchInput" ).keydown(function() {
  	var e = window.event;
	if(e.keyCode == 13){ 
		alert('5'); 
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
			var text = $("#speechOutput").text();
			if (!text.includes("What would you like to do?")) {
				addToSpeechLog("What would you like to do?");
			}
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
					addToSpeechLog("You said " + final_transcript);
					sleep(100);
				} else if (final_transcript.includes("finished") || final_transcript.includes("stop") || final_transcript.includes("cancel")){
					recognition.stop();
				} else {
					addToSpeechLog("Sorry, that is not a command I know, I heard: " + final_transcript);
					addToSpeechLog("Try saying something like but tickets.");
					sleep(200);
				}
			}
		}
		
		recognition.onerror = function(event) {
			addToSpeechLog("Error");
		}
		  
		recognition.onend = function() {
			if (final_transcript.includes("finished") || final_transcript.includes("stop") || final_transcript.includes("cancel")) {
				addToSpeechLog("Stopping speech recognition.");
				recognition.stop();
			} else {
				sleep(100);
				recognition.start();
				final_transcript = '';
			}
		}
	}
}

function addToSpeechLog(message) {
	var text = $("#speechOutput").html();
	$("#speechOutput").html(text + "<br>" + message);
}


function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}
