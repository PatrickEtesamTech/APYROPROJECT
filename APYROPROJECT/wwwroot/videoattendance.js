const video = document.getElementById('videoInput')
var media;


document.getElementById("videoInput").addEventListener("change", function () {
    media = URL.createObjectURL(this.files[0]);
    video.style.display = "block";
    video.src = media;
    $("#myModal").modal("toggle");
   /* video.play();*/
});

function stopVideo() {
    var video = document.getElementById("videoInput");
    video.pause();
}




Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models') 
]).then(start)







function start() {
    document.body.append('Models Loaded')






    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )

    /*    video.src = media;*/


        //video.src = '../videos/sample4.mp4'

/*    video.src = media;*/

    console.log('video added')
    recognizeFaces()
}

async function recognizeFaces() {

    const labeledDescriptors = await loadLabeledImages()
    console.log(labeledDescriptors)
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.5)


    video.addEventListener('play', async () => {
        console.log('Playing')
        const canvas = faceapi.createCanvasFromMedia(video)
        document.body.append(canvas)


        // FOR MODAL VIDEO RECOGNITION OR CAN ALSO CAM RECOGNITION
        //const canvasContainer = document.getElementById('canvasContainer1');
        //canvasContainer.innerHTML = ''; // Clear the container in case the canvas was already appended
        //canvasContainer.append(canvas);


        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)



        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()

            const resizedDetections = faceapi.resizeResults(detections, displaySize)

            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            results.forEach((result, i) => {
                const box = resizedDetections[i].detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                drawBox.draw(canvas)

                console.log(`Recognized Face: ${result.toString()}. Student Name: ${result.label}`);
            })
        }, 100)



    })
}


function loadLabeledImages() {
    //const labels = ['Black Widow', 'Captain America', 'Hawkeye' , 'Jim Rhodes', 'Tony Stark', 'Thor', 'Captain Marvel']
    const labels = ['Patrick Etesam']
    return Promise.all(
        labels.map(async (label) => {
            const descriptions = []
            for (let i = 1; i <= 2; i++) {
                const img = await faceapi.fetchImage(`/labeled_images/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                console.log(label + i + JSON.stringify(detections))
                descriptions.push(detections.descriptor)
            }
            document.body.append(label + ' Faces Loaded | ')
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
} 


//async function loadLabeledImages() {
//    const label = "Patrick Etesam";
//    const descriptions = [];

//    for (let i = 1; i <= 2; i++) {
//        try {
//            const img = await faceapi.fetchImage(`/labeled_images/${label}/${i}.jpg`);
//            const detections = await faceapi
//                .detectSingleFace(img)
//                .withFaceLandmarks()
//                .withFaceDescriptor();
//            descriptions.push(new faceapi.LabeledFaceDescriptors(label, [detections.descriptor]));
//        } catch (error) {
//            console.error(`Error processing image ${i}:`, error);
//        }
//    }

//    return descriptions;
//}