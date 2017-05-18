
(function(){
	function init (){
		var recoder = new Recoder();
		document.querySelector('.recoderButton').onclick = function(){
			recoder.recoder();
		};
		document.querySelector('.stopRecoderButton').onclick = function(){
			recoder.stop();
		};
		
	}
	init();
}());
