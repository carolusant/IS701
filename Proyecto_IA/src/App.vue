<template>
  <h1>Proyecto IA</h1>
  <title>Detector de señas</title>
  <h3>Detector de señas - Prototipo</h3>
  <div class="wrapper">
    <video
      ref="videoCam"
      class="peer-video"
      :style="{ '--objectFit': 'contain' }"
      preload="auto"
      autoPlay
      muted
      playsInline
    ></video>
    <div class="alphabet">{{ sign }}</div>
  </div>
  <!-- prettier-ignore -->
  <div>
    <textarea name="result" id="result" cols="90" rows="5" class="result"></textarea>
  </div>
</template>

<script setup>
/* eslint-disable */
import { onMounted, ref } from "vue";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import * as fp from "fingerpose";
import Handsigns from "@/utils/handsigns";

const videoCam = ref();
const DETECTION_INTERVAL_MILLISECONDS = 250;
let sign = ref(null);
// eslint-disable-next-line
let temp = "";
let contador = 0;

// pedimos permiso para inicializar la camara
function initialiseWebCamera() {
  let All_mediaDevices = navigator.mediaDevices;
  if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
    console.log("getUserMedia() not supported.");
    return;
  }
  All_mediaDevices.getUserMedia({
    audio: true,
    video: true,
  })
    .then(function (vidStream) {
      if ("srcObject" in videoCam.value) {
        videoCam.value.srcObject = vidStream;
      } else {
        videoCam.value.src = window.URL.createObjectURL(vidStream);
      }
      videoCam.value.onloadedmetadata = function () {
        videoCam.value.play();
      };
    })
    .catch(function (e) {
      console.log(e.name + ": " + e.message);
    });
}
// eslint-disable-next-line
import * as mpHands from "@mediapipe/hands";
// Generar el detector con MediaPipeHands
const createDetectionInstance = async () => {
  const model = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: "mediapipe",
    modelType: "lite",
    solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915`, //error de cdn???
  };
  return await handPoseDetection.createDetector(model, detectorConfig);
};

// usamos fingerpose para procesar la detection
/* eslint-disable */
const handleSignDetection = (detector) => {
  if (!videoCam.value || !detector) return;
  setInterval(async () => {
    const hands = await detector.estimateHands(videoCam.value);
    //console.log(hands);
    if (hands.length > 0) {
      const GE = new fp.GestureEstimator([
        // fp.Gestures.ThumbsUpGesture,
        // fp.Gestures.ThumbsDownGesture,
        Handsigns.aSign,
        Handsigns.bSign,
        Handsigns.cSign,
        Handsigns.dSign,
        Handsigns.eSign,
        Handsigns.fSign,
        Handsigns.gSign,
        Handsigns.hSign,
        Handsigns.iSign,
        Handsigns.jSign,
        Handsigns.kSign,
        Handsigns.lSign,
        Handsigns.mSign,
        Handsigns.nSign,
        Handsigns.oSign,
        Handsigns.pSign,
        Handsigns.qSign,
        Handsigns.rSign,
        Handsigns.sSign,
        Handsigns.tSign,
        Handsigns.uSign,
        Handsigns.vSign,
        Handsigns.wSign,
        Handsigns.xSign,
        Handsigns.ySign,
        Handsigns.zSign,
        Handsigns.thumbs_down,
      ]);

      const landmark = hands[0].keypoints3D.map((value) => [
        value.x,
        value.y,
        value.z,
      ]);
      const estimatedGestures = await GE.estimate(landmark, 6.5);

      if (estimatedGestures.gestures && estimatedGestures.gestures.length > 0) {
        const confidence = estimatedGestures.gestures.map((p) => p.score);
        const maxConfidence = confidence.indexOf(
          Math.max.apply(undefined, confidence)
        );

        if (estimatedGestures.gestures[maxConfidence].name !== "") {
          sign.value = estimatedGestures.gestures[maxConfidence].name;
          // eslint-disable-next-line
          console.log("Valor del signo:" , estimatedGestures.gestures[maxConfidence].name);
          await writeSign(sign.value)
        } else {
          sign.value = null;
        }
      }
    }
  }, DETECTION_INTERVAL_MILLISECONDS);
};

// contamos las apariciones de cada letra antes de escribirla al texbox 
// para asi eliminar falsos positivos, ya que el modelo detecta 
const writeSign = async (sign)=>{
  console.log("recibido ", sign)
  if (temp=="") {
    temp =sign
  } else {
    if (temp==sign) {
      contador++; 
    }
  }

  if (contador>10) {
    console.log("La letra ", sign," ha aparecido ",contador ," veces")

    if(sign=="Borrar"){
      console.log("borrando palabra")
      let txt = document.getElementById("result").value
      txt = txt.substr(0,txt.length-1);
      console.log(txt)
      document.getElementById("result").value = txt

    }else{
        if(sign=="thumbs_up"){
          console.log("agregando espacio")
          document.getElementById("result").value += " ";
        }else{
          document.getElementById("result").value += sign;
        }
    }
    contador = 0;

  }
  temp=sign; //GUARDAR LA ULTIMA LETRA

};
onMounted(async () => {
  initialiseWebCamera();
  // eslint-disable-next-line
  const detector = await createDetectionInstance();
  handleSignDetection(detector);
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.result{
  font-size: 1.5rem;
  width: 50%;
  font-style: bold;
}
.peer-video {
  height: 50%;
  width: 50%;
  border-radius: 0.25rem;
  object-fit: var(--objectFit);
  transform: scaleX(-1);
}

.alphabet {
  position: absolute;
  bottom: 4rem;
  left: 45%;
  right: 45%;
  font-size: 6rem;
  font-weight: bold;
  color: rgb(241, 41, 41);
}
</style>
