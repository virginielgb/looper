# Looper v2.0 #

This looper is made in javaScript and uses HTML5 audio APIs

### Getting started ###
Clone this repository or download the source code, upload it on a server ( it won't work if you just open the .html file ), and you're on!

### Usage ###
Although this may seem pretty obvious, what you can do is:

* Record a track, by pressing any `Record` button
* Add tracks, by pressing the `Add 4 tracks` button
* Set the next recordings' duration, by entering a value in the top input field
* Select the tracks you want to `loop`, or `loop all`
* Select the tracks you want to `play`, or play them all at once

### Evolutions ###
These changes are planned:

* Use `navigator.mediaDevices.getUserMedia` instead of `navigator.getUserMedia` ( which is deprecated ) for the browsers that support it
* Have a `mute` sort of button, so that `Play all` only plays selected tracks
* Delete a track ( right now can be sort of done by recording a 0s long track to override the one we want to delete )
* Naming tracks for easier use
* Exporting files ( already possible, I just don't show the links )

The changes would be lovely, but not just yet:

* Exporting result ( which would mean merging all audio tracks )


#### Special thanks to ####
@nusofthq for their Recordmp3jsrepo: [https://github.com/nusofthq/Recordmp3js](Link URL)