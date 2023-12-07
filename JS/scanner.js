

function reload() {
    window.location.assign('/index.js')
}




function onScanSuccess(decodedText, decodedResult) {


    document.getElementById('scannedResult').innerHTML = `
        <p>${decodedText}</p>
        `
    document.getElementById('result').style.display = 'block'

    document.getElementById('scancode').style.display = 'none'


    localStorage.setItem('code', decodedText)


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
