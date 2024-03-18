










//const video = document.getElementById('video11');




/*

const video = document.getElementById('video11');
var mBlinkSound = new Audio("/sound/shotgun-firing1.mp3");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    );

    video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        var t1 = performance.now();
        var irisC = [];
        let nowBlinking = false;
        let blinkCount = 0;

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

            const landmarks = resizedDetections[0].landmarks;
            const landmarkPositions = landmarks.positions;

            const leftEye = landmarkPositions.slice(36, 42);  // Landmark points for the left eye

            // Calculate the average y-coordinate for the horizontal line
            const eyeHorLineY = (leftEye[1].y + leftEye[4].y) / 2;

            // Calculate the average x-coordinate for the vertical line
            const eyeVerLineX = (leftEye[0].x + leftEye[3].x) / 2;

            // Draw horizontal line for the left eye
            canvas.getContext('2d').beginPath();
            canvas.getContext('2d').moveTo(leftEye[0].x, eyeHorLineY);
            canvas.getContext('2d').lineTo(leftEye[3].x, eyeHorLineY);
            canvas.getContext('2d').strokeStyle = 'rgb(0, 255, 0)';
            canvas.getContext('2d').stroke();

            // Draw vertical line for the left eye (longer)
            const eyeVerLineStartY = leftEye[1].y;
            const eyeVerLineEndY = leftEye[4].y;
            canvas.getContext('2d').beginPath();
            canvas.getContext('2d').moveTo(eyeVerLineX, eyeVerLineStartY);
            canvas.getContext('2d').lineTo(eyeVerLineX, eyeVerLineEndY);
            canvas.getContext('2d').strokeStyle = 'rgb(0, 255, 0)';
            canvas.getContext('2d').stroke();

            // Code for blinking detection (based on irisC)
            // ... (the blinking detection logic you provided)
            // Update the blinkCount and trigger the sound accordingly

            var t2 = performance.now();  // Measure FPS
            const ctx = canvas.getContext('2d');
            ctx.font = "48px serif";
            ctx.fillText("FPS:" + Math.floor(1000.0 / (t2 - t1)), 10, 50);
            ctx.fillText("Count:" + blinkCount, 10, 100);
            if (nowBlinking) {
                ctx.fillText("Blinking", 10, 150);
            }
            t1 = t2;
        }, 33);
    });
}

startVideo();


*/








/*


const video = document.getElementById('video11');

async function startVideo() {
    // Load the face detection model (SsdMobilenetv1) and the face landmark model
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks();
            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

            if (resizedDetections && resizedDetections.length > 0) {
                const landmarks = resizedDetections[0].landmarks;

                // Extract landmark points for left eye
                const leftEye = landmarks.getLeftEye();

                // Draw horizontal line for the left eye
                const eyeHorLineY = (leftEye[1].y + leftEye[4].y) / 2;
                canvas.getContext('2d').beginPath();
                canvas.getContext('2d').moveTo(leftEye[0].x, eyeHorLineY);
                canvas.getContext('2d').lineTo(leftEye[3].x, eyeHorLineY);
                canvas.getContext('2d').strokeStyle = 'rgb(0, 255, 0)';
                canvas.getContext('2d').stroke();

                // Calculate the average x-coordinate for the vertical line
                const eyeVerLineX = (leftEye[0].x + leftEye[3].x) / 2;

                // Draw vertical line for the left eye (longer)
                const eyeVerLineStartY = leftEye[1].y;
                const eyeVerLineEndY = leftEye[4].y;
                canvas.getContext('2d').beginPath();
                canvas.getContext('2d').moveTo(eyeVerLineX, eyeVerLineStartY);
                canvas.getContext('2d').lineTo(eyeVerLineX, eyeVerLineEndY);
                canvas.getContext('2d').strokeStyle = 'rgb(0, 255, 0)';
                canvas.getContext('2d').stroke();
            }
        }, 100);
    });
}

startVideo();


*/


