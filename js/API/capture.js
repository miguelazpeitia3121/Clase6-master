//pgAlert
function pgAlert(msj,tit){ navigator.notification.alert(msj, null, tit, 'Aceptar'); }

//Captura
function deviceReady(){
	//Obteniendo taps de los botones
	$('#capturar .rounded .arrow').tap(function(){
		switch($(this).index()){
			case 0: //Grabar Audio
				
				break;
			case 1: //Grabar Video
				
				break;
			case 2: //Capturar Imagen
				
		}
	});
}
//Errores de captura
function errorCaptura(err){ //Error
	pgAlert('Error; '+err.code, 'Error de Captura');
}
//Dispositivo Listo
function pageReady(){
	document.addEventListener("deviceready", deviceReady, false);
}
//WebView Listo
$(document).ready(pageReady);