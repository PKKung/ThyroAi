import { useCallback, useEffect, useRef, useState } from 'react';

export type CameraStatus = 'starting' | 'live' | 'unavailable';
export type Facing = 'environment' | 'user';

/** เปิดกล้องจริงผ่าน getUserMedia (ต้องเป็น HTTPS หรือ localhost) */
export function useCamera(enabled: boolean, facing: Facing) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<CameraStatus>('starting');

  useEffect(() => {
    if (!enabled) return;
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('unavailable');
      return;
    }
    let stream: MediaStream | null = null;
    let cancelled = false;
    setStatus('starting');

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { ideal: facing }, width: { ideal: 1280 } }, audio: false })
      .then((s) => {
        if (cancelled) return s.getTracks().forEach((t) => t.stop());
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          void videoRef.current.play().catch(() => {});
        }
        setStatus('live');
      })
      .catch(() => !cancelled && setStatus('unavailable'));

    return () => {
      cancelled = true;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [enabled, facing]);

  /** จับภาพเฟรมปัจจุบันเป็น data URL */
  const capture = useCallback((): string | null => {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return null;
    const canvas = document.createElement('canvas');
    const scale = Math.min(1, 800 / v.videoWidth);
    canvas.width = v.videoWidth * scale;
    canvas.height = v.videoHeight * scale;
    canvas.getContext('2d')?.drawImage(v, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.82);
  }, []);

  return { videoRef, status, capture };
}
