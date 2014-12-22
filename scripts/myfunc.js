function showPlayer() {
	$("#abrir").on("click", function(){
		$(".content1").addClass("content2");
		$(".content1").removeClass("content1");
		$(".footer").addClass("footer2");
		$(".footer").removeClass("footer");
	});

	$("#ocultar").on("click", function(){
		$(".content2").addClass("content1");
		$(".content2").removeClass("content2");
		$(".footer2").addClass("footer");
		$(".footer2").removeClass("footer2");
	});
}