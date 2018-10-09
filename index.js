var FontManager = require('./node_modules/Bitsy/editor/shared/script/font.js')

//var editorFontManager = new FontManager()
//var resources = new ResourceLoader()

//var Exporter = require('./node_modules/Bitsy/editor/shared/script/exporter.js')

/*var ExporterUtils = {
	DownloadFile : function(filename, data) {

    require('fs').writeFile(filename, data)
	}
}*/

var exporter = new Exporter();
//exporter.exportGame( gameData, title, export_settings.page_color, filenameFromGameTitle() + ".html", isFixedSize, size );

var gameData=`Write your game's title here

# BITSY VERSION 5.2

! ROOM_FORMAT 1

PAL 0
0,82,204
128,159,255
255,255,255

ROOM 0
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
0,a,a,a,a,a,a,a,a,a,a,a,a,a,a,0
0,a,0,0,0,0,0,0,0,0,0,0,0,0,a,0
0,a,0,0,0,0,0,0,0,0,0,0,0,0,a,0
0,a,0,0,0,0,0,0,0,0,0,0,0,0,a,0
0,a,0,0,0,0,0,0,0,0,0,0,0,0,a,0
0,a,0,0,0,0,0,0,0,0,0,0,0,0,a,0
0,a,0,0,0,0,0,0,0,0,0,0,0,0,a,0
0,a,0,0,0,0,0,0,0,0,0,0,0,0,a,0
0,a,0,0,0,0,0,0,0,0,0,0,0,0,a,0
0,a,0,0,0,0,0,0,0,0,0,0,0,0,a,0
0,a,0,0,0,0,0,0,0,0,0,0,0,0,a,0
0,a,0,0,0,0,0,0,0,0,0,0,0,0,a,0
0,a,0,0,0,0,0,0,0,0,0,0,0,0,a,0
0,a,a,a,a,a,a,a,a,a,a,a,a,a,a,0
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
PAL 0

TIL a
11111111
10000001
10000001
10011001
10011001
10000001
10000001
11111111

SPR A
00011000
00011000
00011000
00111100
01111110
10111101
00100100
00100100
POS 0 4,4

SPR a
00000000
00000000
01010001
01110001
01110010
01111100
00111100
00100100
DLG SPR_0
POS 0 8,12

ITM 0
00000000
00000000
00000000
00111100
01100100
00100100
00011000
00000000
NAME tea
DLG ITM_0

DLG SPR_0
I'm a cat

DLG ITM_0
You found a nice warm cup of tea

VAR a
42`

exporter.exportGame( gameData, 'test', '#beaded', "test.html", false, 200 );

/*
function ResourceLoader() {
		var resources = {};
	
		var pathRoot = "./node_modules/Bitsy/editor/shared";
	
		this.load = function(folder, filename, onready) {
			require('fs').readFile(pathRoot + '/' + folder + '/' + filename, onReady||function(){})
		}
	
		this.get = function(filename) {
			return resources[filename];
		}
	
		// for manually adding stuff to the resources that doesn't ACTUALLY have to be loaded from an external file
		this.set = function(filename,data) {
			resources[filename] = data;
		}
	
		this.contains = function(filename) {
			return resources[filename] != null;
		}
	
		this.getResourceLoadedCount = function() {
			// feels hacky
			var count = 0;
			for (var r in resources) {
				count++;
			}
			return count;
		}
  }
*/