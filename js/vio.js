
$("#speechButton").click( function()
   {
	  /* for (var i = 0, len = mic.length; i < len; i++) {
		   $("#micIMG").
			mic[i].style.fill = "green"
		}  */
	 startListening()
	 
   }
);


function startListening(event) {

	if (!('webkitSpeechRecognition' in window)) {
	  alert("Your browser does not support Speach Recognition.  Please try using Google Chrome 25 or later.")
	} else {
	
	  var final_transcript = '';
	 
	
	$('#feedback').html("Talk to me");

		
	//button.style.display = "none";

	  var recognition = new webkitSpeechRecognition();
	  recognition.lang = 'en-US';
	  recognition.start();
	  recognition.continuous = false;
	  recognition.interimResults = true;

	  recognition.onstart = function() {
		   $('#feedback').html("Capturing");
		    	alert ("here1");
	  }
	  recognition.onresult = function(event) {
		var interim_transcript = '';
		for (var i = event.resultIndex; i < event.results.length; ++i) {
		  if (event.results[i].isFinal) {
			final_transcript += event.results[i][0].transcript;
		  } else {
			interim_transcript += event.results[i][0].transcript;
		  }
		}
		
		
		if((final_transcript.includes("buy") || final_transcript.includes("purchase"))&& final_transcript.includes("tickets") ){
			
			alert("Great, let's buy some movie tickets!");
			
		}else{
			alert ("Sorry, I catch what you said, I heard: /n" + final_transcript+ "/n Try saying something like \"Buy tickets\"");
			recognition.start();
		}
		
		
		
		$("#feedback").text(final_transcript);
		//final_transcript = capitalize(final_transcript);
		//final_span.innerHTML = linebreak(final_transcript);
		//interim_span.innerHTML = linebreak(interim_transcript);
	  };
	
	  //recognition.onerror = function(event) { ... }
	  recognition.onend = function() { 
		
		if (final_transcript.includes("stop listening")){
			return true;
		}
			sleep(1000);
			//recognition.start();
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


