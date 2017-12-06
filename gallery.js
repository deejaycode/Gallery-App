window.$on = function(target, type, cb){

	target.addEventListener(type, cb, false)

}

var CORE = (function(){

	"use strict"

	//modules object 

	var modules = {};

	function addModule(module_id, mod){

		modules[module_id] = mod;
	}

	function registerEvents(evt, module_id){

		var theMod;


		theMod = modules[module_id];
		theMod.events = evt;
	}

	function triggerEvent(evt){

		var mod;

		for(mod in modules){

			if(modules.hasOwnProperty(mod)){
				mod = modules[mod]

				if(mod.events && mod.events[evt.type]){
					mod.events[evt.type](evt.data);
				}
			}
		}
	}

	return {
		addModule: addModule,
		registerEvents: registerEvents,
		triggerEvent: triggerEvent
	}
}());

var sb = (function(){

	function listen(evt, module_id){
		CORE.registerEvents(evt, module_id);

	}

	function notify(){
		CORE.triggerEvent(evt);
	}

	return{

		listen: listen,
		notify: notify
	}

}())

var images = (function(){

	var thumbs, attr, id;

	id = 'pictures';

	function init() {

		thumbs = document.getElementById('thumbs');
		attr = thumbs.getElementsByTagName('a');

		for(var i = 0; i < attr.length; i++){

			$on(attr[i], 'click', reverse);
		}

		function reverse(e) {

			href = this.getAttribute('href');

			sb.notify({type: 'show-board', data: })

			e.preventDefault();
		}

		return {

			id: id,
			init: init,
			reverse: reverse

		}

	}


})();


var place = (function(){

	var id, info, node;

	id = "board";

	function init(){

		sb.listen({'show-board' : show}, id);

	}

	function show(href){

		info = document.getElementById('placeholder');

		setImage = info.nodeList[0];

		setImage.setAttribute('src', 'href');

		
	}

	return {

		id: id,
		init: init,
		show: show

	}

}())

CORE.addModule(images.id, images);
CORE.addModule(place.id, place);