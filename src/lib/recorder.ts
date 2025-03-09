import { hidePluginWindow } from "./utils"
import {v4} from "uuid"

let mediaRecorder : MediaRecorder

export const StartRecording = (onSources : {
    screen : string
    audio : string
    id : string
}) => {
    hidePluginWindow(true)
    const videoTransferFileName = `${v4()}-${onSources.id.slice(0,8)}.webm`;
    mediaRecorder.start(1000);
}

export const onStopRecording = () => mediaRecorder.stop(); 