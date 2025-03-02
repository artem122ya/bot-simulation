import {
	Box,
	Typography,

} from "@mui/material";
import CreateBot from "../../components/CreateBot";
import BotsList from "../../components/BotsList";

const BotsPage = () => {

	return (
		<Box sx={{ padding: 3 }}>
			<Typography variant="h4" component="h1">
				Bots Simulation
			</Typography>
			<Box sx={{
				display: 'flex',
				flexDirection: {
					xs: 'column',
					sm: 'row',
				},
				gap: 2,
				marginTop: 2
			}}>
				<CreateBot />
				<BotsList />
			</Box>
		</Box>
	)
}

export default BotsPage

