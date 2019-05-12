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
            success: function() {
                $('#addAdministrator').addClass('d-none')
                $('#clickAddAdministrator').removeClass('d-none')
            },
            error: function() {
               alert("Erreur lors de la création de l'administrateur !")
            }
        });
    });
});