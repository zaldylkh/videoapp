$(document).on("ready", toggleMediaPlayer);
function toggleMediaPlayer() {

	$("#content").addClass("content-large");
	$("#content").removeClass("content-small");
	$("#footer").addClass("footer-small");
	$("#footer").removeClass("footer-large");

	$("#mostrar").on("click", function(){
		$("#content").addClass("content-small");
		$("#content").removeClass("content-large");
		$("#footer").addClass("footer-large");
		$("#footer").removeClass("footer-small");
	});

	$("#ocultar").on("click", function(){
		$("#content").addClass("content-large");
		$("#content").removeClass("content-small");
		$("#footer").addClass("footer-small");
		$("#footer").removeClass("footer-large");
		

	});
}