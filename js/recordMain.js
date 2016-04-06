function __log(e, data) {
	// log.innerHTML += "\n" + e + " " + (data || '');
}

var audio_context;
var recorder;

function startUserMedia(stream) {
	var input = audio_context.createMediaStreamSource(stream);
	__log('Media stream created.' );
	__log("input sample rate " +input.context.sampleRate);

	// Feedback!
	//input.connect(audio_context.destination);
	__log('Input connected to audio context destination.');

	recorder = new Recorder(input, {
								numChannels: 1
							});
	__log('Recorder initialised.');
}

function startRecording(button) {
	recorder && recorder.record(button);
	// button.disabled = true;
	$( button ).addClass( "hidden" );
	// button.nextElementSibling.disabled = false;
	$( button.nextElementSibling ).removeClass( "hidden" );
	__log('Recording...');
	var p = $( button ).parent( );
	var pl = p.find( ".play" );
	var loop = p.find( ".loop" );
	pl.addClass( "hidden" )
	loop.addClass( "hidden" )
}

function stopRecording(button) {
	recorder && recorder.stop();
	// button.disabled = true;
	$( button ).addClass( "hidden" );
	// button.previousElementSibling.disabled = false;
	$( button.previousElementSibling ).removeClass( "hidden" );
	__log('Stopped recording.');

	// create WAV download link using audio data blob
	createDownloadLink();

	recorder.clear();
}

function createDownloadLink() {
	recorder && recorder.exportWAV(function(blob,elem) {
		var url = URL.createObjectURL(blob);
		var p = $( elem ).parent( );
		var au = p.find( "audio" );
		var pl = p.find( ".play" );
		var loop = p.find( ".loop" );
		au.attr( "src" , url );
		pl.removeClass( "hidden" );
		loop.removeClass( "hidden" );
		clickPlay( pl );
		clickLoop( loop );
	} );
}

function clickPlay( play ) {
	// audio.onended = play.( play , audio );
	play.click( function( ) {

		var audio = play.parent( ).find( "audio" )[ 0 ];
		audio.onended = function() {
		    // console.log('music stopped');
			play.text( "Play" );
		}
		if (audio.paused == false) {
		      audio.pause();
		      audio.currentTime = 0;
		      // console.log('music paused');
			  play.text( "Play" );
		  } else {
		      audio.play();
		      // console.log('music playing');
			  play.text( "Stop" );
		  }
	} );
}

function clickLoop( loop ) {

	loop.click( function( ) {
		var audio = loop.parent( ).find( "audio" )[ 0 ];

		var play = loop.parent( ).find( ".play" );
		audio.onended = function() {
			loop.trigger( "click" );
		}
		audio.play();
		// console.log('music playing');
		play.text( "Stop" );
	} );
}
window.onload = function init() {
	try {
		// webkit shim
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		navigator.getUserMedia = ( navigator.getUserMedia ||
										 navigator.webkitGetUserMedia ||
										 navigator.mozGetUserMedia ||
										 navigator.msGetUserMedia);
		window.URL = window.URL || window.webkitURL;

		audio_context = new AudioContext;
		__log('Audio context set up.');
		__log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
	} catch (e) {
		alert('No web audio support in this browser!');
	}

	navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
		__log('No live audio input: ' + e);
	});
};