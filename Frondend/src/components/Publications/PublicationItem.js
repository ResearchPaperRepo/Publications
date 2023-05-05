import Card from "../UI/Card";
import classes from "./PublicationItem.module.css";

function PublicationItem(props) {
  return (
    <Card>
      <li className={classes.item}>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>Title:</h3>
          <p className={classes.title}>{props.title}</p>
          <p>
            <b>Authors:</b>
          </p>
          <ul className={classes.list}>
            {props.authors.map((author) => (
              <li key={author}>{author}</li>
            ))}
          </ul>
          <b>Abstract:</b>
          <div className={classes.abstractContent}>
            <p className={classes.abstract}>{props.abstract}</p>
            <input className={classes.expand_btn} type="checkbox"></input>
          </div>
          <p>
            <b>Keywords:</b>
          </p>
          <ul className={classes.list}>
            {props.keywords.map((keyword) => (
              <li key={keyword}>{keyword}</li>
            ))}
          </ul>
          <a href={props.pdf_link} target="_blank" className={classes.pdf_link}>
            <button className={classes.button}>
              {props.file_name.slice(0, -5)} PDF
            </button>
          </a>
        </div>
      </li>
    </Card>
  );
}

export default PublicationItem;