/*


const video = document.getElementById('video11');

async function startVideo() {
    // Load the face detection model (SsdMobilenetv1) and the face landmark model
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks();
            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

            if (resizedDetections && resizedDetections.length > 0) {
                const landmarks = resizedDetections[0].landmarks;

                // Extract landmark points for left and right eye
                const leftEye = landmarks.getLeftEye();
                const rightEye = landmarks.getRightEye();

                // Draw horizontal line for the eyes
                const eyeHorLineY = (leftEye[1].y + rightEye[4].y) / 2;
                canvas.getContext('2d').beginPath();
                canvas.getContext('2d').moveTo(leftEye[0].x, eyeHorLineY);
                canvas.getContext('2d').lineTo(rightEye[3].x, eyeHorLineY);
                canvas.getContext('2d').strokeStyle = 'rgb(0, 255, 0)';
                canvas.getContext('2d').stroke();

                // Draw vertical line for the eyes (longer)
                const eyeVerLineStartY = (leftEye[1].y + rightEye[1].y) / 2;
                const eyeVerLineEndY = (leftEye[4].y + rightEye[4].y) / 2;
                canvas.getContext('2d').beginPath();
                canvas.getContext('2d').moveTo((leftEye[0].x + rightEye[3].x) / 2, eyeVerLineStartY);
                canvas.getContext('2d').lineTo((leftEye[0].x + rightEye[3].x) / 2, eyeVerLineEndY);
                canvas.getContext('2d').strokeStyle = 'rgb(0, 255, 0)';
                canvas.getContext('2d').stroke();
            }
        }, 100);
    });
}

startVideo();


*/







