$(function() {
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
    $croppedImage.croppie('bind', {
        url: '../../images/user.png',
        zoom: 0,
    });

    $('#rotateImage').click(function() {
        if (!$(this).hasClass('disabled')) {
            $croppedImage.croppie("rotate", -90);
            $('#addAthleteDeleteImage').removeClass('disabled');
        }
    });

    $('#addAthleteImageInput').change(function() {
        readFile(this);
        $('#addAthleteDeleteImage').removeClass('disabled');
        $('#rotateImage').removeClass('disabled');
    });

    $('#addAthleteDeleteImage').click(function() {
        if (!$(this).hasClass('disabled')) {
            $croppedImage.croppie('bind', {
                url: '../../images/user.png',
                zoom: 0.01,
            });
            $(this).addClass('disabled');
            $('#rotateImage').addClass('disabled');
        }

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
        }
        reader.readAsDataURL(input.files[0]);
    }
}