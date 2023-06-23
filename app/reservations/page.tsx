import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import { getCurrentUser } from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="You are not logged in"
          subtitle="Please login to view your reservations"
        />
      </ClientOnly>
    );
  }
  const reservations = await getReservations({
    authorId: currentUser.id,
  });
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="You have no reservations"
          subtitle="Looks like you haven't made any reservations yet"
        />
      </ClientOnly>
    );
  }
  return (
  <ClientOnly>
    <ReservationsClient 
        reservations={reservations}
        currentUser={currentUser}
    />
  </ClientOnly>
);
};

export default ReservationsPage;