/*

var mBlinkSound = new Audio("/sound/shotgun-firing1.mp3");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {

    
    if (navigator.userAgent.match(/iPhone|iPad|Android/)) { ///iPhone|Android.+Mobile/
        console.log("Mobile");
        video.width = 400; //1080;

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(localMediaStream => {
                if ('srcObject' in video) {
                    video.srcObject = localMediaStream;
                } else {
                    video.src = window.URL.createObjectURL(localMediaStream);
                }
                video.play();
            })
            .catch(err => {
                console.error(`Not available!!!!`, err);
            });

    }
    else {
        console.log("PC");
        navigator.getUserMedia(
            { video: {} },
            stream => video.srcObject = stream,
            err => console.error(err)
        )
    }


    console.log("video:" + [video.width, video.height]);

    // let div = document.createElement('div')
    // div.innerText = 'video size:'+video.width+', '+video.height
    // console.log(div.innerText);
    // document.body.appendChild(div)
}

video.addEventListener('play', () => {

    var canvas_bg = document.createElement("canvas");
    canvas_bg.width = video.width;
    canvas_bg.height = video.height;
    document.body.append(canvas_bg)
    var ctx_bg = canvas_bg.getContext('2d');
    // ctx_bg.fillStyle = "rgb(0,0,0)";
    // ctx_bg.fillRect(0, 0, video.width, video.height/2);

    var canvas_face = document.createElement("canvas");
    canvas_face.width = video.width;
    canvas_face.height = video.height;
    var ctx_face = canvas_face.getContext('2d');

    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)

    var t1 = performance.now();
    var irisC = [];
    let nowBlinking = false;
    let blinkCount = 0;

    setInterval(async () => {
        //const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        //faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

        //console.log(resizedDetections);
        const landmarks = resizedDetections[0].landmarks;
        //console.log(landmarks);
        const landmarkPositions = landmarks.positions;

        //--- Iric mark ---//
        ctx_bg.clearRect(0, 0, canvas_bg.width, canvas_bg.height)
        var x_ = landmarkPositions[38 - 1].x
        var y_ = landmarkPositions[38 - 1].y
        var w_ = landmarkPositions[39 - 1].x - landmarkPositions[38 - 1].x
        var h_ = landmarkPositions[42 - 1].y - landmarkPositions[38 - 1].y
        ctx_bg.fillStyle = "rgb(255,0,0)";
        ctx_bg.fillRect(x_, y_, w_, h_)

        x_ = landmarkPositions[44 - 1].x
        y_ = landmarkPositions[44 - 1].y
        w_ = landmarkPositions[45 - 1].x - landmarkPositions[44 - 1].x
        h_ = landmarkPositions[48 - 1].y - landmarkPositions[44 - 1].y
        ctx_bg.fillRect(x_, y_, w_, h_)



        
        //--- Face mask ---//
        ctx_bg.fillStyle = 'rgb(0,200,0)';
        ctx_bg.beginPath();
        ctx_bg.moveTo(landmarkPositions[0].x, landmarkPositions[0].y);
        for (var i = 1; i < 17; i++) {
            ctx_bg.lineTo(landmarkPositions[i].x, landmarkPositions[i].y);
        }
        ctx_bg.fill();

        ctx_bg.moveTo(landmarkPositions[0].x, landmarkPositions[0].y);
        ctx_bg.lineTo(landmarkPositions[17].x, landmarkPositions[17].y);
        ctx_bg.lineTo(landmarkPositions[27].x, landmarkPositions[17].y);
        ctx_bg.lineTo(landmarkPositions[27].x, landmarkPositions[0].y);
        //ctx_bg.lineTo(landmarkPositions[26].x, landmarkPositions[26].y);
        ctx_bg.lineTo(landmarkPositions[16].x, landmarkPositions[16].y);
        ctx_bg.lineTo(landmarkPositions[16].x, landmarkPositions[16].y - 200);
        ctx_bg.lineTo(landmarkPositions[0].x, landmarkPositions[0].y - 200);
        ctx_bg.lineTo(landmarkPositions[0].x, landmarkPositions[0].y);
        ctx_bg.fill();

        



        //--- Iris value ---//
        ctx_face.clearRect(0, 0, canvas_face.width, canvas_face.height)
        ctx_face.drawImage(video, 0, 0, video.width, video.height);
        var frame = ctx_face.getImageData(0, 0, video.width, video.height);
        var p_ = Math.floor(x_ + w_ / 2) + Math.floor(y_ + h_ / 2) * video.width
        //console.log("eye_RGB:"+[frame.data[p_*4+0], frame.data[p_*4+1], frame.data[p_*4+2]]);
        var v_ = Math.floor((frame.data[p_ * 4 + 0] + frame.data[p_ * 4 + 1] + frame.data[p_ * 4 + 2]) / 3);
        console.log("irisC:" + v_);

        irisC.push(v_);
        if (irisC.length > 100) {
            irisC.shift();
        }//

        let meanIrisC = irisC.reduce(function (sum, element) {
            return sum + element;
        }, 0);
        meanIrisC = meanIrisC / irisC.length;
        let vThreshold = 1.5;

        let currentIrisC = irisC[irisC.length - 1];
        if (irisC.length == 100) {
            if (nowBlinking == false) {
                if (currentIrisC >= meanIrisC * vThreshold) {
                    nowBlinking = true;
                }//
            }//
            else {
                if (currentIrisC < meanIrisC * vThreshold) {
                    nowBlinking = false;
                    blinkCount += 1;
                    mBlinkSound.pause();
                    mBlinkSound.currentTime = 0;
                    mBlinkSound.play();
                }//
            }//

        }//

        // //--- Iris position ---// 36 -> 39
        // let horizontal_eye = [];
        // var x_s = Math.floor( landmarkPositions[36].x )
        // var x_e = Math.floor( landmarkPositions[39].x )
        // var py = Math.floor( landmarkPositions[36].y )
        // for(var x=x_s;x<=x_e;x++){
        //     p_ = x + py * video.width
        //     v_ = (frame.data[p_*4+0] + frame.data[p_*4+1] + frame.data[p_*4+2])/3
        //     horizontal_eye.push(v_)
        // }



        //--- Graph ---//
        ctx_bg.strokeStyle = 'red';
        ctx_bg.lineWidth = 5;
        var Ox = 0;
        var Oy = canvas_bg.height / 2;
        var Lx = canvas_bg.width;
        var Ly = canvas_bg.height / 2;
        var vx = 0 / irisC.length * Lx;
        var vy = irisC[0] / 255 * Ly;
        ctx_bg.beginPath();
        ctx_bg.moveTo(Ox + vx, Oy - vy);
        for (var i = 1; i < irisC.length; i++) {
            vx = i / irisC.length * Lx;
            vy = irisC[i] / 255 * Ly;
            ctx_bg.lineTo(Ox + vx, Oy - vy);
        }
        ctx_bg.stroke();




        //--- mean value x threshold(1.X)
        ctx_bg.strokeStyle = 'rgb(0,255,0)';
        ctx_bg.lineWidth = 2;
        ctx_bg.beginPath();
        vx = 0 * Lx;
        vy = meanIrisC * vThreshold / 255 * Ly;
        ctx_bg.moveTo(Ox + vx, Oy - vy);
        vx = 1 * Lx;
        ctx_bg.lineTo(Ox + vx, Oy - vy);
        ctx_bg.stroke();

        // //--- Graph ---//
        // Ox = 0;
        // Oy = canvas_bg.height;
        // Lx = canvas_bg.width/2;
        // Ly = canvas_bg.height/2;
        // vx = 0;
        // vy = horizontal_eye[0]/255 * Ly;
        // ctx_bg.beginPath();
        // ctx_bg.moveTo(Ox+vx, Oy-vy);
        // for(var i=1;i<horizontal_eye.length;i++){
        //   vx = i/horizontal_eye.length * Lx;
        //   vy = horizontal_eye[i]/255 * Ly;
        //   ctx_bg.lineTo(Ox+vx, Oy-vy);
        // }
        // ctx_bg.stroke();


        var ctx = canvas.getContext('2d');
        var t2 = performance.now();//ms
        ctx.font = "48px serif";
        ctx.fillText("FPS:" + Math.floor(1000.0 / (t2 - t1)), 10, 50);
        ctx.fillText("Count:" + blinkCount, 10, 100);
        if (nowBlinking) {
            ctx.fillText("Blinking", 10, 150);
        }
        //ctx.fillText("FPS:"+ (t2-t1), 10, 50);
        t1 = t2;

    }, 33)

})





*/







