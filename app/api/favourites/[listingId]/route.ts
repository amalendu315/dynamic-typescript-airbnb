import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export async function POST( request:Request, {params}:{params:IParams} ){
    const currentUser = await getCurrentUser();
    if( !currentUser ) return NextResponse.redirect("/login");
    const { listingId } = params;
    if( !listingId || typeof listingId !== 'string' ) throw new Error("Invalid ID");
    let favourites = [...(currentUser.favouriteIds || [])];
    if( favourites.includes(listingId) ) return NextResponse.redirect("/favourites");
    favourites.push(listingId);
    const user = await client.user.update({
        where: { id: currentUser.id },
        data: { favouriteIds: favourites }
    });
    return NextResponse.json(user);
}

export async function DELETE( request:Request, {params}:{params:IParams} ){
    const currentUser = await getCurrentUser();
    if( !currentUser ) return NextResponse.redirect("/login");
    const { listingId } = params;
    if( !listingId || typeof listingId !== 'string' ) throw new Error("Invalid ID");
    let favourites = [...(currentUser.favouriteIds || [])];
    if (!favourites.includes(listingId)) throw new Error("Not in favourites");
    favourites = favourites.filter( id => id !== listingId );
    const user = await client.user.update({
        where: { id: currentUser.id },
        data: { favouriteIds: favourites }
    });
    return NextResponse.json(user);
}