import Card from "../UI/Card";
import classes from "./NewPublication.module.css";

import { Fragment, useState } from "react";

function NewPublication() {
  const [fileName, setFileName] = useState("");
  const [addPublicationIconClick, setAddPublicationIconClick] = useState(false);

  const inputFileChangeHandler = (event) => {
    const input = event.target;
    const file_name = input.files[0].name;
    if (!file_name.endsWith(".pdf")) {
      alert("Invalid File Format, Please Upload Text PDF's only");
      setFileName("");
      return;
    }
    setFileName(file_name);
  };

  const addNewPublicationHandler = () => {
    setAddPublicationIconClick(true);
  };

  const formCloseHandler = () => {
    setAddPublicationIconClick(false);
  };

  const addPublicationIcon = (
    <Card classes={classes.add_publication} onClick={addNewPublicationHandler}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="currentColor"
        class="bi bi-plus"
        viewBox="0 0 16 16"
      >
        {" "}
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
      </svg>
    </Card>
  );

  const addPublication = (
    <Card>
      <form className={classes.form}>
        <div className={classes.input_text}>
          <p>Upload New Publication ( Only Text PDF is supported )</p>
        </div>
        <div className={classes.file_input}>
          <label htmlFor="file">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-upload"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />{" "}
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />{" "}
            </svg>
          </label>
          <input
            type="file"
            id="file"
            accept="file"
            onChange={inputFileChangeHandler}
          />
          {fileName && <p>{fileName}</p>}
        </div>
        <div className={classes.button}>
          <button type="button" onClick={formCloseHandler}>
            Close
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </Card>
  );

  return (
    <Fragment>
      {!addPublicationIconClick && addPublicationIcon}{" "}
      {addPublicationIconClick && addPublication}
    </Fragment>
  );
}

export default NewPublication;
