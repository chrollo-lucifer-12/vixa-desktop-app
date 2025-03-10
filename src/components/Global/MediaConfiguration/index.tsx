import { SourceDeviceStateProps } from '@/hooks/useMediaSources'
import { useStudioSettings } from '@/hooks/useStudioSettings';
import { Headphones, Loader, Monitor, Settings } from 'lucide-react';

interface Props {
    state: SourceDeviceStateProps,
    user: any
}

export const MediaConfiguration = ({ state, user }: Props) => {

    const activeScreen = state.displays?.find((screen) => screen.id === user?.screen)

    const activeAudio = state.audioInputs?.find((device) => device.deviceId === user.audio)

    const { isPending, onPreset, register } = useStudioSettings(user.media.id, user.media.screen || state?.displays?.[0].id, user.media.audio || state?.audioInputs?.[0].deviceId, user.media.preset);

    return (
        <form className="flex h-full relative w-full flex-col gap-y-5">
            {isPending && (<div className='fixed z-50 w-full top-0 left-0 right-0 bottom-0 rounded-2xl h-full bg-black/80 justify-center items-center'>
                <Loader /></div>)}
            <div className='flex gap-x-5 justify-center items-center'>
                <Monitor
                    fill='#575655'
                    color='#575655'
                    size={36}
                />
                <select
                    {...register("screen")}
                    className='outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#575655] bg-transparent w-full'
                >
                    {
                        state.displays?.map((display, key) => (
                            <option
                                selected={activeScreen && activeScreen.id === display.id}
                                value={display.id}
                                className='bg-[#171717] cursor-pointer'
                                key={key}
                            >
                                {display.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className='flex gap-x-5 justify-center items-center'>
                <Headphones
                    fill='#575655'
                    color='#575655'
                    size={36}
                />
                <select
                    {...register("audio")}
                    className='outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#575655] bg-transparent w-full'
                >
                    {
                        state.audioInputs?.map((device, key) => (
                            <option
                                selected={activeAudio && activeAudio.deviceId === device.deviceId}
                                value={device.deviceId}
                                className='bg-[#171717] cursor-pointer'
                                key={key}
                            >
                                {device.label}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className='flex gap-x-5 justify-center items-center'>
                <Settings
                    color="#575655"
                    size={36}
                />
                <select
                        {...register("preset")}
                        className='outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#575655] bg-transparent w-full'
                    >
                        <option
                            selected={onPreset === "HD" || user?.preset === "hd"}
                            value={"HD"}
                            className='bg-[#171717] cursor-pointer'
                        >
                            1080p{' '}
                        </option>
                        <option
                            selected={onPreset === "SD" || user?.preset === "sd"}
                            value={"SD"}
                            className='bg-[#171717] cursor-pointer'
                        >
                            720p
                        </option>
                    </select>
            </div>
        </form>
    )
}
