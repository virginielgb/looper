var audio_context;
var recorder;

function startUserMedia(stream) {
	var input = audio_context.createMediaStreamSource(stream);

	// Feedback!
	//input.connect(audio_context.destination);

	recorder = new Recorder(input, {
								numChannels: 1
							});
}

function startRecording(button) {
	recorder && recorder.record(button);
	$( button ).addClass( "hidden" );
	$( ".record" ).attr( "disabled" , true );
	$( button.nextElementSibling ).removeClass( "hidden" );

	var value = parseInt( $( "#timeRecording" ).val( ) );
	if( value < 0 || !value )
		value = 4;

	setTimeout( function( ) {
		$( button.nextElementSibling ).trigger("click");
	} , value*1000 );

	var p = $( button ).parent( );
	var pl = p.find( ".play" );
	var loop = p.find( ".loop" );
	var slider = p.find( ".slider" );
	var del = p.find( ".deleteAudio" );
	var name = p.find( ".trackName" );
	pl.addClass( "hidden" );
	loop.addClass( "hidden" );
	slider.addClass( "hidden" );
	del.addClass( "hidden" );
	name.addClass( "hidden" );
}

function stopRecording(button) {
	recorder && recorder.stop();
	$( button ).addClass( "hidden" );
	$( ".record" ).attr( "disabled" , false );
	$( button.previousElementSibling ).removeClass( "hidden" );

	// create WAV download link using audio data blob
	createDownloadLink();

	recorder.clear();
}

function createDownloadLink() {
	recorder & recorder.exportWAV(function(blob,elem) {
		var url = URL.createObjectURL(blob);
		var p = $( elem ).parent( );
		var au = p.find( "audio" );
		var pl = p.find( ".play" );
		var loop = p.find( ".loop" );
		var slider = p.find( ".slider" );
		var del = p.find( ".deleteAudio" );
		var name = p.find( ".trackName" );
		au.attr( "src" , url );
		pl.removeClass( "hidden" );
		loop.removeClass( "hidden" );
		slider.removeClass( "hidden" );
		del.removeClass( "hidden" );
		name.removeClass( "hidden" );
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
	} catch (e) {
		alert('No web audio support in this browser!');
	}

	navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
	});
};