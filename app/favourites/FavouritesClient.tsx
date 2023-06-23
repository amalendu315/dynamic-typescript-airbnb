import React from 'react'
import { SafeListing, SafeUser } from '../types'
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/Listings/ListingCard';

interface FavouritesClientProps {
    listing:SafeListing[];
    currentUser?:SafeUser | null;
}

const FavouritesClient:React.FC<FavouritesClientProps> = ({
    listing,
    currentUser
}) => {
  return (
    <Container>
        <Heading 
            title="Favourites"
            subtitle="Your favourite listings"
        />
        <div 
            className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            "
        >
            {listing.map((listing) => (
                <ListingCard 
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default FavouritesClient