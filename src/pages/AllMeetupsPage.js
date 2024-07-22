import MeetupItem from "../components/meetups/MeetupItem";
import { useMeetupData } from "../util-hooks/useMeetupData";
import classes from "./../components/meetups/MeetupList.module.css";

export default function AllMeetupsPage() {

  const { data, error, isLoading } = useMeetupData()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error:{error.message}</p>
  return (
    <section>
      <h1>All Meetups</h1>
      <ul className={classes.list}>
        {data.map(meetup => (<MeetupItem key={meetup.id} meetup={meetup} />))}
      </ul>
    </section>
  );
}
