"use client"
import React,{useCallback, useEffect, useState} from 'react'
import {toast} from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { SafeUser, SafeReservation } from '../types';

import Heading from '../components/Heading';
import Container from '../components/Container';
import ListingCard from '../components/Listings/ListingCard';

interface ReservationsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const ReservationsClient : React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        try {
            setDeletingId(id);
            axios.delete(`/api/reservations/${id}`).then(()=>{
                toast.success('Reservation cancelled');
                router.refresh();
            }).catch(()=>{
                toast.error('Failed to cancel reservation');
            }).finally(()=>{
                setDeletingId('');
            })
        } catch (error) {
            toast.error('Failed to cancel reservation');
        }
    }, []);

  return (
    <Container>
      <Heading title="Reservations" subtitle="Booking on your properties" />
      <div
        className=" mt-10 
                grid 
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8"
      >
        {reservations.map((reservation) => (
            <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionLabel='Cancel Guest Reservation'
                currentUser={currentUser}
            />
        ))}
      </div>
    </Container>
  );
}

export default ReservationsClient