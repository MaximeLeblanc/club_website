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
            dataType: "json",
            success: function(response) {
                var user = $.parseJSON(response);
                $('#addAdministrator').addClass('d-none');
                $('#clickAddAdministrator').removeClass('d-none');
                $('#userTable tbody').append("<tr id=\"row" + user.id + "\">" +
                    "<td id =\"lastName" + user.id + "\">" + user.lastName + "</td>" +
                    "<td id =\"name" + user.id + "\">" + user.name + "</td>" +
                    "<td id =\"email" + user.id + "\">" + user.email + "</td>" +
                    "<td id =\"role" + user.id + "\">" + 
                        ((user.roles[0] == "ROLE_SUPER_ADMIN") ? "Administrateur" : ((user.roles[0] == "ROLE_ADMIN") ? "Coach" : "Utilisateur")) +
                    "</td>" +
                    "<td id =\"photo" + user.id + "\">" +
                        ((user.photo != null && user.photo != "") ? "<img class=\"d-block img-responsive\" src=\"{{ asset(" + user.photo + ") }}\">" : "") +
                    "</td>" +
                    "<td>" +
                        "<i id=\"" + user.id + "\" class=\"fas fa-edit float-left editAdministrator\" style=\"font-size:24px\" data-toggle=\"tooltip\" title=\"Modifier\"></i>" +
                        "<i id=\"" + user.id + "\" class=\"fas fa-times float-right deleteAdministrator\" style=\"font-size:24px\" data-toggle=\"tooltip\" title=\"Supprimer\"></i>" +
                    "</td></tr>");
            },
            error: function() {
               alert("Erreur lors de la création de l'administrateur !");
            }
        });
    });
});