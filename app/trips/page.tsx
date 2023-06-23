
import React from 'react'
import EmptyState from '../components/EmptyState'
import ClientOnly from '../components/ClientOnly'

import { getCurrentUser } from '../actions/getCurrentUser'
import { getReservations } from '../actions/getReservations'
import TripsClient from './TripsClient'

const Trips = async () => {
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
    const reservations = await getReservations({userId: currentUser.id});

    if(!reservations.length){
        return (
            <ClientOnly>
                <EmptyState 
                    title="You haven't booked any trips yet."
                    subtitle='When you do, they will show up here.'
                />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <TripsClient 
            reservations={reservations}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default Trips