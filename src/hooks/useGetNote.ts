"use client";

import { useEffect, useState } from "react";
import { PitchDetector } from "pitchy";

export function useGetNote() {
  const [pitch, setPitch] = useState<number | undefined>();
  const [intervalValue, setIntervalValue] = useState<number | undefined>();
  const [targetState, setTargetState] = useState<
    undefined | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "hit"
  >(undefined);

  function updatePitch(
    target: number | undefined,
    analyserNode: AnalyserNode,
    detector: PitchDetector<Float32Array<ArrayBufferLike>>,
    input: Float32Array<ArrayBuffer>,
    sampleRate: number
  ) {
    analyserNode.getFloatTimeDomainData(input);
    const [pitch] = detector.findPitch(input, sampleRate);

    setPitch(Math.round(pitch * 10) / 10);

    if (target && target - 1 <= pitch && pitch <= target + 1) {
      setTargetState((existingTargetCount) => {
        if (existingTargetCount === "hit") {
          return "hit";
        } else if (existingTargetCount === undefined) {
          return 1;
        } else if (existingTargetCount < 10) {
          return (existingTargetCount + 1) as
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10;
        } else if (existingTargetCount === 10) {
          return "hit";
        }
      });
    } else {
      setTargetState((existingTargetCount) => {
        if (existingTargetCount === "hit") {
          return "hit";
        } else {
          return undefined;
        }
      });
    }
  }

  const start = (target: number) => {
    setTargetState(undefined);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const audioContext = new window.AudioContext();
      const analyserNode = audioContext.createAnalyser();

      analyserNode.minDecibels = -85;
      analyserNode.maxDecibels = 0;
      analyserNode.smoothingTimeConstant = 1;

      audioContext.createMediaStreamSource(stream).connect(analyserNode);
      const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
      detector.minVolumeDecibels = -22;
      const input = new Float32Array(detector.inputLength);

      updatePitch(
        target,
        analyserNode,
        detector,
        input,
        audioContext.sampleRate
      );
      const intervalValue = setInterval(() => {
        updatePitch(
          target,
          analyserNode,
          detector,
          input,
          audioContext.sampleRate
        );
      }, 100);

      setIntervalValue(intervalValue as unknown as number);
    });
  };

  const stop = () => {
    if (intervalValue) {
      setPitch(undefined);
      clearInterval(intervalValue);
      setIntervalValue(undefined);
    }
  };

  useEffect(
    () => () => {
      if (intervalValue) {
        clearInterval(intervalValue);
      }
    },
    [intervalValue]
  );

  return {
    /**
     * Starts the pitch detection.
     */
    start,
    /**
     * Stops the pitch detection.
     */
    stop,
    /**
     * The current pitch detected.
     */
    pitch,
    /**
     * Indicates whether the pitch detection is active.
     */
    active: !!intervalValue,
    /**
     * Indicates the whether the pitch detected is close to the target note.
     */
    targetState,
  };
}
