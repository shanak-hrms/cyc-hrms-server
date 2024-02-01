import React, { useRef, useState } from 'react'
import styles from './TakePicture.module.scss'

const TakePicture = () => {
    const [stream, setStream] = useState<any>(null);
    const videoRef = useRef<any>();

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const takePicture = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const picture = canvas.toDataURL('image/jpeg');
                console.log('Captured picture:', picture);
            } else {
                console.error('Failed to get 2D context for canvas');
            }
        } else {
            console.error('videoRef.current is null');
        }
    };

    return (
        <div>
            <button onClick={startCamera}>Start Camera</button>
            <button onClick={takePicture}>Take Picture</button>
            <video ref={videoRef} autoPlay muted style={{ width: '100%', maxWidth: '400px' }}></video>

        </div>
    )
}

export default TakePicture