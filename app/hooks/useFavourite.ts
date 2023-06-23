import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { SafeUser } from '../types';

import useLoginModal from './useLoginModal';

interface IUseFavourite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavourite = ({ listingId, currentUser }: IUseFavourite) => {
    const router = useRouter();
    const loginModal= useLoginModal();
    const isFavourite = useMemo(() => {
        if (!currentUser) return false;
        const list = currentUser.favouriteIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);
    const toggleFavourite = useCallback(async (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        event.stopPropagation();
        if (!currentUser) return loginModal.onOpen();
        try {
            let request;
            if (isFavourite) {
                request = () => axios.delete(`/api/favourites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favourites/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success("Favourite updated");
        } catch (error:any) {
            toast.error('Something went wrong');
        }
    }, [currentUser, listingId, loginModal]);

    return {
        isFavourite,
        toggleFavourite,
    };
};

export default useFavourite;