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
        }
    });
    $croppedImage.croppie('bind', {
        url: $url,
        zoom: 0.01,
    });
});