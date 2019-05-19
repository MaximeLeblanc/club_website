$(document).on('click', '.deleteAdministrator', function(){
    var id = this.id;
        $.ajax({
            url: "/deleteAdministrator",
            type: "post",
            data: {id: id},
            success: function(user) {
                var row = '#row' + id;
                $(row).remove();
            },
            error: function(user) {
                alert("La suppression n'est pas encore implémentée");
            }
        });
});