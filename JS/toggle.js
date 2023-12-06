async function toggleFlashlight() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        const track = stream.getVideoTracks()[0];

        const capabilities = track.getCapabilities();

        if (capabilities.torch === true) {
            const isTorchOn = track.getSettings().torch === true;
            await track.applyConstraints({ advanced: [{ torch: !isTorchOn }] });
            console.log(`Flashlight turned ${isTorchOn ? 'off' : 'on'}.`);
        } else {

            document.getElementById('answer').innerHTML = 'Not Suppotted'
            console.log('Torch mode not supported or cannot be controlled manually.');
        }

        track.stop();
    } catch (error) {
        document.getElementById('answer').innerHTML = error

        console.error('Error accessing camera:', error);
    }
}