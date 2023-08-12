interface IMovieGenre {
  id?: number;
  name: string;
}

interface IMovieDetailsData {
  id: string,
  title?: string;
  poster_path?: string;
  release_date?: string;
  tagline?: string;
  genres?: IMovieGenre[];
  overview?: string;
  runtime?: number;
}

const calculateRuntime = async () => {
    let favourites: IMovieDetailsData[];
  
    try {
      const res = await fetch(`http://localhost:3000/api/favourites/all`, {
        method: "GET",
      });
      const data = await res.json();
  
      favourites = data.favourites;
    } catch (e) {
      console.log(e);
      return [];
    }
  
    const idList = favourites.map((movie) => movie.id);
  
    const promises = idList.map((movieId) =>
      fetch(`http://localhost:3000/api/runtime/${movieId}`)
    );
  
    const responses = await Promise.all(promises);
    const runtimesArray = await Promise.all(responses.map(async (response: Response) => {
      const data = await response.json();
      return data;
    }));
  
    return runtimesArray;
  };
  
  export default calculateRuntime;
  
  
  