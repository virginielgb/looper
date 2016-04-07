# Looper v2.2 #

This audio looper is made in javaScript and uses HTML5 audio APIs

### Getting started ###
Clone this repository or download the source code, upload it on a server ( it won't work if you just open the .html file ), and you're on!

#####[DEMO: Try it here](http://virginielgb.com/looper/)#####

### What you can do ###
* `Record` a track
* `Add tracks`, by pressing the 'Add 4 tracks' button
* Set the next recordings' `duration`, by entering a value in the top input field
* Select the tracks you want to `loop`, or `loop all`
* Select the tracks you want to `play`/`stop`, or play them all at once ( `play all` and `stop all` )
* Change the `volume` of each track indepedently
* `Delete` any track

### Evolutions ###
These changes are planned:

* Use `navigator.mediaDevices.getUserMedia` instead of `navigator.getUserMedia` ( which is deprecated ) for the browsers that support it
* Naming tracks for easier use
* Exporting files ( already possible, I just don't show the links )

The changes would be lovely, but not just yet:

* Exporting result ( which would mean merging all audio tracks )


#### Special thanks to ####
@nusofthq for their Recordmp3jsrepo: [https://github.com/nusofthq/Recordmp3js](Link URL)