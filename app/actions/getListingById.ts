import client from "../libs/prismadb";

interface IParams {
    listingId?: string;
}

export default async function getListingById({ listingId }: IParams) {
    try {
        const listing = await client.listing.findUnique({
            where: {
                id: listingId,
            },
            include:{
                user:true,
            }
        });
        if(!listing){
            throw new Error("Listing not found");
        }
        return {
            ...listing,
            createdAt:listing.createdAt.toISOString(),
            user:{
                ...listing.user,
                createdAt:listing.user.createdAt.toISOString(),
                updatedAt:listing.user.updatedAt.toISOString(),
                emailVerified:listing.user.emailVerified?.toISOString() || null,
            }
        };
    } catch (error:any) {
        throw new Error(error);
    }
}