import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {DefaultValues, useForm} from "react-hook-form"

export const useZodForm = <T extends z.ZodType<any>>(schema : T, defaultValues?: DefaultValues<z.TypeOf<T>> | undefined) => {
    const {register, handleSubmit, watch, reset, formState: {errors}} = useForm({
        resolver : zodResolver(schema),
        defaultValues
    })
    return {register, errors, handleSubmit, watch, reset}
}