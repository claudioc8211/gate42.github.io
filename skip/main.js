// var canvas = null;

// function downloadQrCode() {
//     document.location.href = canvas.replace('image/jpeg', 'image/octet-stream')
// }

function generateQrCode() {
    $('#result').hide();
    $('#qrcode').empty();
	var ssid = document.getElementById("ssid").value;
	var password = document.getElementById("password").value;
    if (ssid == '' || password == '') {
        alert("Completa tutti i campi per genrare il tuo SkipCode")
    }
    $.ajax({
        url: 'https://api.myjson.com/bins/10z9z1',
        method: 'GET'
    }).then(function(data) {
        $('#qrcode').qrcode({
            render: "canvas",
            text: data.skipCode,
            width: 300,
            height: 300,
            background: "#ffffff",
            foreground: "#000000",
            src: 'logo_qr.png',
            imgWidth: 100,
            imgHeight: 100});
        $('#result').show();
    });
    // canvas = document.getElementById('qrcode').childNodes[0].toDataURL('image/jpeg', 1.0);
}