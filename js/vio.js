
$("#speechButton").click( function()
   {
	startListening();
	 
   }
);

function startListening(event) {

	if (!('webkitSpeechRecognition' in window)) {
	  alert("Your browser does not support Speach Recognition.  Please try using Google Chrome 25 or later.")
	} else {
	
		var final_transcript = '';
		 
		$('#feedback').html("Talk to me");

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
			console.log("Capturing");
		}
		
		recognition.onresult = function(event) {
			var interim_transcript = '';
			for (var i = event.resultIndex; i < event.results.length; ++i) {
				if (event.results[i].isFinal) {
					final_transcript += event.results[i][0].transcript;
				}else {
					interim_transcript += event.results[i][0].transcript;
				}
			}
			
			if (!(final_transcript.includes("stop") || final_transcript.includes("cancel"))){
				if((final_transcript.includes("buy") || final_transcript.includes("purchase")) && final_transcript.includes("tickets") ){
					console.log("Great, let's buy some movie tickets!");
					sleep(100);
				}else{
					console.log("Sorry, I catch what you said, I heard: \n" + final_transcript+ "\n Try saying something like \"Buy tickets\"");
					sleep(100);
				}
				
			}else{
				recognition.stop();
				console.log("Stopping speech recognition.");
			}
			
		}
		
		recognition.onerror = function(event) {
			console.log("Error");
		}
		  
		recognition.onend = function() { 
			
			if (final_transcript.includes("stop") || final_transcript.includes("cancel")){
				console.log("Stopping speech recognition.");
				recognition.stop();
			}else{
				sleep(100);
				recognition.start();
				final_transcript = '';
			}
		}
	}
}


function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}
