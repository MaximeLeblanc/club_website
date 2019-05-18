$(function() {
    $('#addAdministratorButton').click(function() {
        var name = $('#addAdministratorName').val();
        var lastName = $('#addAdministratorLastName').val();
        var email = $('#addAdministratorEmail').val();
        var role = $('#addAdministratorRole').val();
        $.ajax({
            url: "/addAdministrator",
            type: "post",
            data: {name: name, lastName: lastName, email: email, role: role},
            success: function(user) {
                $('#addAdministrator').addClass('d-none');
                $('#clickAddAdministrator').removeClass('d-none');
                $('#userTable tbody').append("<tr>" +
                    "<td>" + user.lastName + "</td>" +
                    "<td>" + user.name + "</td>" +
                    "<td>" + user.email + "</td>" +
                    "<td>" + user.roles[0] + "</td>" +
                    "<td>" +
                        ((user.photo != null || user.photo == "") ? "<img class=\"d-block img-responsive\" src=\"{{ asset(" + user.photo + ") }}\">" : "") +
                    "</td>" +
                    "<td>" +
                        "<i id=\"" + user.id + "\" class=\"fas fa-edit float-left editAdministrator\" style=\"font-size:24px\" data-toggle=\"tooltip\" title=\"Modifier\"></i>" +
                        "<i id=\"" + user.id + "\" class=\"fas fa-times float-right deleteAdministrator\" style=\"font-size:24px\" data-toggle=\"tooltip\" title=\"Supprimer\"></i>" +
                    "</td>");
            },
            error: function() {
               alert("Erreur lors de la création de l'administrateur !");
            }
        });
    });
});