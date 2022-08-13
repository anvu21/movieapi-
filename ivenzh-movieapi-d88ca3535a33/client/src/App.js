import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddMovie from "./components/AddMovie";
import MoviePage from "./components/MoviePage";
import { useCookies } from "react-cookie";

function App() {


	return (
		<Routes>
			<Route path="/" exact element={<Main />} />
			<Route path="/AddMovie" exact element={<AddMovie />} />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route  path="/MoviePage/:id"  exact element={<MoviePage />} />
			
		</Routes>
	);
}

export default App;
