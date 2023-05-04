import EmptyState from "../components/emptyState"

import getCurrentUser from "../actions/getCurrentUsers"
import getFavoriteListings from "../actions/getFavoriteListings"

import FavoritesClient from "./favoritesClient"

const ListingPage = async () => {
    const listings = await getFavoriteListings()
    const currentUser = await getCurrentUser()

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorite listings."
            />
        )
    }

    return (
        <FavoritesClient
            listings={listings}
            currentUser={currentUser}
        />
    )
}
 
export default ListingPage