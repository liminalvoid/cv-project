import type { GestureRecognizer, GestureRecognizerResult } from "@mediapipe/tasks-vision";
import type { Dispatch, RefObject } from "react";

import { processRecognitionResults } from "./model";

export async function startWebcam(
  videoRef: RefObject<HTMLVideoElement | null>,
  setMediaStream: Dispatch<MediaStream | null>
) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
      },
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;

      videoRef.current.onloadeddata = () => {
        setMediaStream(stream);
      };
    }
  } catch (error) {
    console.error("Error accessing webcam", error);
  }
}

export function stopWebcam(
  mediaStream: MediaStream | null,
  setMediaStream: Dispatch<MediaStream | null>
) {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop());
    setMediaStream(null);
  }
}

export function predictWebcam(
  gestureRecognizerRef: RefObject<GestureRecognizer | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  lastVideoTime: number,
  setLastVideoTime: Dispatch<number>,
  setRecognitionResults: Dispatch<GestureRecognizerResult>,
  leftHandGestureRef: RefObject<string | null>,
  rightHandGestureRef: RefObject<string | null>,
  drumkit: string,
) {
  if (gestureRecognizerRef.current && videoRef.current) {
    const gestureRecognizer = gestureRecognizerRef.current;
    const video = videoRef.current;

    let detections;

    if (video.currentTime !== lastVideoTime) {
      setLastVideoTime(video.currentTime);
      detections = gestureRecognizer.recognizeForVideo(video, Date.now());
    }

    if (detections) {
      setRecognitionResults(detections);
    }

    if (canvasRef && detections) {
      processRecognitionResults(
        detections,
        canvasRef,
        leftHandGestureRef,
        rightHandGestureRef,
        drumkit,
      );
    }
  }
};
