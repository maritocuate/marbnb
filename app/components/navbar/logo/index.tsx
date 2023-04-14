'use client'

import Image from 'next/image'
import logoImg from '../../../../public/images/logo.png'
import { useRouter } from 'next/navigation'

const Logo = () => {
    const router = useRouter()

    return (
        <Image
            alt='Logo'
            className='hidden md:block cursor-pointer'
            width='100'
            height='100'
            src={ logoImg }
        />
    )
}

export default Logo