/*





let detectionCount = 0;
let drawingDisplayDuration = 2000; // 2 seconds in milliseconds

const faceVerifiedLabel = 'Face Verified';

async function start() {
    // Load models
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');

    // Start video
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    );
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    const intervalId = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

        // Only increment the count if there are detections
        if (detections.length > 0) {
            if (detectionCount < 3) {
                detectionCount++;
                alert(`Detection ${detectionCount}`);
                // Reset the drawing display duration for detections 1 and 2
                drawingDisplayDuration = 2000;
            }
        }

        // Draw the detections, landmarks, and expressions on the canvas
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const centerX = displaySize.width / 2;
        const textWidth = 200;
        const textHeight = 40;
        const textX = centerX - textWidth / 2;
        const textY = 20;

        // Draw the "Face Verified" text inside the canvas
        if (detectionCount === 3) {
            context.fillStyle = 'rgba(0, 0, 0, 0.7)';
            context.fillRect(textX, textY, textWidth, textHeight);
            context.font = '20px Arial';
            context.fillStyle = 'white';
            context.fillText(faceVerifiedLabel, centerX - 90, 40);

            // Adjust the display duration for the third detection (5 seconds)
            drawingDisplayDuration = 5000;
        }

        // Display the drawings for the specified duration
        const labeledDescriptors = resizedDetections.map(d => {
            return {
                label: detectionCount === 3 ? faceVerifiedLabel : '',
                box: d.detection.box
            };
        });

        labeledDescriptors.forEach(({ label, box }) => {
            const drawBox = new faceapi.draw.DrawBox(box, { label });
            drawBox.draw(canvas);
        });

        setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }, drawingDisplayDuration);

        if (detectionCount === 3) {
            // Remove the "Face Verified" text after the specified duration
            setTimeout(() => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                clearInterval(intervalId);
            }, drawingDisplayDuration);
        }
    }, 5000);
});

start();











*/





