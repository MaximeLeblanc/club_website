$(function() {
    $('#cancelEditAdministratorButton').click(function() {
        $('#editAdministrator').addClass('d-none');
        $('#clickAddAdministrator').removeClass('d-none');
    });

    $('#editAdministratorButton').click(function() {
        var id = $('#editAdministratorId').val();;
        var name = $('#editAdministratorName').val();
        var lastName = $('#editAdministratorLastName').val();
        var email = $('#editAdministratorEmail').val();
        var role = $('#editAdministratorRole').val();
        $.ajax({
            url: "/editAdministrator",
            type: "post",
            data: {id: id, name: name, lastName: lastName, email: email, role: role},
            dataType: "json",
            success: function(response) {
                var user = $.parseJSON(response);
                $('#editAdministrator').addClass('d-none');
                $('#clickAddAdministrator').removeClass('d-none');
                $('#lastName' + user.id).text(user.lastName);
                $('#name' + user.id).text(user.name);
                $('#email' + user.id).text(user.email);
                $('#role' + user.id).text(((user.roles[0] == "ROLE_SUPER_ADMIN") ? "Administrateur" : ((user.roles[0] == "ROLE_ADMIN") ? "Coach" : "Utilisateur")));
            },
            error: function() {
               alert("Erreur lors de la création de l'administrateur !");
            }
        });
    });
});

$(document).on('click', '.editAdministrator', function() {
    var id = $(this).attr("id");
    $('#editAdministratorId').val(id);
    $('#editAdministratorName').val($('#name' + id).text());
    $('#editAdministratorLastName').val($('#lastName' + id).text());
    $('#editAdministratorEmail').val($('#email' + id).text());
    var role = $('#role' + id).text();
    $('#editAdministratorRole option[value=' + role + ']').attr('selected', 'selected');
    $('#editAdministrator').removeClass('d-none');
    $('#clickAddAdministrator').addClass('d-none');
});