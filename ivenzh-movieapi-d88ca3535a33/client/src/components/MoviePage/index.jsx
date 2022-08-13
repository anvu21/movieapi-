import styles from "./styles.module.css";
import MovieList from "../MovieList/MovieList"
import React, { Fragment, useEffect, useState } from "react";

import Movie from "../Movie/Movie"
import { Link } from "react-router-dom";

const MoviePage = () => {
	//const {data}= getMovieQuery();
	
	const [movie2, setMovie2] = useState([]);
	const [isLoading, setLoading] = useState(true)

	const getMovieQuery = async () => {
		try {
			const response = await fetch("/movies");
			const jsonData = await response.json();
			//console.log("test");
			//console.log(jsonData);
			setMovie2(jsonData);
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		getMovieQuery();
		setLoading(false);
	});


	const handleUser= () =>{
		//const theLoggedUser = getUser(user)
		//return theLoggedUser.username
		return (localStorage.getItem("name"))
	}
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const handleNewMovie = () => {
		console.log(movie2)
		console.log(movie2._id)
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

			
			
			
		</div>
	);
};
//<MovieList movies={"e"}/> <MovieList movies={movie2}/>
export default MoviePage;
