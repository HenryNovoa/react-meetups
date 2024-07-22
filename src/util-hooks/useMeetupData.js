import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchFavoriteMeetups, fetchMeetupData, updateFavoritesStatus } from '../respositories/meetupRepository'

export function useMeetupData() {
    return useQuery({
        queryKey: ['meetupData'],
        queryFn: fetchMeetupData,
    })
}

export function useToggleFavorite() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, currentStatus }) => updateFavoritesStatus(id, currentStatus),

        onSuccess: (updatedItem) => {
            //optimistic update
            queryClient.setQueryData(['meetupData'], (oldData) => {
                return oldData.map(item =>
                    item.id === updatedItem.id ? { ...item, favorite: updatedItem.favorite } : item
                )
            })
            queryClient.setQueryData(['favoriteMeetups'], (oldFavorites) => {
                const updatedFavorites = queryClient.getQueryData(['meetupData']).filter(item => item.favorite);
                return updatedFavorites;
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries(['meetupData'])
            queryClient.invalidateQueries(['favoriteMeetups'])
        },
    })
}

export function useFavoriteMeetups() {
    return useQuery({
        queryKey: ['favoriteMeetups'],
        queryFn: fetchFavoriteMeetups
    })
}