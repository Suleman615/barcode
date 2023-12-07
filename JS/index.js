
// Check if the browser supports enumerateDevices
if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    // Enumerate all media devices
    navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {
            // Check if there is a video input device (camera)
            const hasCamera = devices.some(device => device.kind === 'videoinput');

            if (hasCamera) {
                console.log('Camera is available');
                document.getElementById('scancode').style.display = 'block'
                document.getElementById('inputmanually').style.display = 'none'

            } else {
                document.getElementById('scancode').style.display = 'none'
                document.getElementById('inputmanually').style.display = 'block'
            }
        })
        .catch(function (error) {
            console.error('Error enumerating devices:', error);
        });
} else {
    // enumerateDevices is not supported
    console.error('enumerateDevices is not supported');
}



function openScanner(fieldName) {
    localStorage.setItem('field', fieldName)
    window.location.assign('/scanner.html')
}


let field = localStorage.getItem('field')

let scannedCode = localStorage.getItem('code')


document.getElementById(field).value = scannedCode



