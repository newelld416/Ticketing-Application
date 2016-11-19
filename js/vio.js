
$("#speachButton").click( function()
   {
	 startListening()
   }
);


function startListening(event) {

	if (!('webkitSpeechRecognition' in window)) {
	  upgrade();
	} else {
		
	  var final_transcript = '';

	  var recognition = new webkitSpeechRecognition();
	  //recognition.lang = select_dialect.value;
	  recognition.start();
	  recognition.continuous = true;
	  recognition.interimResults = true;

	  /*recognition.onstart = function() { ... }*/
	  recognition.onresult = function(event) {
		var interim_transcript = '';

		for (var i = event.resultIndex; i < event.results.length; ++i) {
		  if (event.results[i].isFinal) {
			final_transcript += event.results[i][0].transcript;
		  } else {
			interim_transcript += event.results[i][0].transcript;
		  }
		}
		
		alert (final_transcript);
		//final_transcript = capitalize(final_transcript);
		//final_span.innerHTML = linebreak(final_transcript);
		//interim_span.innerHTML = linebreak(interim_transcript);
	  };
	/*
	  recognition.onerror = function(event) { ... }
	  recognition.onend = function() { ... }*/

	}
}


