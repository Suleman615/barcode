async function toggleFlashlight() {
    try {
        // Check if getUserMedia is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error('getUserMedia is not supported on this device.');
            return;
        }

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
            document.getElementById('answer').innerText = 'Not Available';
            console.log('Back torch mode not supported or cannot be controlled manually.');
        }
    } catch (backError) {
        console.error('Error accessing back camera:', backError);
    } finally {
        // Stop the back camera stream
        if (backStream) {
            backStream.getTracks().forEach(track => track.stop());
        }
    }

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
    } catch (frontError) {
        console.error('Error accessing front camera:', frontError);
    } finally {
        // Stop the front camera stream
        if (frontStream) {
            frontStream.getTracks().forEach(track => track.stop());
        }
    }
}
