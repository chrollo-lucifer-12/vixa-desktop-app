import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

const StudioTray = () => {

    let initialTime = new Date();

    const [preview, setPreview] = useState(false)

    const videoElement = useRef<HTMLVideoElement | null>(null)

    return (
        <div className="flex flex-col justify-end gap-y-5 h-screen draggable">
            <video autoPlay ref={videoElement} className={cn("w-6/12 border-2 self-end", preview ? "hidden" : "")} />
            <div className="rounded-full flex justify-around items-center h-20 w-full border-2 bg-[#171717] draggable border-white/40">

            </div>
        </div>
    )
}

export default StudioTray
