import EmptyState from "../components/emptyState"
import ReservationClient from "./reservationClient"

import getCurrentUser from "../actions/getCurrentUsers"
import getReservations from "../actions/getReservations"


const ReservationPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    })

    if(reservations.length === 0) {
        return (
            <EmptyState
                title="No reservations found"
                subtitle="Looks like"
            />
        )
    } else {
        return (
            <ReservationClient
                reservations={reservations}
                currentUser={currentUser}
            />
        )
    }
}


export default ReservationPage