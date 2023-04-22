'use client'

import { useCallback, useMemo, useState } from 'react'

import Modal from '..'
import Heading from '../../heading'
import useRentModal from '../../hooks/useRentModal'
import { categories } from '../../navbar/categories'
import CategoryInput from '../../inputs/categoryInput'
import { FieldValues, useForm } from 'react-hook-form'

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal()
    const [step, setStep] = useState(STEPS.CATEGORY)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        },
    })

    const category = watch('category')

    const setCustomValues = (id:string, value:any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep(value => value-1)
    }
    const onNext = () => {
        setStep(value => value+1)
    }

    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE) return 'Create'

        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY) return undefined

        return 'Back'
    }, [step])

    const bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title='Which of these best describes your place?'
                subtitle='Pick a category'
            />
            <div className='
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
            '>
                {
                    categories.map(item => (
                        <div key={item.label} className='col-span-1'>
                            <CategoryInput
                                icon={item.icon}
                                selected={category === item.label}
                                label={item.label}
                                onClick={category => setCustomValues('category', category)}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <div className="flex flex-row justify-center items-center gap-2">
                <div>
                    First time using Marbnb?
                </div>
                <div
                    onClick={() => {}}
                    className='text-neutral-800 cursor-pointer hover:underline'>
                    Create an account
                </div>
            </div>
        </div>
    )

    return(
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={() => {}}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title='Marbnb your home'
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RentModal