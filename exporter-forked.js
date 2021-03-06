var FontManager = require('./font-forked.js')
var editorFontManager = new FontManager()

function Exporter() {

	function ResourceLoader() {
		var self=this
		var resources = {};
	
		var pathRoot = "./node_modules/Bitsy/editor/shared";
	
		this.load = function(folder, filename, onready) {
			var data=require('fs').readFileSync(pathRoot + '/' + folder + '/' + filename, 'utf8')
			self.set(filename,data)
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

var resources = new ResourceLoader();

resources.load("other", "exportTemplate.html");
resources.load("style", "exportStyleFixed.css");
resources.load("style", "exportStyleFull.css");
resources.load("script", "bitsy.js");
resources.load("script", "font.js");
resources.load("script", "dialog.js");
resources.load("script", "script.js");
resources.load("script", "color_util.js");
resources.load("script", "renderer.js");
resources.load("bitsyfont", "ascii_small.bitsyfont");


/* exporting */
function escapeSpecialCharacters(str) {
	str = str.replace(/\\/g, '\\\\');
	str = str.replace(/"/g, '\\"');
	return str;
}

function replaceTemplateMarker(template, marker, text) {
	var markerIndex = template.indexOf( marker );
	if(marker == "@@M")console.log(text)
	return template.substr( 0, markerIndex ) + text + template.substr( markerIndex + marker.length );
}

this.exportGame = function(gameData, title, pageColor, filename, isFixedSize, size) {
	var html = resources.get("exportTemplate.html").substr(); //copy template
	// console.log(html);

	html = replaceTemplateMarker( html, "@@T", title );

	if( isFixedSize ) {
		html = replaceTemplateMarker( html, "@@C", resources.get("exportStyleFixed.css") );
		html = replaceTemplateMarker( html, "@@Z", size + "px" );
	}
	else {
		html = replaceTemplateMarker( html, "@@C", resources.get("exportStyleFull.css") );
	}

	html = replaceTemplateMarker( html, "@@B", pageColor );

	html = replaceTemplateMarker( html, "@@U", resources.get("color_util.js") );
	html = replaceTemplateMarker( html, "@@F", resources.get("font.js") );
	html = replaceTemplateMarker( html, "@@S", resources.get("script.js") );
	html = replaceTemplateMarker( html, "@@L", resources.get("dialog.js") );
	html = replaceTemplateMarker( html, "@@R", resources.get("renderer.js") );
	html = replaceTemplateMarker( html, "@@E", resources.get("bitsy.js") );

	// export the default font in its own script tag (TODO : remove if unused)
	html = replaceTemplateMarker( html, "@@N", "ascii_small" );
	html = replaceTemplateMarker( html, "@@M", resources.get("ascii_small.bitsyfont") );// editorFontManager.GetData("ascii_small") );

	html = replaceTemplateMarker( html, "@@D", gameData );

	// console.log(html);

	ExporterUtils.DownloadFile( filename, html );
}


/* importing */
function unescapeSpecialCharacters(str) {
	str = str.replace(/\\"/g, '"');
	str = str.replace(/\\\\/g, '\\');
	return str;
}

this.importGame = function( html ) {
	console.log("IMPORT!!!");

	// IMPORT : old style
	// find start of game data
	var i = html.indexOf("var exportedGameData");
	if(i > -1) {
		console.log("OLD STYLE");

		while ( html.charAt(i) != '"' ) {
			i++; // move to first quote
		}
		i++; // move past first quote

		// isolate game data
		var gameDataStr = "";
		var isEscapeChar = false;
		while ( html.charAt(i) != '"' || isEscapeChar ) {
			gameDataStr += html.charAt(i);
			isEscapeChar = html.charAt(i) == "\\";
			i++;
		}

		// replace special characters
		gameDataStr = gameDataStr.replace(/\\n/g, "\n"); //todo: move this into the method below
		gameDataStr = unescapeSpecialCharacters( gameDataStr );

		return gameDataStr;		
	}

	// IMPORT : new style
	var scriptStart = '<script type="bitsyGameData" id="exportedGameData">\n';
	var scriptEnd = '</script>';
	i = html.indexOf( scriptStart );
	console.log(i);
	if(i > -1) {
		console.log("NEW STYLE");

		i = i + scriptStart.length;
		var gameStr = "";
		var lineStr = "";
		var isDone = false;
		while(!isDone && i < html.length) {

			lineStr += html.charAt(i);

			if(html.charAt(i) === "\n") {
				if(lineStr === scriptEnd) {
					isDone = true;
				}
				else {
					gameStr += lineStr;
					lineStr = "";
				}
			}

			i++;
		}
		return gameStr;
	}

	console.log("FAIL!!!!");

	return "";
}

} // Exporter()

var ExporterUtils = {
	DownloadFile : function(filename, data) {

    require('fs').writeFile(filename, data)

	}
}

module.exports = Exporter