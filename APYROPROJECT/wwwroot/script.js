







const videoModal = document.getElementById('videoInModal');

Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
]).then(startWebcam);

function startWebcam() {
    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: false,
        })
        .then((stream) => {
            videoModal.srcObject = stream;
        })
        .catch((error) => {
            console.error(error);
        });
}




async function getLabeledFaceDescriptions() {
    const label = "Verified";
    const descriptions = [];

    for (let i = 1; i <= 100; i++) {
        try {
            const img = await faceapi.fetchImage(`./Images/${label}/${i}.png`);
            const detections = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor();
            descriptions.push(new faceapi.LabeledFaceDescriptors(label, [detections.descriptor]));
        } catch (error) {
            console.error(`Error processing image ${i}:`, error);
        }
    }

    return descriptions;
}




// Call the function to start processing
getLabeledFaceDescriptions()
    .then(descriptions => {
        console.log(descriptions);
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });





videoModal.addEventListener("play", async () => {
    const labeledFaceDescriptors = await getLabeledFaceDescriptions();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);


    const canvas = faceapi.createCanvasFromMedia(videoModal);
    const canvasContainer = document.getElementById('canvasContainer');
    canvasContainer.innerHTML = ''; // Clear the container in case the canvas was already appended
    canvasContainer.append(canvas);
    const displaySize = { width: videoModal.width, height: videoModal.height };
    faceapi.matchDimensions(canvas, displaySize);



    setInterval(async () => {
        const detections = await faceapi
            .detectAllFaces(videoModal)
            .withFaceLandmarks()
            .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        const results = resizedDetections.map((d) => {
            return faceMatcher.findBestMatch(d.descriptor);
        });
        results.forEach((result, i) => {
            const box = resizedDetections[i].detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, {
                label: result.toString(),
            });
            drawBox.draw(canvas);
        });
    }, 100);
});













/*


const videoModal = document.getElementById('videoInModal');


Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => videoModal.srcObject = stream,
        err => console.error(err)
    );
}

videoModal.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(videoModal);
    const canvasContainer = document.getElementById('canvasContainer');
    canvasContainer.innerHTML = ''; // Clear the container in case the canvas was already appended
    canvasContainer.append(canvas);
    const displaySize = { width: videoModal.width, height: videoModal.height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(videoModal, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        //for face box
        faceapi.draw.drawDetections(canvas, resizedDetections);
        //for Face landmarks and Expressions
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100);
});
*/