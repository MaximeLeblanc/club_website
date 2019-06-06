$(function() {
    $croppedImage = $('#addClubImage').croppie({
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
        $('#clickAddClub').addClass('d-none');
        $croppedImage.croppie('bind', {
            url: '../../images/user.png',
        });
        $('html,body').animate({
            scrollTop: $('#addClubCard').offset().top
        }, 'slow');
    });

    $('#cancelAddClubButton').click(function() {
        $('#addClubCard').addClass('d-none');
        $('#clickAddClub').removeClass('d-none');
    });

    $('#addClubButton').click(function() {
        $croppedImage.croppie('result', 'base64').then(function(logo) {
            var name = $('#addClubName').val();
            var image = logo;
            var address = $('#addClubAddressLogo').val();
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
                success: function(response) {
                    var club = $.parseJSON(response);
                    $('#addClubCard').addClass('d-none');
                    $('#clickAddClub').removeClass('d-none');
                },
                error: function() {
                    alert("Erreur lors de la création du club !");
                }
            });
        });
    });

    $('#selectClubImageInput').change(function () {
        readFile(this);
    });
});

function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#addClubImage').croppie('bind', {
                url: e.target.result
            });
        }
        reader.readAsDataURL(input.files[0]);
    }
}
  
  