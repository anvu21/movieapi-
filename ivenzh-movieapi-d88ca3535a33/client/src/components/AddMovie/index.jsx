import styles from "./styles.module.css";
import MovieList from "../MovieList/MovieList"
import React, { Fragment, useEffect, useState } from "react";
import InputMovie from "./InputMovie"
import Movie from "../Movie/Movie"
import { Link } from "react-router-dom";

const AddMovie = () => {
	//const {data}= getMovieQuery();
	const [inputFields, setInputFields] = useState([
		{
		link_url: "",
		cover_url: "",
		  title: "",
		  genres: [],
		  __v: 0,
		  rating: 0,
		  description: "",
		},
	  ]);
	  const { link_url, cover_url, title, genres, __v, rating, description } = inputFields;
	  const options = [];


	  
	const [movie2, setMovie2] = useState([]);
	const [isLoading, setLoading] = useState(true)

	

	useEffect(() => {
		
	});

	
	const handleUser= () =>{
		//const theLoggedUser = getUser(user)
		//return theLoggedUser.username
		return (localStorage.getItem("name"));
	}
  
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const handleNewMovie = () => {
		console.log(movie2);
		console.log(movie2._id);
		//localStorage.removeItem("token");
		//window.location.reload();
	};



	return (
		<div >
			<nav className={styles.navbar}>
        <Link to="/">
          <button type="button" className={styles.newPost_btn}>
            MovieApi
          </button>
        </Link>
        
        <p className="welcomemessage">Welcome {handleUser()}</p>

        <Link to="/AddMovie">
          <button type="button" className={styles.newPost_btn}>
            New MOVIE
          </button>
        </Link>
          
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
			</nav>

		  <InputMovie />
		</div>
	);
};
//<MovieList movies={"e"}/> <MovieList movies={movie2}/>
export default AddMovie;
