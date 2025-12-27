import {
  DrawingUtils,
  FilesetResolver,
  GestureRecognizer,
  type GestureRecognizerResult,
} from "@mediapipe/tasks-vision";
import { type RefObject } from "react";

import playSound from "./playSound";

export async function initModel(model: string) {
  const modelPath =
    model === "default" ? "gesture_recognizer" : "gesture_recognizer_custom";

  console.log(model);

  const vision = await FilesetResolver.forVisionTasks(
    "/node_modules/@mediapipe/tasks-vision/wasm"
  );
  const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `/${modelPath}.task`,
      delegate: "GPU",
    },
    numHands: 2,
    runningMode: "VIDEO",
  });

  return gestureRecognizer;
}

export function processRecognitionResults(
  recognitionResults: GestureRecognizerResult,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  leftHandRef: RefObject<string | null>,
  rightHandRef: RefObject<string | null>,
  drumkit:string,
) {
  let canvasCtx;
  let canvas;
  let drawingUtils;

  if (canvasRef.current) {
    canvasCtx = canvasRef.current.getContext("2d");
    canvas = canvasRef.current;
  }

  if (canvasCtx && canvas) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    drawingUtils = new DrawingUtils(canvasCtx);
  }

  if (recognitionResults.landmarks && drawingUtils) {
    for (const landmarks of recognitionResults.landmarks) {
      drawingUtils.drawConnectors(
        landmarks,
        GestureRecognizer.HAND_CONNECTIONS,
        {
          color: "#00FF00",
          lineWidth: 5,
        }
      );
      drawingUtils.drawLandmarks(landmarks, {
        color: "#FF0000",
        lineWidth: 2,
      });
    }

    const gestures = recognitionResults.gestures;

    if (gestures.length > 0) {
      const leftHand = gestures[0];
      const rightHand = gestures[1];

      let leftGesture = "";
      let rightGesture = "";

      if (leftHand && leftHandRef.current != leftHand[0].categoryName) {
        leftGesture = leftHand[0].categoryName;
        console.log(leftGesture);
        playSound(leftGesture, drumkit);
        leftHandRef.current = leftGesture;
      }

      if (rightHand && rightHandRef.current != rightHand[0].categoryName) {
        rightGesture = rightHand[0].categoryName;
        console.log(rightGesture);
        playSound(rightGesture, drumkit);
        rightHandRef.current = rightGesture;
      }
    }
  }

  canvasCtx?.restore();
}