/*

const video = document.getElementById('video11');
let detectionCount = 0;
let drawingDisplayDuration = 2000; // 2 seconds in milliseconds

const faceVerifiedLabel = 'Face Verified';

async function start() {
    // Load models
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');

    // Start video
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    );
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    const intervalId = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

        // Only increment the count if there are detections
        if (detections.length > 0) {
            if (detectionCount < 3) {
                detectionCount++;
                alert(`Detection ${detectionCount}`);
                // Reset the drawing display duration for detections 1 and 2
                drawingDisplayDuration = 2000;
            }
        }

        // Draw the detections, landmarks, and expressions on the canvas
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const centerX = displaySize.width / 2;
        const textWidth = 200;
        const textHeight = 40;
        const textX = centerX - textWidth / 2;
        const textY = 20;

        // Draw the "Face Verified" text inside the canvas
        if (detectionCount === 3) {
            context.fillStyle = 'rgba(0, 0, 0, 0.7)';
            context.fillRect(textX, textY, textWidth, textHeight);
            context.font = '20px Arial';
            context.fillStyle = 'white';
            context.fillText(faceVerifiedLabel, centerX - 90, 40);

            // Adjust the display duration for the third detection (5 seconds)
            drawingDisplayDuration = 5000;
        }

        // Display the drawings for the specified duration
        const labeledDescriptors = resizedDetections.map(d => {
            return {
                label: detectionCount === 3 ? faceVerifiedLabel : '',
                box: d.detection.box
            };
        });

        labeledDescriptors.forEach(({ label, box }) => {
            const drawBox = new faceapi.draw.DrawBox(box, { label });
            drawBox.draw(canvas);
        });

        setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }, drawingDisplayDuration);

        if (detectionCount === 3) {
            // Remove the "Face Verified" text after the specified duration
            setTimeout(() => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                clearInterval(intervalId);
            }, drawingDisplayDuration);
        }
    }, 5000);
});

start();

*/













/*

const video = document.getElementById('video11');
let detectionCount = 0;
let drawingDisplayDuration = 2000; // 2 seconds in milliseconds

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    );
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    let faceDetectedDiv; // Reference to the "Face Verified" text element

    const intervalId = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

        // Only increment the count if there are detections
        if (detections.length > 0) {
            if (detectionCount < 3) {
                detectionCount++;
                alert(`Detection ${detectionCount}`);
                // Reset the drawing display duration for detections 1 and 2
                drawingDisplayDuration = 2000;
            }
        }

        // Draw the detections, landmarks, and expressions on the canvas
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        // Display the drawings for the specified duration
        setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }, drawingDisplayDuration);

        if (detectionCount === 3) {
            // Display "Face Detected" at the top of the canvas for 5 seconds
            faceDetectedDiv = document.createElement('div');
            faceDetectedDiv.innerText = 'Face Verified';
            faceDetectedDiv.style.position = 'absolute';
            faceDetectedDiv.style.top = '200px';
            faceDetectedDiv.style.left = '50%';
            faceDetectedDiv.style.transform = 'translateX(-50%)';
            faceDetectedDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            faceDetectedDiv.style.color = 'white';
            faceDetectedDiv.style.padding = '10px';
            document.body.appendChild(faceDetectedDiv);

            // Adjust the display duration for the third detection (5 seconds)
            drawingDisplayDuration = 5000;

            // Remove the "Face Verified" text after the specified duration
            setTimeout(() => {
                if (faceDetectedDiv && faceDetectedDiv.parentNode) {
                    faceDetectedDiv.parentNode.removeChild(faceDetectedDiv);
                }
            }, drawingDisplayDuration);
        }

        if (detectionCount === 3) {
            clearInterval(intervalId);
        }
    }, 5000);
});

*/



