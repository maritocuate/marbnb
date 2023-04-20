'use client'

import { signIn } from 'next-auth/react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import { toast } from 'react-hot-toast'

import useLoginModal from '../../hooks/useLoginModal'
import Modal from '..'
import Heading from '../../heading'
import Input from '../../inputs/input'
import Button from '../../button'
import { useRouter } from 'next/navigation'

const LoginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal()
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = data => {
        setLoading(true)
        
        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then(callback => {
            setLoading(false)

            if(callback?.ok) {
                toast.success('Logged in')
                router.refresh()
                loginModal.onClose()
            }

            if(callback?.error) {
                toast.error(callback.error)
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title='Welcome back'
                subtitle='Login to your account!'
            />
            <Input
                id='email'
                label='Email'
                disabled={loading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={loading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <div className="flex flex-row justify-center items-center gap-2">
                <div>
                    Already have an account?
                </div>
                <div
                    onClick={() => {}}
                    className='text-neutral-800 cursor-pointer hover:underline'>
                    Log in
                </div>
            </div>
        </div>
    )

    return(
        <Modal
            disabled={loading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            body={bodyContent}
            onSubmit={handleSubmit(onSubmit)}
            footer={footerContent}
        />
    )
}

export default LoginModal