'use client'

import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../../avatar'
import MenuItem from './menuItem'
import useRegisterModal from '../../hooks/useRegisterModal'
import useLoginModal from '../../hooks/useLoginModal'
import { SafeUser } from '@/app/types'
import { signOut } from 'next-auth/react'

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [open, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen(!open)
    }

    return(
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                >
                    Marbnb Your Home
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                ">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>

            {open && (
                <div className='
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                '>
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() => {}}
                                    label='My Trips'
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label='My Favorites'
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label='My Reservations'
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label='My Properties'
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label='Marbnb My Home'
                                />
                                <hr/>
                                <MenuItem
                                    onClick={signOut}
                                    label='Logout'
                                />
                            </>
                        ):(
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label='Login'
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label='Sign Up'
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu