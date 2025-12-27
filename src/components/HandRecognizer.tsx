import {
  GestureRecognizer,
  type GestureRecognizerResult,
} from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState } from "react";

import { initModel } from "../utils/model";
import { startWebcam, stopWebcam, predictWebcam } from "../utils/webcam";

interface HandRecognizerProps {
  model: string;
  drumkit: string;
}

export default function HandRecognizer({ model, drumkit }: HandRecognizerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gestureRecognizerRef = useRef<GestureRecognizer>(null);
  const leftHandGestureRef = useRef<string>(null);
  const rightHandGestureRef = useRef<string>(null);
  const requestRef = useRef(0);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [, setRecognitionResults] = useState<GestureRecognizerResult | null>(
    null
  );
  const [lastVideoTime, setLastVideoTime] = useState(-1);
  const [isCameraActive, setIsCameraActive] = useState(true);

  useEffect(() => {
    const animate = () => {
      predictWebcam(
        gestureRecognizerRef,
        videoRef,
        canvasRef,
        lastVideoTime,
        setLastVideoTime,
        setRecognitionResults,
        leftHandGestureRef,
        rightHandGestureRef,
        drumkit,
      );
      requestRef.current = requestAnimationFrame(animate);
    };

    if (mediaStream && videoRef.current) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mediaStream, lastVideoTime, drumkit]);

  useEffect(() => {
    stopWebcam(mediaStream, setMediaStream);

    (async () => {
      await startWebcam(videoRef, setMediaStream);

      gestureRecognizerRef.current = await initModel(model);
    })();
  }, [model]);

  useEffect(() => {
    (async () => {
      if (isCameraActive) {
        gestureRecognizerRef.current = await initModel(model);

        console.log(gestureRecognizerRef.current)

        await startWebcam(videoRef, setMediaStream);
      } else {
        stopWebcam(mediaStream, setMediaStream);
      }
    })();
  }, [isCameraActive]);

  return (
    <div className="relative">
      <div
        className="opacity-0 absolute w-full h-full transition duration-150 hover:bg-black hover:opacity-50 hover:cursor-pointer z-10 flex justify-center items-center hover:visible"
        onClick={() => setIsCameraActive(!isCameraActive)}
      >
        <p className="text-white text-4xl z-12">
          {isCameraActive ? "Stop" : "Start"} webcam
        </p>
      </div>

      <video className="transform rotate-y-180" ref={videoRef} autoPlay />
      <canvas
        className="absolute top-0 w-full h-full transform rotate-y-180"
        ref={canvasRef}
        width={1280}
        height={720}
      />
    </div>
  );
}
