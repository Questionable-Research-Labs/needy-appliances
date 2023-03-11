import { dev } from "$app/environment";
import { writable, type Writable } from "svelte/store";

export const enum Action {
    Off = "Off",
    On = "On"
}

interface ActionMessage {
    type: "Action";
    action: Action;
}

interface FaceHashMessage {
    type: "FaceHash";
    id: string[];
}

export const enum TranscriptRole {
    HUMAN = "Human",
    AI = "AI",
}

interface TranscriptMessage {
    type: "Transcript";
    role: TranscriptRole;
    text: string;
}

interface TranscriptEntry {
    role: TranscriptRole;
    text: string;
}


export const transcript: Writable<TranscriptEntry[]> = writable([]);
export const action: Writable<Action> = writable(Action.Off);
export const faceHashes: Writable<string[]> = writable([]);

const url = dev ? "ws://localhost/ws" : `ws://${window.location.host}/ws`

type Message = ActionMessage | FaceHashMessage | TranscriptMessage;

export const socket: WebSocket = new WebSocket(url);
socket.onopen = (event) => {
    console.log(new Date())
    console.log("Open", event)
}

socket.onerror = (error) => {
    console.error(error);
}

socket.onclose = (event) => {
    console.log("Socket closed", event)
}

socket.onmessage = (message) => {
    console.log(message);

    try {
        let data: Message = JSON.parse(message.data);
        if (data.type === "Transcript") {
            let role = data.role;
            let text = data.text;
            transcript.update(transcript => {
                transcript.push({
                    role,
                    text
                });
                return transcript;
            });
        } else if (data.type === "Action") {
            let value: Action = data.action;
            action.set(value);
        } else if (data.type === "FaceHash") {
            let hashes: string[] = data.id;
            faceHashes.set(hashes);
        }
        console.log(data);
    } catch (e) {
        console.error(e);
    }
}

