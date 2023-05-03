'use client'

import axios from 'axios'
import { toast } from 'react-hot-toast'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SafeReservation, SafeUser } from '@/app/types'

import Heading from '@/app/components/heading'
import Container from '@/app/components/container'
import ListingCard from '@/app/components/listings/listingCard'

interface ReservationClientProps {
    reservations: SafeReservation[]
    currentUser?: SafeUser | null
}

const ReservationClient: React.FC<ReservationClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter()
    const [deleteId, setDeleteId] = useState('')

    const onCancel = useCallback((id:String) => {
        setDeleteId(id)

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled')
                router.refresh()
            })
            .catch(() => {
                toast.error('Something went wrong.')
            })
            .finally(() => {
                setDeleteId('')
            })
    }, [router]) 

    return (
        <Container>
            <Heading
                title='Reservations'
                subtitle='Bookings on your property'
            />
            <div
                className='
                mt-10
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
                '
            >
                {
                    reservations.map((item:any) => (
                        <ListingCard
                            key={item.id}
                            data={item.listing}
                            reservation={item}
                            actionId={item.id}
                            onAction={onCancel}
                            disabled={deleteId === item.id}
                            actionLabel="Cancel guest reservation"
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    )
}

export default ReservationClient