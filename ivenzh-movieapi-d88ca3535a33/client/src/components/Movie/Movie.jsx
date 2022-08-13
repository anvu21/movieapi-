import React from 'react'
//import { Typography, Grid,Grow,Tooltip,Rating }  from '@mui/material'
//import {link} from 'react-router-dom'
import styles from "./Movie.module.css";
//import { CircularProgress } from "@mui/material";
//import { Box } from "@mui/system";

export const Movie = ({movie}) => {
    //console.log()

    

  return (
    <div className={styles.movie}>
      <h2>{movie.title}</h2>
      <img src={movie.cover_url} alt=""/>
    </div>
  )
}
export default Movie
