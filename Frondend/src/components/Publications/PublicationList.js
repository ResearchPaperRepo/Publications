import classes from "./PublicationList.module.css";
import PublicationItem from "./PublicationItem";
import { Fragment, useEffect, useState } from "react";
import NewPublication from "./NewPublication";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";

function PublicationList() {
  const [publications, setPublications] = useState([]);
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const token = sessionStorage.getItem("publications_token");
    if (token) {
      setLoggedIn(true);
    }
    const fetchPublications = async () => {
      const response = await fetch("http://localhost:5000/api/v1/docs");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      setPublications(responseData["documents"]);
    };

    fetchPublications().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <Fragment>
      {loggedIn && <NewPublication></NewPublication>}

      <ul className={classes.list}>
        {publications.map((publication) => (
          <PublicationItem
            key={publication.id}
            image={publication.image}
            title={publication.title}
            pdf_link={publication.pdf_link}
            authors={publication.authors}
            keywords={publication.keywords}
            abstract={publication.abstract}
            file_name={publication.fileName}
          />
        ))}
      </ul>
    </Fragment>
  );
}

export default PublicationList;
