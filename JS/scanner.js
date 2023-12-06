

const gotoHome = () => {
    window.location.assign('/index.html')
}


function toggleFlashlight() {
    if ('torch' in navigator) {
        navigator.torch.enabled ? turnOffFlashlight() : turnOnFlashlight();
    } else {
        document.getElementById('answer').innerText = "Not Supported"
        console.log('Torch API not supported on this device/browser.');
    }
}

function turnOnFlashlight() {
    navigator.torch.turnOn()
        .then(() => console.log('Flashlight turned on.'))
        .catch((error) => console.error('Error turning on flashlight:', error));
}

function turnOffFlashlight() {
    navigator.torch.turnOff()
        .then(() => console.log('Flashlight turned off.'))
        .catch((error) => console.error('Error turning off flashlight:', error));
}


function onScanSuccess(decodedText, decodedResult) {

    document.getElementById('result').innerHTML = `
        <p>${decodedText}</p>
        `
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


