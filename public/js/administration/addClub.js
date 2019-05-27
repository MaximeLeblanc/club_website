$(function() {
    $croppedImage = $('#addClubImage').croppie({
        viewport: {
            width: 150,
            height: 150,
            type: 'circle'
        },
        boundary: {
            width: 200,
            height: 200
        }
    });

    $croppedImage.croppie('bind', {
        url: 'https://www.gannett-cdn.com/-mm-/2096e6680f13ffef233b6879d388f97975a30c5f/c=0-508-3120-2263/local/-/media/2016/08/18/USATODAY/usatsports/e3836f7dc81d48678ec9d8e7845a44e9.jpg?width=3200&height=1680&fit=crop',
    })
});