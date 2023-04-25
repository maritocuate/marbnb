import Container from './components/container'
import EmptyState from './components/emptyState'
import ListingCard from './components/listings/listingCard'

import getListings, { 
  IListingsParams
} from './actions/getListings'
import getCurrentUser from './actions/getCurrentUsers'
import ClientOnly from './components/clientOnly'

interface HomeProps {
  searchParams: IListingsParams
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()
  
  if(listings.length === 0) {
    return(
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div 
          className="
            pt-24
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          ">
            {
              listings.map(listing => (
                <ListingCard
                  currentUser={currentUser}
                  key={listing.id}
                  data={listing}
                />
              ))
            }
        </div>
      </Container>
    </ClientOnly>
  )
}
