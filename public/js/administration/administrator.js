$(function() {
    /*****
     * Click button to show the form to create administrator:
     *     Hide the + button
     *     Show the form to create administrator
     *     Diables all edit and delete buttons
     *****/
    $('#clickAddAdministrator').click(function() {
        $('#addAdministrator').removeClass('d-none');
        $('#clickAddAdministrator').addClass('d-none');
        disableEditButtons();
        disableDeleteButtons();
        $('html,body').animate({
            scrollTop: $('#addAdministrator').offset().top
        }, 'slow');
    });

    /*****
     * Click button to add the administrator:
     *     Call the web service to add
     *     If success:
     *         Hide the form to create administrator
     *         Show the + button
     *         Add the administrator to the table
     *         Show a success modal
     *         Enables all edit and delete buttons
     *     If fail:
     *         Show a fail modal
     *****/
    $('#addAdministratorButton').click(function() {
        var name = $('#addAdministratorName').val();
        var lastName = $('#addAdministratorLastName').val();
        var email = $('#addAdministratorEmail').val();
        var role = $('#addAdministratorRole').val();
        $.ajax({
            url: "/addAdministrator",
            type: "post",
            data: {
                name: name,
                lastName: lastName,
                email: email,
                role: role
            },
            dataType: "json",
            success: function(response) {
                if (response.error) {
                    alert(response.error.title + " " + response.error.message);
                } else {
                    var user = $.parseJSON(response);
                    $('#addAdministrator').addClass('d-none');
                    $('#clickAddAdministrator').removeClass('d-none');
                    enableEditButtons();
                    enableDeleteButtons();
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
                    $('html,body').animate({
                        scrollTop: $('#userTable').offset().top
                    }, 'slow');
                }
            },
            error: function() {
               alert("Erreur lors de la création de l'administrateur !");
            }
        });
    });

    /*****
     * Click button to cancel the addition of administrator:
     *     Hide the form to create administrator
     *     Show the + button
     *     Enable all edit and delete buttons
     *****/
    $('#cancelAdministratorButton').click(function() {
        $('#addAdministrator').addClass('d-none');
        $('#clickAddAdministrator').removeClass('d-none');
        enableEditButtons();
        enableDeleteButtons();
        $('html,body').animate({
            scrollTop: $('#userTable').offset().top
        }, 'slow');
    });

    /*****
     * Click button to edit administrator:
     *     Call the web service to edit administrator
     *     If success:
     *         Update the line in the table
     *         Hide the form to edit the administrator
     *         How the + button
     *         Enables all edit and delete buttons
     *****/
    $('#editAdministratorButton').click(function() {
        var id = $('#editAdministratorId').val();;
        var name = $('#editAdministratorName').val();
        var lastName = $('#editAdministratorLastName').val();
        var email = $('#editAdministratorEmail').val();
        var role = $('#editAdministratorRole').val();
        $.ajax({
            url: "/editAdministrator",
            type: "post",
            data: {
                id: id,
                name: name,
                lastName: lastName,
                email: email,
                role: role
            },
            dataType: "json",
            success: function(response) {
                var user = $.parseJSON(response);
                $('#editAdministrator').addClass('d-none');
                $('#clickAddAdministrator').removeClass('d-none');
                enableEditButtons();
                enableDeleteButtons();
                $('#lastName' + user.id).text(user.lastName);
                $('#name' + user.id).text(user.name);
                $('#email' + user.id).text(user.email);
                $('#role' + user.id).text(((user.roles[0] == "ROLE_SUPER_ADMIN") ? "Administrateur" : ((user.roles[0] == "ROLE_ADMIN") ? "Coach" : "Utilisateur")));
                $('html,body').animate({
                    scrollTop: $('#userTable').offset().top
                }, 'slow');
            },
            error: function() {
               alert("Erreur lors de la création de l'administrateur !");
            }
        });
    });

    /*****
     * Click button to cancel edition of administrator:
     *     Hide the form to edit administrator
     *     Show the + button
     *     Enables all edit and delete buttons
     */
    $('#cancelEditAdministratorButton').click(function() {
        $('#editAdministrator').addClass('d-none');
        $('#clickAddAdministrator').removeClass('d-none');
        enableEditButtons();
        enableDeleteButtons();
        $('html,body').animate({
            scrollTop: $('#userTable').offset().top
        }, 'slow');
    });
});

/*****
 * Click the button to delete an administrator:
 *     Call the web service to delete
 *     If success:
 *         Remove the line in the table
 *         Show a success modal
 *     If fail:
 *         Show a fail success
 *****/
$(document).on('click', '.deleteAdministrator', function() {
    var id = this.id;
        $.ajax({
            url: "/deleteAdministrator",
            type: "post",
            data: {
                id: id
            },
            success: function(user) {
                var row = '#row' + id;
                $(row).remove();
            },
            error: function(user) {
                alert("La suppression n'est pas encore implémentée");
            }
        });
});

/*****
 * Click button to show the form to edit administrator:
 *     Show the form to edit administrator
 *     Hide the + button
 *     Disables all edit and delete buttons
 *****/
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
    disableEditButtons();
    disableDeleteButtons();
    $('html,body').animate({
        scrollTop: $('#editAdministrator').offset().top
    }, 'slow');
});

/*****
 * Disable the edit buttons:
 *     Add the disabled property
 *     Add the disabled class
 */
function disableEditButtons() {
    $('.editAdministrator').prop('disabled', true);
    $('.editAdministrator').addClass('fa-disabled');
}

/*****
 * Enable the edit buttons:
 *     Remove the disabled property
 *     Remove the disabled class
 */
function enableEditButtons() {
    $('.editAdministrator').prop('disabled', false);
    $('.editAdministrator').removeClass('fa-disabled');
}

/*****
 * Disable the delete buttons:
 *     Add the disabled property
 *     Add the disabled class
 */
function disableDeleteButtons() {
    $('.deleteAdministrator').prop('disabled', true);
    $('.deleteAdministrator').addClass('fa-disabled');
}

/*****
 * Enable the delete buttons:
 *     Remove the disabled property
 *     Remove the disabled class
 */
function enableDeleteButtons() {
    $('.deleteAdministrator').prop('disabled', false);
    $('.deleteAdministrator').removeClass('fa-disabled');
}