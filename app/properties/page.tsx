
import React from 'react'
import EmptyState from '../components/EmptyState'
import ClientOnly from '../components/ClientOnly'

import { getCurrentUser } from '../actions/getCurrentUser'
import getListings from '../actions/getListings'
import PropertiesClient from './PropertiesClient'

const Properties = async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState 
                    title="You'll need to log in before you can see your trips."
                    subtitle='Log in to see your upcoming trips.'
                />
            </ClientOnly>
        )
    }
    const listings = await getListings({userId: currentUser.id});

    if(!listings.length){
        return (
            <ClientOnly>
                <EmptyState 
                    title="No properties yet."
                    subtitle='When you do, they will show up here.'
                />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <PropertiesClient 
            listings={listings}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default Properties;