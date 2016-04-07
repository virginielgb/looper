(function(window){

	var WORKER_PATH = 'js/recorderWorker.js';
	var elem;
	var Recorder = function(source, cfg){
		var config = cfg || {};
		var bufferLen = config.bufferLen || 4096;
		var numChannels = config.numChannels || 2;
		this.context = source.context;
		this.node = (this.context.createScriptProcessor ||
								 this.context.createJavaScriptNode).call(this.context,
								 bufferLen, numChannels, numChannels);
		var worker = new Worker(config.workerPath || WORKER_PATH);
		worker.postMessage({
			command: 'init',
			config: {
				sampleRate: this.context.sampleRate,
				numChannels: numChannels
			}
		});
		var recording = false,
			currCallback;
		var hasStopped = 0;

		this.node.onaudioprocess = function(e){
			if (!recording) return;
			var buffer = [];
			for (var channel = 0; channel < numChannels; channel++){
					buffer.push(e.inputBuffer.getChannelData(channel));
			}
			worker.postMessage({
				command: 'record',
				buffer: buffer
			});
		}

		this.configure = function(cfg){
			for (var prop in cfg){
				if (cfg.hasOwnProperty(prop)){
					config[prop] = cfg[prop];
				}
			}
		}

		this.record = function(button){
			elem = button;
			recording = true;
			hasStopped = 0;
		}

		this.stop = function(){
			recording = false;
			hasStopped++;
		}

		this.clear = function(){
			worker.postMessage({ command: 'clear' });
		}

		this.getBuffer = function(cb) {
			currCallback = cb || config.callback;
			worker.postMessage({ command: 'getBuffer' })
		}

		this.exportWAV = function(cb, type){
			if( hasStopped <= 1 ) {
				// console.log( buffer );
				currCallback = cb || config.callback;
				type = type || config.type || 'audio/wav';
				if (!currCallback) throw new Error('Callback not set');
				worker.postMessage({
					command: 'exportWAV',
					type: type
				});
			}
		}

		worker.onmessage = function(e){
			
			var blob = e.data;
			currCallback(blob , elem );
		}


		function encode64(buffer) {
			var binary = '',
				bytes = new Uint8Array( buffer ),
				len = bytes.byteLength;

			for (var i = 0; i < len; i++) {
				binary += String.fromCharCode( bytes[ i ] );
			}
			return window.btoa( binary );
		}

		function parseWav(wav) {
			function readInt(i, bytes) {
				var ret = 0,
					shft = 0;

				while (bytes) {
					ret += wav[i] << shft;
					shft += 8;
					i++;
					bytes--;
				}
				return ret;
			}
			if (readInt(20, 2) != 1) throw 'Invalid compression code, not PCM';
			if (readInt(22, 2) != 1) throw 'Invalid number of channels, not 1';
			return {
				sampleRate: readInt(24, 4),
				bitsPerSample: readInt(34, 2),
				samples: wav.subarray(44)
			};
		}

		function Uint8ArrayToFloat32Array(u8a){
			console.log("called");
			var f32Buffer = new Float32Array(u8a.length);
			for (var i = 0; i < u8a.length; i++) {
				var value = u8a[i<<1] + (u8a[(i<<1)+1]<<8);
				if (value >= 0x8000) value |= ~0x7FFF;
				f32Buffer[i] = value / 0x8000;
			}
			return f32Buffer;
		}

		source.connect(this.node);
		this.node.connect(this.context.destination); //this should not be necessary
	};

	window.Recorder = Recorder;

})(window);
