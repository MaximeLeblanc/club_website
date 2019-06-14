$(function() {
    $url = $('#photoUrl').val();
    $croppedImage = "";
    
    if ($url != '') {
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
        $croppedImage.croppie('bind', {
            url: $url,
            zoom: 0.01,
        });
        $('#deleteProfileImage').removeClass('disabled');
    }

    $('#adminImageInput').change(function() {
        readFile(this);
    });

    $('#deleteProfileImage').click(function() {
        if (!$(this).hasClass('disabled')) {
            $croppedImage.croppie('destroy');
            $croppedImage = "";
            $(this).addClass('disabled');
        }

    })
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