import classes from "./PublicationList.module.css";
import PublicationItem from "./PublicationItem";
import { useEffect, useState } from "react";

function PublicationList() {
  const [publications, setPublications] = useState([]);
  useEffect(() => {
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
  );
}

export default PublicationList;
