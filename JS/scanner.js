

const gotoHome = () => {
    window.location.assign('/index.html')
}





function onScanSuccess(decodedText, decodedResult) {

    document.getElementById('result').innerHTML = `
        <p>${decodedText}</p>
        `
    localStorage.setItem('code', decodedText)
    window.location.assign("/index.html")


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

let msg = document.getElementById('reader__header_message').innerText

msg.includes('denied') ? window.location.assign('/index.html') : console.log('done')