import { dataAccess } from "../dataAccess/SupabaseDataAccess"

export async function fetchMeetupData() {
    return dataAccess.getAll('meetups')

}

export async function updateFavoritesStatus(id, currentStatus) {
    return dataAccess.update('meetups', id, { favorite: !currentStatus })
}

export async function fetchFavoriteMeetups() {
    const data = await fetchMeetupData()
    return data.filter(meetup => meetup.favorite)
}
