

async function toggleFlashlight() {
    try {
        // Try to access the back camera
        const backStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        const backTrack = backStream.getVideoTracks()[0];

        // Check torch capabilities for the back camera
        const backCapabilities = backTrack.getCapabilities();

        if (backCapabilities.torch === true) {
            const isBackTorchOn = backTrack.getSettings().torch === true;
            await backTrack.applyConstraints({ advanced: [{ torch: !isBackTorchOn }] });
            console.log(`Back flashlight turned ${isBackTorchOn ? 'off' : 'on'}.`);
        } else {

            document.getElementById('answer').innerText = 'Not Available'
            console.log('Back torch mode not supported or cannot be controlled manually.');
        }

        backTrack.stop(); // Stop the back camera stream

    } catch (backError) {
        console.error('Error accessing back camera:', backError);

        try {
            // If accessing the back camera fails, try to access the front camera
            const frontStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
            const frontTrack = frontStream.getVideoTracks()[0];

            // Check torch capabilities for the front camera
            const frontCapabilities = frontTrack.getCapabilities();

            if (frontCapabilities.torch === true) {
                const isFrontTorchOn = frontTrack.getSettings().torch === true;
                await frontTrack.applyConstraints({ advanced: [{ torch: !isFrontTorchOn }] });
                console.log(`Front flashlight turned ${isFrontTorchOn ? 'off' : 'on'}.`);
            } else {
                console.log('Front torch mode not supported or cannot be controlled manually.');
            }

            frontTrack.stop(); // Stop the front camera stream

        } catch (frontError) {
            console.error('Error accessing front camera:', frontError);
        }
    }
}



// function toggleFlashlight() {


//     const constraintList = document.querySelector("#answer");
//     const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();

//     for (const constraint of Object.keys(supportedConstraints)) {
//         const elem = document.createElement("li");
//         elem.innerHTML = `<code>${constraint}</code>`;
//         constraintList.appendChild(elem);
//     }
// }