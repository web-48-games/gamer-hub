"use client"


import React from "react";
import {useDropzone} from "react-dropzone";

import {Alert, TextInput} from "flowbite-react";
import {z} from "zod";
import {Control, Controller} from "react-hook-form";
import {getImageEtag} from "next/dist/server/image-optimizer";

type Props = {
    control: any,
    fieldValue: string,
    setSelectedImage: React.Dispatch<React.SetStateAction<any>>,
    setError: any
    clearErrors: any
}


export function ImageUploadDropZone(props: Props) {
    const {fieldValue, setSelectedImage, control, setError} = props

    const MAX_FILE_SIZE = 2000000
    const ACCEPTED_IMAGE_TYPES = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/svg+xml',
    ]

    const FileSchema = z
        .instanceof(File)
        .refine((file) => {
            return ACCEPTED_IMAGE_TYPES.includes(file.type)
        },"image is the wrong file type")
        .refine((file) => {
            return file.size <= MAX_FILE_SIZE
        }, "image is too large")



    return (
        <Controller
            control={control}
            name = {fieldValue}
            render={({field: {onChange, value}}) => {
                const onDrop = React.useCallback((acceptedFiles: any) => {

                    const validationResult = FileSchema.safeParse(acceptedFiles[0])
                    if(!validationResult.success) {
                        // set error in react-hook-form
                        setError(fieldValue, {type: 'manual', message: validationResult.error.issues[0]})

                    } else {
                        const formData = new FormData()
                        formData.append('image', acceptedFiles[0])

                        const fileReader = new FileReader()
                        fileReader.readAsDataURL(acceptedFiles[0])
                        fileReader.addEventListener("load", () => {
                            setSelectedImage(fileReader.result)
                        })

                        // set value in react-hook-form
                        onChange(formData)

                    }



                }, [setSelectedImage])
                const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

                return (
                    <div {...getRootProps()} className="p-2 rounded bg-wasa-300 hover:bg-wasa-400 hover:text-white text-[1rem] md:text-[1.5rem] xl:text-[1.5rem] text-center">
                        <div className="mb-2 block">
                            <label className="form-label" htmlFor="profileAvatar">Upload Image</label>
                        </div>
                        {/*<TextInput*/}
                        {/*    {...getInputProps()}*/}
                        {/*    aria-label="Image drag and drop area"*/}
                        {/*    className="form-control-file"*/}
                        {/*    accept="image/*"*/}
                        {/*/>*/}
                        {/*{*/}
                        {/*    isDragActive ?*/}
                        {/*        <span className="align-items-center">Drop image here</span> :*/}
                        {/*        <span*/}
                        {/*            className="align-items-center">Drag and drop image here, or click here to select an image</span>*/}
                        {/*}*/}
                    </div>
                )
            }

            }
        />

    )
}

type DisplayUploadErrorProps = {
    errors: { [key: string]: string },
    field: string

}