$(function() {
    $clubImageList = [];
    $croppedImageList = [];

    $('.clubImage').each(function() {
        $clubImageList.push($(this));
    });

    for (var i = 0; i < $clubImageList.length; ++i) {
        $id = $clubImageList[i].attr('id');
        $url = $('#' + $id).text();
        $croppedImageList[$id] = $clubImageList[i].croppie({
            viewport: {
                width: 100,
                height: 100,
                type: 'circle'
            },
            boundary: {
                width: 150,
                height: 150
            }
        });
        $croppedImageList[$id].croppie('bind', {
            url: $url,
            zoom: 0.01,
        });
    }

    $croppedImageAddClub = $('#addClubImage').croppie({
        viewport: {
            width: 100,
            height: 100,
            type: 'circle'
        },
        boundary: {
            width: 150,
            height: 150
        }
    });

    $('#clickAddClub').click(function() {
        $('#addClubCard').removeClass('d-none');
        $('#clickAddClubCard').addClass('d-none');
        $('#addClubName').val('');
        $('#addClubAddress').val('');
        $('#addClubCity').val('');
        $('#addClubEmail').val('');
        $('#addClubCoach').val('');
        $('#addClubFacebook').val('');
        $('#addClubInstagram').val('');
        $('#addClubTwitter').val('');
        $croppedImageAddClub.croppie('bind', {
            url: '../../images/user.png',
            zoom: 0.01,
        });
        $('html,body').animate({
            scrollTop: $('#addClubCard').offset().top
        }, 'slow');
    });

    $('#cancelAddClubButton').click(function() {
        $('#addClubCard').addClass('d-none');
        $('#clickAddClubCard').removeClass('d-none');
    });

    $('#addClubButton').click(function() {
        $croppedImageAddClub.croppie('result', 'base64').then(function(logo) {
            var name = $('#addClubName').val();
            var image = logo;
            var address = $('#addClubAddress').val();
            var city = $('#addClubCity').val();
            var email = $('#addClubEmail').val();
            var coach = $('#addClubCoach').val();
            var facebook = $('#addClubFacebook').val();
            var instagram = $('#addClubInstagram').val();
            var twitter = $('#addClubTwitter').val();
            $.ajax({
                url: "/addClub",
                type: "post",
                data: {
                    name: name,
                    image: image,
                    address: address,
                    city: city,
                    email: email,
                    coach: coach,
                    facebook: facebook,
                    instagram: instagram,
                    twitter: twitter
                },
                dataType: "json",
                success: function(jsonResponse) {
                    var response = $.parseJSON(jsonResponse);
                    var club = $.parseJSON(response[0]);
                    var users = $.parseJSON(response[1]);
                    var selectOptions = "";
                    for (var i = 0; i < users.length; ++i) {
                        var user = users[i];
                        if (user.id == club.user.id) {
                            selectOptions += "<option selected value=\"" + user.id + "\">" +
                                user.lastName + " " + user.name +
                            "</option>";
                        } else {
                            selectOptions += "<option value=\"" + user.id + "\">" +
                                user.lastName + " " + user.name +
                            "</option>";
                        }
                    }
                    $('#addClubCard').addClass('d-none');
                    $('#clickAddClubCard').removeClass('d-none');
                    $('#clickAddClubCard').before(
                        "<div id=\"club" + club.id + "\" class=\"col-12 col-lg-6 my-3\">" +
                            "<div class=\"card\">" +
                                "<form>" +
                                    "<div class=\"card-header\">" +
                                        "<div class=\"input-group\">" +
                                            "<div class=\"input-group-prepend\">" +
                                                "<span class=\"input-group-text\" id=\"clubNameLogo" + club.id + "\"><i class=\"fas fa-address-card\"></i></span>" +
                                            "</div>" + 
                                            "<input type=\"input\" class=\"form-control\" id=\"clubName" + club.id + "\" value=\"" +  club.name + "\" placeholder=\"Nom du club\" aria-describedby=\"clubNameLogo" +  club.id + "\">" +
                                            "<div class=\"btn btn-dark clubButton editClub\" id=\"editClubButton" + club.id + "\" data-toggle=\"tooltip\" title=\"Modifier\"><i class=\"fas fa-edit\"></i></div>" +
                                            "<div class=\"btn btn-dark clubButton deleteClub\" id=\"deleteClubButton" + club.id + "\" data-toggle=\"tooltip\" title=\"Supprimer\"><i class=\"fas fa-times\"></i></div>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class=\"card-body text-center text-dark\">" +
                                        "<div class=\"clubImage\" id=\"" + club.id + "\">" +
                                            "<div class=\"d-none\" id=\"logo" + club.id + "\">" + club.logo + "</div>" +
                                        "</div>" +
                                        "<label for=\"clubImageInput" + club.id + "\" class=\"btn btn-dark mb-3\">Sélectionner une image</label>" +
                                        "<input type=\"file\" class=\"d-none selectClubImageInput\" id=\"clubImageInput" + club.id + "\">" +
                                        "<div class=\"input-group\">" +
                                            "<div class=\"input-group-prepend\">" +
                                                "<span class=\"input-group-text\" id=\"clubAddressLogo" + club.id + "\"><i class=\"fas fa-map-marked-alt fa-fw\"></i></span> "+
                                            "</div>" +
                                            "<input type=\"input\" class=\"form-control\" id=\"clubAddress" + club.id + "\" value=\"" + club.address + "\" placeholder=\"Adresse\" aria-describedby=\"clubAddressLogo" + club.id + "\">" +
                                        "</div>" +
                                        "<div class=\"input-group\">" +
                                            "<div class=\"input-group-prepend\">" +
                                                "<span class=\"input-group-text\" id=\"clubCityLogo" + club.id + "\"><i class=\"fas fa-city fa-fw\"></i></span>" +
                                            "</div>" +
                                            "<input type=\"input\" class=\"form-control\" id=\"clubCity" + club.id + "\" value=\"" + club.city + "\" placeholder=\"Ville\" aria-describedby=\"clubCityLogo" + club.id + "\">" +
                                        "</div>" +
                                        "<div class=\"input-group\">" +
                                            "<div class=\"input-group-prepend\">" +
                                                "<span class=\"input-group-text\" id=\"clubEmailLogo" + club.id + "\"><i class=\"fas fa-at fa-fw\"></i></span>" +
                                            "</div>" +
                                            "<input type=\"input\" class=\"form-control\" id=\"clubEmail" + club.id + "\" value=\"" + club.email + "\" placeholder=\"Email\" aria-describedby=\"clubEmailLogo" + club.id + "\">" +
                                        "</div>" +
                                        "<div class=\"input-group\">" +
                                            "<div class=\"input-group-prepend\">" +
                                                "<span class=\"input-group-text\" id=\"clubCoachLogo" + club.id + "\"><i class=\"fas fa-user fa-fw\"></i></span>" +
                                            "</div>" +
                                            "<select id=\"clubCoach" + club.id + "\" class=\"form-control\" aria-describedby=\"clubCoachLogo" + club.id + "\">" +
                                                selectOptions +
                                            "</select>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class=\"card-footer\">" +
                                        "<div class=\"input-group\">" +
                                            "<div class=\"input-group-prepend\">" +
                                                "<span class=\"input-group-text\" id=\"clubFacebookLogo" + club.id + "\"><i class=\"fab fa-facebook-square fa-fw\"></i></span>" +
                                            "</div>" +
                                            "<input type=\"input\" class=\"form-control\" id=\"clubFacebook" + club.id + "\" value=\"" + club.facebook + "\" placeholder=\"Lien Facebook\" aria-describedby=\"clubFacebookLogo" + club.id + "\">" +
                                        "</div>" +
                                        "<div class=\"input-group\">" +
                                            "<div class=\"input-group-prepend\">" +
                                                "<span class=\"input-group-text\" id=\"clubInstagramLogo" + club.id + "\"><i class=\"fab fa-instagram fa-fw\"></i></span>" +
                                            "</div>" +
                                            "<input type=\"input\" class=\"form-control\" id=\"clubInstagram" + club.id + "\" value=\"" + club.instagram + "\" placeholder=\"Lien Instagram\" aria-describedby=\"clubInstagramLogo" + club.id + "\">" +
                                        "</div>" +
                                        "<div class=\"input-group\">" +
                                            "<div class=\"input-group-prepend\">" +
                                                "<span class=\"input-group-text\" id=\"clubTwitterLogo" + club.id + "\"><i class=\"fab fa-twitter fa-fw\"></i></span>" +
                                            "</div>" +
                                            "<input type=\"input\" class=\"form-control\" id=\"clubTwitter" + club.id + "\" value=\"" + club.twitter + "\" placeholder=\"Lien Twitter\" aria-describedby=\"clubTwitterLogo"+  club.id + "\">" +
                                        "</div>" +
                                    "</div>" +
                                "</form>" +
                            "</div>" +
                        "</div>"
                    );
                    $croppedImageList[club.id] = $('#' + club.id).croppie({
                        viewport: {
                            width: 100,
                            height: 100,
                            type: 'circle'
                        },
                        boundary: {
                            width: 150,
                            height: 150
                        }
                    });
                    $croppedImageList[club.id].croppie('bind', {
                        url: club.logo,
                        zoom: 0.01,
                    });
                    $('#createClubSuccessModal').modal();
                },
                error: function(error) {
                    $('#createClubErrorModal').modal();
                }
            });
        });
    });

    $('#deleteClubConfirmationModalConfirm').click(function() {
        var id = $('#clubToDeleteId').text();
        $.ajax({
            url: "/deleteClub",
            type: "post",
            data: {
                id: id
            },
            success: function() {
                var club = '#club' + id;
                $(club).remove();
                $('#deleteClubConfirmationModal').modal("hide");
                $('#deleteClubSuccessModal').modal();
            },
            error: function() {
                $('#deleteClubErrorModal').modal();
            }
        });
    })
});

