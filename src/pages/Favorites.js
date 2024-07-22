import MeetupItem from '../components/meetups/MeetupItem';
import { useFavoriteMeetups } from '../util-hooks/useMeetupData';
import classes from './../components/meetups/MeetupItem.module.css';
export default function FavoritesPage() {
  const { data, error, isLoading } = useFavoriteMeetups();

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <section>
      <h1>Favorites Page</h1>

      <ul className={classes.list}>
        {data.map(meetup => (
          <MeetupItem key={meetup.id} meetup={meetup} />
        ))}
      </ul>
    </section>
  );
}
