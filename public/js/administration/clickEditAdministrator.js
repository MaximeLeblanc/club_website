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
                $('#addAdministrator').addClass('d-none');
                $('#clickAddAdministrator').removeClass('d-none');
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