// JavaScript Document
function showStorage(){
	//Botón 1
	$('#btnLocalStorage').tap(function(){
		var localKey = window.localStorage.key(0);
		var localVal = window.localStorage.getItem('llave');
		navigator.notification.confirm('El valor de '+localKey+' es:'+ localVal, function(btn){
			if(btn==1){
				window.localStorage.clear();
			}
		}, 'LocalStorage', "Eliminar BD, Cancelar");
	});
	//Botón 2
	$('#btnSQLTransaction').tap(function(){
		var db = window.openDatabase("BaseName", "1.0", "Proyecto API PhoneGap", 200000);
		db.transaction(function(tx){//Realizar Transacción de Consulta
			tx.executeSql("SELECT * FROM Tab", [], function(txi, results){
				var largo = results.rows.length;
				alert("Tabla BaseName: "+largo+" Filas encontradas");
				for(i=0; i<largo; i++){
					alert("ID = "+results.rows.item(i).nombId+"\nNombre = "+results.rows.item(i).nombre);	
				}
			}, function(err){
				navigator.notification.alert('Error procesando el SQL: '+err, function (){  }, 'SQL Transactions', "Aceptar");
			});
		}, function(err){//Errores en la transacción
			
		});
	});
}
function almacenar(){
	//local storage
	window.localStorage.setItem('llave','valor');
	//SQL Local Transactions
	var db = window.openDatabase("BaseName", "1.0", "Proyecto API PhoneGap", 200000);
	db.transaction(function(tx){//Generar Transacciones SQL
		tx.executeSql('DROP TABLE IF EXISTS TAB');
		tx.executeSql('CREATE TABLE IF NOT EXISTS TAB (nombId unique, nombre)');
		tx.executeSql("INSERT INTO TAB (nombId, nombre) VALUES (1,'Carlos')");
		tx.executeSql("INSERT INTO TAB (nombId, nombre) VALUES (2,'Felipe')");
		tx.executeSql("INSERT INTO TAB (nombId, nombre) VALUES (3,'Celma')");
		tx.executeSql("INSERT INTO TAB (nombId, nombre) VALUES (4,'Núñez')");
	}, function(err){//Error en la transacción
		navigator.notification.alert('Error procesando el SQL: '+err, function (){  }, 'SQL Transactions', "Aceptar");
	}, function(){//Si Todo sale bien
		navigator.notification.alert('Base de Datos Cargada', function (){  }, 'SQL Transactions', "Aceptar");
	});
}
$(document).ready(function(e) {
    document.addEventListener("deviceready", function(){
		almacenar();
		showStorage();
	}, false);
});