import styles from "./styles.module.css";
import React, { Fragment, useEffect, useState } from "react";
import Movie from "../Movie/Movie"
import { Link } from "react-router-dom";
import ReactLoading from 'react-loading';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Main = () => {
	//const {data}= getMovieQuery();
	
	const [movie2, setMovie2] = useState([]);
	const [isLoading, setLoading] = useState(true)

	const [name, setName] = useState([""]);
	const navigate = useNavigate();
	const [cookies, setCookie, removeCookie] = useCookies([]);
	const verifyUser = async () => {
		if (!cookies.jwt) {
		  navigate("/login");
		} else {
		  const { data } = await axios.post("/_users/check", {},	{
			  withCredentials: true,
			}
			
		  );
		  console.log(data)
		  if (!data.status) {
			removeCookie("jwt");
			navigate("/login");
		  } else{
			console.log(data)
			setName(data.user);
			toast(`Hello ${data.user} `, {
			  theme: "dark",
			});
		} 
		}
	  };
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

	useEffect( () => {
		verifyUser()
		getMovieQuery();
		if(isLoading){
			setTimeout(function(){
			setLoading(false);
		}, 1000);
	}
	},[cookies,navigate,removeCookie]);


	
	const handleLogout = () => {
		removeCookie("jwt");

		localStorage.clear();
		//window.location.reload();
		//navigate("/login");
		window.location = "/login";

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
				<p className="welcomemessage">Welcome {name}</p>
				<Link to="/AddMovie">
						<button type="button" className={styles.newPost_btn}>
							New MOVIE
						</button>
					</Link>
				
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			{isLoading ?  
						<div className={styles.load}>

			<ReactLoading type={"balls"} color="#46A1D4" />
			</div>
			 :


			<div className={styles.body}>
				<div className={styles.movie}>
					{movie2.map((movie2) => {
						return <Movie key={movie2._id} movie={movie2}/>;
					})}
				</div>
			</div>
			
			}
		</div>




	);
};
export default Main;
