// The proposed workaround over not having an API to work with that will least impact the other code
// as the only file that has to be modified is this one and the APP will continue to work as intended
let meetups = [
    {
        "id": "m1",
        "title": "This is a first meetup",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
        "address": "Meetupstreet 5, 12345 Meetup City",
        "description": "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
        "favorite": false
    },
    {
        "id": "m2",
        "title": "This is a second meetup",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
        "address": "Meetupstreet 5, 12345 Meetup City",
        "description": "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
        "favorite": false
    },
    {
        "id": "m3",
        "title": "This is a third meetup",
        "image": "https://www.deutschakademie.de/muenchen/blog/wp-content/uploads/2021/03/Mu%CC%88nchen-Alemania.jpg",
        "address": "Meetupstreet 5, 12345 Meetup City",
        "description": "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
        "favorite": false
    }
];



export async function fetchMeetupData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(meetups)
        }, 500)
    })

    // This would have an implementation like this:
    /* 
    const response = await fetch('/data.json')
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json() 
    */
}

export async function updateFavoritesStatus(id, currentStatus) {
    meetups = meetups.map(meetup => meetup.id === id ? { ...meetup, favorite: !currentStatus } : meetup)

    // Mock implementation
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id, favorite: !currentStatus })
        }, 500)
    })
}

export async function fetchFavoriteMeetups() {
    const data = await fetchMeetupData()
    return data.filter(meetup => meetup.favorite)
}