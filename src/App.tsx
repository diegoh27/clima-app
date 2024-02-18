import { Box, Container, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import "./app.css";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import { Clima } from "./utils/interfaces/iterfaces";

import { useSnackbar } from "notistack";

interface Error {
	message: string;
}

function App() {
	const key = import.meta.env.VITE_CLIMA_KEY;

	const { enqueueSnackbar } = useSnackbar();

	const [ciudad, setCiudad] = useState<string>("");
	const [clima, setClima] = useState<Clima>();
	const [loading, setLoading] = useState<boolean>(false);
	const [errorClima, setErrorClima] = useState({
		error: false,
		message: "",
	});

	// const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${key}&lang=es&q=${ciudad}`;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCiudad(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		if (!ciudad.trim()) {
			setErrorClima({
				error: true,
				message: "El campo es obligatorio",
			});
			return handleError({ message: "El campo es obligatorio" });
		} else {
			axios
				.get(
					`https://api.weatherapi.com/v1/current.json?key=${key}&lang=es&q=${ciudad}`
				)
				.then((response) => response.data)
				.then((data) => {
					setClima(data);
					setLoading(false);
					setErrorClima({
						error: false,
						message: "",
					});
				})
				.catch((error) => {
					console.log(error);
					handleError({ message: "No se encontró esa ciudad" });
				});
		}
	};

	const handleError = (error: Error) => {
		console.log(error);
		setLoading(false);
		enqueueSnackbar(error.message, {
			variant: "error",
			anchorOrigin: {
				vertical: "top",
				horizontal: "right",
			},
		});
	};

	console.log("clima", clima);

	return (
		<div className="fondo">
			<Container
				maxWidth="xs"
				sx={{
					mt: 2,
				}}
			>
				<Typography
					variant="h3"
					component={"h1"}
					align="center"
					gutterBottom
				>
					Clima App
				</Typography>
				<Box
					sx={{
						display: "grid",
						gap: 2,
					}}
					component={"form"}
					autoComplete="off"
					onSubmit={handleSubmit}
				>
					<TextField
						id="ciudad"
						label="Ciudad"
						value={ciudad}
						required
						size="small"
						fullWidth
						onChange={handleChange}
						error={errorClima.error}
						helperText={errorClima.message}
					/>
					<LoadingButton
						type="submit"
						variant="contained"
						loading={loading}
						loadingIndicator="Cargando..."
					>
						Buscar
					</LoadingButton>
				</Box>

				{clima?.location && (
					<Box
						sx={{
							mt: 2,
							display: "grid",
							gap: 2,
							textAlign: "center",
						}}
					>
						<Typography
							variant="h4"
							component="h2"
						>
							{clima?.location.name}, {clima?.location.country}
						</Typography>
						<Box
							component="img"
							alt={clima?.current.condition.text}
							src={clima?.current.condition.icon}
							sx={{ margin: "0 auto", width: "100px", height: "100px" }}
						/>
						<Typography
							variant="h5"
							component="h3"
						>
							{clima?.current.temp_c} °C
						</Typography>
						<Typography
							variant="h6"
							component="h4"
						>
							{clima?.current.condition.text}
						</Typography>
					</Box>
				)}

				<Typography
					textAlign="center"
					sx={{ mt: 2, fontSize: "20px" }}
				>
					Powered by:{" "}
					<a
						href="https://www.weatherapi.com/"
						title="Weather API"
						target="_blank"
					>
						WeatherAPI.com
					</a>
				</Typography>
			</Container>
		</div>
	);
}

export default App;
