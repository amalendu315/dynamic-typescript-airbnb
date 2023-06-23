import client from "../libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export default async function getFavouriteListings() {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser) return [];
        const favouriteListings = await client.listing.findMany({
            where: {
                id:{
                    in:[...(currentUser.favouriteIds || [])]
                },
            },
        });

        const safeFavourites = favouriteListings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));
        return safeFavourites;
    } catch (error:any) {
        throw new Error(error);
    }
}