$(document).on('change', '.selectClubImageInput', function() {
    readFile(this);
})

$(document).on('click', '.deleteClub', function() {
    var id = this.id.substr(16);
    $('#clubToDeleteId').text(id);
    $('#deleteClubConfirmationModal').modal();
});

$(document).on('click', '.editClub', function() {
    var id = this.id.substr(14);
    $croppedImageList[id].croppie('result', {
            'type' :'base64',
            'size': 'original'
        }).then(function(logo) {
        var name = $('#clubName' + id).val();
        var image = logo;
        var address = $('#clubAddress' + id).val();
        var city = $('#clubCity' + id).val();
        var email = $('#clubEmail' + id).val();
        var coach = $('#clubCoach' + id).val();
        var facebook = $('#clubFacebook' + id).val();
        var instagram = $('#clubInstagram' + id).val();
        var twitter = $('#clubTwitter' + id).val();
        $.ajax({
            url: "/editClub",
            type: "post",
            data: {
                id: id,
                name: name,
                image: image,
                address: address,
                city: city,
                email: email,
                coach: coach,
                facebook: facebook,
                instagram: instagram,
                twitter: twitter
            },
            success: function(jsonResponse) {
                var response = $.parseJSON(jsonResponse);
                var club = $.parseJSON(response[0]);
                $croppedImageList[club.id].croppie('destroy');
                $croppedImageList[club.id].croppie({
                    viewport: {
                        width: 100,
                        height: 100,
                        type: 'circle'
                    },
                    boundary: {
                        width: 150,
                        height: 150
                    }
                });
                $croppedImageList[club.id].croppie('bind', {
                    url: club.logo,
                    zoom: 0.01,
                });
                $('#editClubSuccessModal').modal();
            },
            error: function() {
                $('#editClubErrorModal').modal();
            }
        });
    });
});

function readFile(input) {
    var inputId = $(input).attr('id');
    var divId = "";
    if (inputId == 'clubImageInputAdd') {
        divId = '#addClubImage'
    } else {
        divId = '#' + inputId.substr(14);
    }
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(divId).croppie('bind', {
                url: e.target.result
            });
        }
        reader.readAsDataURL(input.files[0]);
    }
}