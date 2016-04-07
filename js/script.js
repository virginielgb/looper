var isLocal = ( document.location.hostname === "localhost" || document.location.hostname === "127.0.0.1" );
if( document.location.protocol === "https:" || isLocal )
    $( ".alert" ).addClass( "hidden" );

$( "#whatever" ).click( function( ) {
    $( ".record" ).toggleClass( "btn-default btn-warning" );
} );
var changeVolume = function( ) {
    var val = parseInt( $( this ).siblings( "input.volume" ).attr( "data-value" ) );
    var au = $( this ).siblings( "audio" )[ 0 ];
    au.volume = val / 100;
} 
$( '.volume' ).slider( { reversed : true } );
$( '.slider' ).addClass( "hidden" );
$( '.slider' ).on( 'change' ,  changeVolume );

$( "#loopAll" ).click( function( ) {;
    if( $( this ).hasClass( "loopAll" ) ) {
        $( ".loop" ).each( function( ) {
            if( $( this ).hasClass( "btn-default" ) )
                $( this ).trigger( "click" );
        } );
        $( this ).text( "Unloop all");
    }
    else {
        $( ".loop" ).each( function( ) {
            if( ! $( this ).hasClass( "btn-default" ) )
                $( this ).trigger( "click" );
        } );
        $( this ).text( "Loop all");
    }
    $( this ).toggleClass( "loopAll unloopAll" );
} );

$( "#playAll" ).click( function( ) {
    if( $( this ).hasClass( "playAll" ) ) {
        $( ".play" ).each( function( ) {
            if( $( this ).text( ) === "Play" )
                $( this ).trigger( "click" );
        } );
        $( this ).text( "Stop all");
    }
    else {
        $( ".play" ).each( function( ) {
            if( $( this ).text( ) === "Stop" )
                $( this ).trigger( "click" );
        } );
        $( this ).text( "Play all");
    }
    $( this ).toggleClass( "playAll stopAll" );
} );

function bindButtons( row ) {
    if( !row ) row = $( $( ".row" )[ 0 ] );

    row.find( ".play" ).click( function( ) {
        var play = $( this );
        var audio = play.siblings( "audio" )[ 0 ];
        audio.onended = function() {
            play.text( "Play" );

              var allStop = true;
              $( ".play" ).each( function( ) {
                if( $( this ).text( ) === "Stop" ) {
                    allStop = false;
                }
              } );
              // console.log( allStop );

        }
        if (audio.paused == false || play.text( ) === "Stop" ) {
              audio.pause();
              audio.currentTime = 0;
              play.text( "Play" );
          } else {
              audio.play();
              audio.currentTime = 0;
              play.text( "Stop" );
          }
    } );

    row.find( ".loop" ).click( function( ) {
        var loop = $( this );
        var audio = loop.siblings( "audio" )[ 0 ];
        loop.toggleClass( "btn-default" );
        loop.toggleClass( "btn-info" );
        audio.loop = !audio.loop;
    } );

    row.find( ".deleteAudio" ).click( function( ) {
        var del = $( this );
        var audio = del.siblings( "audio" )[ 0 ];
        audio.src="";
        var pl = del.siblings( ".play" );
        var loop = del.siblings( ".loop" );
        var vol = del.siblings( ".slider" );
        var name = del.siblings( ".trackName" );
        var dl = del.siblings( "a" );
        pl.addClass( "hidden" );
        pl.text( "Play" );
        loop.addClass( "hidden" );
        vol.addClass( "hidden" );
        del.addClass( "hidden" );
        name.addClass( "hidden" );
        dl.addClass( "hidden" );
        dl.attr( "href" , "#" );
    } );
}


$( "#export" ).click( function( ){
    $( ".dlAudio" ).addClass( "hidden" );
    $( ".play" ).each( function( ) {
        if(! $( this ).hasClass( "hidden" ) )
            $( this ).siblings( "a" ).removeClass( "hidden" );
    } );
} );
bindButtons( );


var div = $( $( ".row" )[ 0 ] );
var html = "<div class='row'> " + div.html( ) + "</div>";
$( "#addTracks" ).click( function( ) {
    var rows = $( ".row" ).length;
    $( "#main" ).append( html );
    bindButtons( $( $( ".row" )[ rows ] ) );
} );