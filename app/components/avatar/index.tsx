'use client'

import Image from "next/image"
import avatarImage from '../../../public/images/placeholder.jpg'

const Avatar = () => {
    return(
        <Image
            alt='avatar'
            className="rounded-full"
            height='30'
            width='30'
            src={avatarImage}
        />
    )
}

export default Avatar