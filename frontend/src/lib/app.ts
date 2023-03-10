import { dev } from "$app/environment";

const enum Action {
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

const enum TranscriptRole {
    HUMAN = "HUMAN",
    AI = "AI",
}

interface TranscriptMessage {
    type: "Transcript";
    role: TranscriptRole;
    text: string;
}

const url = dev ? "ws://localhost/ws" : `ws://${window.location.host}/ws`

type Message = ActionMessage | FaceHashMessage | TranscriptMessage;
console.log(new Date())
export const socket: WebSocket = new WebSocket(url);
console.log(new Date())
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
        console.log(data);
    } catch (e) {
        console.error(e);
    }
}

