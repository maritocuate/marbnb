'use client'

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
import useRegisterModal from '../../hooks/useRegisterModal'
import Modal from '..'
import Heading from '../../heading'
import Input from '../../inputs/input'
import Button from '../../button'
import { signIn } from 'next-auth/react'

const RegisterModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = data => {
        setLoading(true)
        axios.post('../../api/register', data)
            .then(() => {
                registerModal.onClose()
            })
            .catch(error => {
                toast.error('Something Went Wrong')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const toggleModal = useCallback(() => {
        loginModal.onOpen()
        registerModal.onClose()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title='Welcome to Marbnb'
                subtitle='Create an account'
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
                id='name'
                label='Name'
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
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className="flex flex-row justify-center items-center gap-2">
                <div>
                    Already have an account?
                </div>
                <div
                    onClick={toggleModal}
                    className='text-neutral-800 cursor-pointer hover:underline'>
                    Log in
                </div>
            </div>
        </div>
    )

    return(
        <Modal
            disabled={loading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            body={bodyContent}
            onSubmit={handleSubmit(onSubmit)}
            footer={footerContent}
        />
    )
}

export default RegisterModal