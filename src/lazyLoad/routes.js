import { AllMeetupsPage, FavoritesPage, NewMeetupsPage } from "./pages";

export const routes = [
    { path: '/', element: AllMeetupsPage },
    { path: '/favorites', element: FavoritesPage },
    { path: '/new-meetup', element: NewMeetupsPage }
]