/*
const video = document.getElementById('video11');
let detectionCount = 0;

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    );
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    const intervalId = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

        // Only increment the count if there are detections
        if (detections.length > 0) {
            if (detectionCount < 3) {
                detectionCount++;
                alert(`Detection ${detectionCount}`);
            }
        }

        // Draw the detections, landmarks, and expressions on the canvas
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        if (detectionCount === 3) {
            // Display "Face Detected" at the top of the canvas
            const faceDetectedDiv = document.createElement('div');
            faceDetectedDiv.innerText = 'Face Verified';
            faceDetectedDiv.style.position = 'absolute';
            faceDetectedDiv.style.top = '200px';
            faceDetectedDiv.style.left = '50%';
            faceDetectedDiv.style.transform = 'translateX(-50%)';
            faceDetectedDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            faceDetectedDiv.style.color = 'white';
            faceDetectedDiv.style.padding = '10px';
            document.body.appendChild(faceDetectedDiv);

            clearInterval(intervalId);
        }
    }, 5000);
});



*/








/*


const video = document.getElementById('video11');
let detectionCount = 0;

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    );
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    const intervalId = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

        // Only increment the count if there are detections
        if (detections.length > 0) {
            if (detectionCount < 3) {
                detectionCount++;
                alert(`Detection ${detectionCount}`);
            }
        }

        if (detectionCount === 3) {
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

            // Display "Face Detected" at the top of the canvas
            const faceDetectedDiv = document.createElement('div');
            faceDetectedDiv.innerText = 'Face Verified';
            faceDetectedDiv.style.position = 'absolute';
            faceDetectedDiv.style.top = '200px';
            faceDetectedDiv.style.left = '50%';
            faceDetectedDiv.style.transform = 'translateX(-50%)';
            faceDetectedDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            faceDetectedDiv.style.color = 'white';
            faceDetectedDiv.style.padding = '10px';
            document.body.appendChild(faceDetectedDiv);

            clearInterval(intervalId);
        }
    }, 5000);
});


*/














/*


const video = document.getElementById('video11');
let detectionCount = 0;

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    );
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    const intervalId = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        if (detectionCount === 3) {
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

            // Display "Face Detected" at the top of the canvas
            const faceDetectedDiv = document.createElement('div');
            faceDetectedDiv.innerText = 'Face Verified';
            faceDetectedDiv.style.position = 'absolute';
            faceDetectedDiv.style.top = '200px';
            faceDetectedDiv.style.left = '50%';
            faceDetectedDiv.style.transform = 'translateX(-50%)';
            faceDetectedDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            faceDetectedDiv.style.color = 'white';
            faceDetectedDiv.style.padding = '10px';
            document.body.appendChild(faceDetectedDiv);
        }

        if (detectionCount < 3) {
            detectionCount++;
            alert(`Detection ${detectionCount}`);
        } else {
            clearInterval(intervalId);
        }
    }, 5000);
});






*/







/*


const video = document.getElementById('video11');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    );
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        // Clear the canvas
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the detections, landmarks, and expressions on the canvas
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        if (detections.length > 0) {
            alert('Face detected');
        } else {
            alert('No face detected');
        }
    }, 3000);
});

*/



/*

const video = document.getElementById('video11');
let faceDetectionCount = 0;

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    );
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        // Check if a face is detected
        if (detections.length > 0) {
            faceDetectionCount++;

            // Display success message only on the third detection
            if (faceDetectionCount === 3) {
                alert('Success!!');
                faceDetectionCount = 0;  // Reset the count after displaying the message
            }
        } else {
            // Reset the count if no face is detected
            faceDetectionCount = 0;
        }
    }, 5000);  // Adjust the interval to 5 seconds (5000 milliseconds)
});



*/




/*
const video = document.getElementById('video11')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100)
})

*/