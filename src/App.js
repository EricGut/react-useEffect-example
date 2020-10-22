import React, { useEffect, useState } from 'react';
import './style/App.css';

function App() {
  // we declarate where the api is
  const apiUrl = 'https://course-api.netlify.app/api/react-tours-project';

  // we create a use state for save the json api
  const [tours, setTours] = useState([]);

  // function to fetch the data from the api and use useState to push the data
  const getTours = async () => {
    const fetchTours = await fetch(apiUrl);
    const tours = await fetchTours.json();
    setTours(tours);
  }

  /* using useEffect when the page render once and initializing the getTours function 
    useEffect intializes everytime the page re-render but in this case we use '[]' to initialize just one time.
    if we remove the '[]' the app would crash.
  */
  useEffect(() => {
    getTours();
  }, []);

  // the return of the actual object
  return (
    <section>
      <div className="container">
        <h1 className="title">Available tours</h1>
        <h2 className="tours-info">There are a total of {tours.length} tours</h2>
        <div className="tours">
          {/* render the tours from the api */}
          {
            tours.map((tour) => {
              /* desctructuring tour to get all the properties */
              const { id, name, info, image, price } = tour;
              return (
                <div className="card" key={id}>
                  <div className="card__img">
                    <img src={image} alt="" />
                  </div>
                  <div className="card__info">
                    <strong className="info__name">{name}</strong>
                    <p className="info__description">{info}</p>
                    <span className="info__price">{price}€</span>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </section>
  );
}

export default App;
