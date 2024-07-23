import { useToggleFavorite } from "../../util-hooks/useMeetupData";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

export default function MeetupItem({ meetup }) {
  const mutation = useToggleFavorite();

  const handleFavoriteClick = () => {
    mutation.mutate({ id: meetup.id, currentStatus: meetup.favorite })
  }

  return (
    <li className={classes.item} data-testid='meet-up-item'>
      <Card>
        <div className={classes.image}>
          <img src={meetup.image} alt={meetup.title} />
        </div>
        <div className={classes.content}>
          <h3>{meetup.title}</h3>
          <address>{meetup.address}</address>
          <p>{meetup.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={handleFavoriteClick}>
            {meetup.favorite ? 'Remove from favorites' : 'Add to favorites'}
          </button>
        </div>
      </Card>
    </li>
  );
}
