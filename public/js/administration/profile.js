$(function() {
    $url = $('#photoUrl').val();
    $croppedImage = $('#photo').croppie({
        viewport: {
            width: 100,
            height: 100,
            type: 'circle'
        },
        boundary: {
            width: 150,
            height: 150
        },
        enableOrientation: true
    });

    if ($url != '') {
        $croppedImage.croppie('bind', {
            url: $url,
            zoom: 0.01,
        });
        $('#deleteProfileImage').removeClass('disabled');
    } else {
        $croppedImage.croppie('bind', {
            url: '../../images/user.png',
            zoom: 0.01,
        });
    }
    
    $('#rotateImage').click(function() {
        $croppedImage.croppie("rotate", -90);
        $('#deleteProfileImage').removeClass('disabled');
    });

    $('#adminImageInput').change(function() {
        readFile(this);
    });

    $('#deleteProfileImage').click(function() {
        if (!$(this).hasClass('disabled')) {
            $croppedImage.croppie('bind', {
                url: '../../images/user.png',
                zoom: 0.01,
            });
            $(this).addClass('disabled');
        }

    });

    $('#editProfileButton').click(function() {
        $('#editProfileConfirmationModal').modal();
    });

    $('#editProfileConfirmationModalConfirm').click(function() {
        // Update profile
        // If success modal success
        // If fail modal error
        $('#editProfileConfirmationModal').modal("hide");
        $('#editProfileButton').addClass('disabled');
    });

    $('.form-group').change(function() {
        $('#editProfileButton').removeClass('disabled');
        $('#cancelEditProfileButton').removeClass('disabled');
    });
});

function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            if ($croppedImage == "") {
                $croppedImage = $('#photo').croppie({
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
            }
            $croppedImage.croppie('bind', {
                url: e.target.result,
            });
            $('#deleteProfileImage').removeClass('disabled');
        }
        reader.readAsDataURL(input.files[0]);
    }
}