

// async function toggleFlashlight() {
//     try {
//         // Try to access the back camera
//         const backStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
//         const backTrack = backStream.getVideoTracks()[0];

//         // Check torch capabilities for the back camera
//         const backCapabilities = backTrack.getCapabilities();

//         if (backCapabilities.torch === true) {
//             const isBackTorchOn = backTrack.getSettings().torch === true;
//             await backTrack.applyConstraints({ advanced: [{ torch: !isBackTorchOn }] });
//             console.log(`Back flashlight turned ${isBackTorchOn ? 'off' : 'on'}.`);
//         } else {

//             document.getElementById('answer').innerText = 'Not Available'
//             console.log('Back torch mode not supported or cannot be controlled manually.');
//         }

//         backTrack.stop(); // Stop the back camera stream

//     } catch (backError) {
//         document.getElementById('answer').innerText = backError
//         console.error('Error accessing back camera:', backError);

//         try {
//             // If accessing the back camera fails, try to access the front camera
//             const frontStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
//             const frontTrack = frontStream.getVideoTracks()[0];

//             // Check torch capabilities for the front camera
//             const frontCapabilities = frontTrack.getCapabilities();

//             if (frontCapabilities.torch === true) {
//                 const isFrontTorchOn = frontTrack.getSettings().torch === true;
//                 await frontTrack.applyConstraints({ advanced: [{ torch: !isFrontTorchOn }] });
//                 console.log(`Front flashlight turned ${isFrontTorchOn ? 'off' : 'on'}.`);
//             } else {
//                 console.log('Front torch mode not supported or cannot be controlled manually.');
//             }

//             frontTrack.stop(); // Stop the front camera stream

//         } catch (frontError) {
//             console.error('Error accessing front camera:', frontError);
//         }
//     }
// }



async function toggleFlashlight() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();

        // Find all video input devices (cameras)
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        if (videoDevices.length > 0) {
            for (const videoDevice of videoDevices) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { deviceId: { exact: videoDevice.deviceId } },
                });

                const track = stream.getVideoTracks()[0];

                // Check torch capabilities for the camera
                const capabilities = track.getCapabilities();

                if (capabilities.torch === true) {
                    const isTorchOn = track.getSettings().torch === true;
                    await track.applyConstraints({ advanced: [{ torch: !isTorchOn }] });
                    console.log(`Flashlight for camera ${videoDevice.label || videoDevice.deviceId} turned ${isTorchOn ? 'off' : 'on'}.`);
                } else {
                    console.log(`Flashlight for camera ${videoDevice.label || videoDevice.deviceId} not supported or cannot be controlled manually.`);
                }

                track.stop(); // Stop the camera stream
            }
        } else {
            console.log('No cameras found.');
        }
    } catch (error) {
        document.getElementById('answer').innerText = error;
        console.error('Error accessing camera:', error);
    }
}
