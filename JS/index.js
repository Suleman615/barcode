

document.getElementById('scancode').style.display = 'none'
document.getElementById('inputmanually').style.display = 'none'
document.getElementById('result').style.display = 'none'

// Check if the browser supports getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Attempt to access the camera without displaying the stream
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            // Camera is available, but we don't need the stream
            console.log('Camera is available');
            document.getElementById('scancode').style.display = 'block'
            document.getElementById('inputmanually').style.display = 'none'
            document.getElementById('result').style.display = 'none'
            // Don't forget to stop the stream after checking
            stream.getTracks().forEach(track => track.stop());
        })
        .catch(function (error) {
            // Camera is not available or permission denied
            console.error('No camera found:', error);
            document.getElementById('scancode').style.display = 'none'
            document.getElementById('inputmanually').style.display = 'block'
            document.getElementById('result').style.display = 'none'
        });
} else {
    // getUserMedia is not supported
    console.error('getUserMedia is not supported');
}







// *******************Scanner functions**********************



function onScanSuccess(decodedText, decodedResult) {

    document.getElementById('result').innerHTML = `
        <p>${decodedText}</p>
        `
    document.getElementById('scancode').style.display = 'none'

    document.getElementById('result').style.display = 'block'



    html5QrcodeScanner.clear();
}



function onScanFail(results) {
    console.log(results)
    document.getElementById('result').innerHTML = `<p>Nothing Found</p>`
}

let config = {
    fps: 10,
    qrbox: { width: 200, height: 200 },
    rememberLastUsedCamera: false,
    howTorchButtonIfSupported: true,
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
};


let html5QrcodeScanner = new Html5QrcodeScanner("reader", config, false);

html5QrcodeScanner.render(onScanSuccess, onScanFail)





