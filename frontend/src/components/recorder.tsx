import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

declare global {
    interface Window {
        SpeechRecognition: typeof SpeechRecognition;
        webkitSpeechRecognition: typeof SpeechRecognition;
    }
}

interface RecorderInterface{
    uniqueToken: string;
}

export default function Recorder({ uniqueToken }: RecorderInterface) {
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser does not support the Web Speech API");
            return;
        }

        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event) => {
            const transcript = Array.from(event.results)
                                    .map(result => result[0])
                                    .map(result => result.transcript)
                                    .join('');
            setText(transcript);
        };

        setRecognition(recognitionInstance);
    }, []);

    const toggleRecording = () => {
        if (recognition) {
            if (listening) {
                recognition.stop();
            } else {
                recognition.start();
            }
            setListening(!listening);
        }
    };
    
    return (
        <div>
            <p>{listening ? "🎤 Listening..." : "Click to start listening"}</p>
            <Button onClick={toggleRecording}>{listening ? 'Stop Recording' : 'Start Recording'}</Button>
            <p>{text}</p>
        </div>
    )
}