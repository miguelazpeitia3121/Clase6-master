//Acelerómetro
$(document).ready(function(e) {
    document.addEventListener("deviceready", function(){
		var verID = null;
		$('#brujula .greenButton').tap(function(){ //Obtener Aceleración actual
			navigator.compass.getCurrentHeading(function(h){//no hay problemas (errores)
			
			// aqui es para que el telefono detecte si esta acostado o en vertical
				pgAlert("Grados: "+h.magneticHeading,"Posicion Actual");
			}, comError);
		});
		
		$('#brujula .individual li').tap(function(){
			switch($(this).index()){
				case 0: //Comenzar actualización de acelerómetro
					//agregado en clase
					if(verID == null){
					verID = navigator.compass.watchHeading(function(h){
						$('#brujula .plastic li').eq(0).children('span').text("Grados:"); //zepto o JQ
						$('#brujula .plastic li').eq(0).children('strong').text(h.magneticHeading);
						
						
					}, comError, { frequency: 500});	
					}
					break;
				case 1: //Detener actualización de acelerómetro
					if(verID){
						//agregdo en la clase
						navigator.compass.clearWatch(verID);
						verID == null;
						$('#brujula .plastic li').eq(0).children('span').text("Apagado"); //zepto o JQ
						$('#brujula .plastic li').eq(0).children('strong').text("");
					}else{
						pgAlert('La brujula está apagado', 'Acelerómetro');
					}
			}
		});
		
		function comError(err){ //Error
			pgAlert('Error: '+err.code, 'Error');
		}
	}, false);
});