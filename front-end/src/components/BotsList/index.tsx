import React from "react"
import {Alert, Box, CircularProgress, Divider, Paper, Typography} from "@mui/material"
import BotItem from "./BotItem.tsx";
import useBotsList from "./useBotsList.ts";


const BotsList: React.FC = () => {
	const {
		botsList,
		isLoading,
		error
	} = useBotsList();

	return (
		<Paper elevation={3} sx={{ padding: 3, flexGrow: 1 }}>
			<Typography variant="h6" gutterBottom>
				List of Bots
			</Typography>

			{isLoading && (
				<Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
					<CircularProgress />
				</Box>
			)}

			{error && (
				<Alert severity="error" sx={{ marginBottom: 2 }}>
					Failed to load bots
				</Alert>
			)}

			{botsList && botsList.length === 0 && (
				<Typography color="text.secondary" align="center" sx={{ padding: 2 }}>
					No bots found. Create your first bot above.
				</Typography>
			)}

			<Box sx={{ml: 1}}>
				{botsList?.map((bot, i) => (
					<Box key={i}>
						<BotItem bot={bot} />
						<Divider />
					</Box>
				))}
			</Box>
		</Paper>
	);
};

export default BotsList;
