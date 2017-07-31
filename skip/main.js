function generateQrCode() {
    $('#result').hide();
    $('#loader').hide();
    $('#qrcode').empty();
	var ssid = document.getElementById("ssid").value;
	var password = document.getElementById("password").value;
    if (ssid == '' || password == '') {
        alert("Completa tutti i campi per generare il tuo SkipCode")
    } else {
        $('#loader').show();
        var data = {"ssid": ssid, "password": password, "redirectLink": "marcoferraioli.com"};
        $.ajax({
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            'type': 'POST',
            'url': 'https://qrskip.herokuapp.com/api/skipcodes',
            'data': JSON.stringify(data),
            'dataType': 'json',
            'success': function(response){
                $('#canvas-qrcode').qrcode({
                    render: 'canvas',
                    minVersion: 1,
                    maxVersion: 40,
                    ecLevel: 'H',
                    left: 0,
                    top: 0,
                    size: 300,
                    fill: '#000',
                    background: '#fff',
                    text: response.skipCode,
                    radius: 0.5,
                    quiet: 0,
                    mode: 4,
                    mSize: 0.25,
                    mPosX: 0.5,
                    mPosY: 0.5,
                    image: document.getElementById("img-buffer")
                });
                var canvas = document.getElementById('canvas-qrcode').getElementsByTagName('canvas')[0];
                var dataUrl = canvas.toDataURL("image/png");
                var qrcodeimg = document.createElement('img');
                qrcodeimg.src = dataUrl;
                qrcodeimg.style.width = '300px';
                qrcodeimg.style.height = '300px';
                document.getElementById('qrcode').appendChild(qrcodeimg);
                $('#loader').hide();
                $('#result').show();
            },
            'error': function(error) {
                $('#loader').hide();
                alert('Si &egrave; verificato un errore. Ti preghiamo di riprovare più tardi.');
            }
        });
    }
}

function downloadQrCode() {
    var imgData = document.getElementById('qrcode').getElementsByTagName('img')[0]
    var doc = new jsPDF({
        orientation: 'landscape',
         format: 'a4',
    })
    
    doc.setFontSize(35)
    doc.text(15, 25, 'SkipCode')
    doc.addImage(imgData, 'PNG', 15, 40, 100, 100)
    doc.save('skipcode.pdf')
}