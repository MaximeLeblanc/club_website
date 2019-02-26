$(document).ready(function() {
    ajaxCall();
});

function ajaxCall() {
	
	$.ajax({
        url: "/getClubs",
        method: "get",
        success: function(result) {
            updateContent(result);
        }
	});
}

function updateContent(result) {
	alert(result);
}