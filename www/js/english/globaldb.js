document.addEventListener("deviceready", onDeviceReady, true);
var db;

function onDeviceReady(){
	db = window.sqlitePlugin.openDatabase({name: "my.db", location: 1});
}