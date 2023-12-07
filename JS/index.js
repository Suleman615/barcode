
// // Check if the browser supports enumerateDevices
// if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
//     // Enumerate all media devices
//     navigator.mediaDevices.enumerateDevices()
//         .then(function (devices) {
//             // Check if there is a video input device (camera)
//             const hasCamera = devices.some(device => device.kind === 'videoinput');

//             if (hasCamera) {
//                 console.log('Camera is available');
//                 document.getElementById('scancode').style.display = 'block'
//                 document.getElementById('inputmanually').style.display = 'none'
//                 document.getElementById('result').style.display = 'none'


//             } else {
//                 document.getElementById('scancode').style.display = 'none'
//                 document.getElementById('inputmanually').style.display = 'block'
//                 document.getElementById('result').style.display = 'none'

//             }
//         })
//         .catch(function (error) {
//             console.error('Error enumerating devices:', error);
//         });
// } else {
//     // enumerateDevices is not supported
//     console.error('enumerateDevices is not supported');
// }

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







