
import EmptyState from "../components/emptyState"

import getReservations from "@/app/actions/getReservations"

import getCurrentUser from "../actions/getCurrentUsers"
import TripsClient from "./tripsClient"

const TripsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
    );
  }

  const reservations = await getReservations({ userId: currentUser.id })

  if (reservations.length === 0) {
    return (
        <EmptyState
            title="No trips found"
            subtitle="Looks like you havent reserved any trips."
        />
    )
  }

  return (
    <TripsClient
    reservations={reservations}
    currentUser={currentUser}
    />
  )
}
 
export default TripsPage