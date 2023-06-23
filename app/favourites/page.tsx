import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import { getCurrentUser } from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListings";
import FavouritesClient from "./FavouritesClient";

const FavouritesPage = async () => {

    const user = await getCurrentUser();
    const listings = await getFavouriteListings();

    if(!listings.length){
        return (
          <ClientOnly>
            <EmptyState
              title="Favourites"
              subtitle="You don't have any favourites yet"
            />
          </ClientOnly>
        );
    }
    return (
        <ClientOnly>
          <FavouritesClient 
            listing={listings}
            currentUser={user}
          />  
        </ClientOnly>
    )
}

export default FavouritesPage;