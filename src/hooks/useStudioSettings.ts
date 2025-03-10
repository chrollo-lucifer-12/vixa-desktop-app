import { updateStudioSettingsSchema } from "@/schemas/studio-settings.schema"
import { useZodForm } from "./useZodForm"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { updateStudioSettings } from "@/lib/utils"
import { toast } from "sonner"

export const useStudioSettings = (id: string, screen?: string | null, audio?: string | null, preset?: "HD" | "SD") => {
    const [onPreset, setOnPreset] = useState(preset)

    const { register, watch } = useZodForm(updateStudioSettingsSchema)

    const { mutate, isPending } = useMutation(
        {
            mutationKey: ["update-studio"],
            mutationFn: (data: {
                screen: string
                id: string
                audio: string
                preset: string
            }) => updateStudioSettings(data.id, data.screen, data.audio, data.preset),
            onSuccess: () => {
                return toast(data.status === 200 ? "Success" : "Error", {
                    description: data.message
                })
            }
        }
    )

    useEffect(() => {
        if (screen && audio) {
            window.ipcRenderer.send("media-sources", {
                screen,
                id: id,
                audio,
                preset
            })
        }
    }, [screen, audio])

    useEffect(() => {
        const subscribe = watch((values) => {
            setOnPreset(values.preset)
            mutate({
                screen: values.screen!,
                id,
                audio: values.audio!,
                preset: values.preset!
            })
            window.ipcRenderer.send("media-sources", {
                screen: values.screen,
                id,
                audio: values.audio,
                preset: values.preset
            })
        })

        return () => {
            subscribe.unsubscribe();
        }
    }, [watch])

    return { register, isPending, onPreset }
}