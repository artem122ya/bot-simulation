import React, { useState } from "react"
import { Box, Typography, TextField, Button, Paper } from "@mui/material"
import {useCreateBot} from "../../queries/useCreateBot.ts";
import {useQueryClient} from "@tanstack/react-query";


const CreateBot: React.FC = () => {
	const queryClient = useQueryClient();
	const createBotMutation = useCreateBot();

	const [botName, setBotName] = useState("");

	const handleCreateBot = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!botName.trim()) {
			return;
		}

		await createBotMutation.mutateAsync({ name: botName });
		setBotName("");
		queryClient.refetchQueries({ queryKey: ['bots'] });
	};



	return (
		<Paper elevation={3} sx={{ padding: 3, height: 'fit-content' }}>
			<Typography variant="h6" gutterBottom>
				New Bot
			</Typography>
			<Box component="form" onSubmit={handleCreateBot} sx={{ display: "flex", gap: 2 }}>
				<TextField
					fullWidth
					label="Bot Name"
					variant="outlined"
					value={botName}
					onChange={(e) => setBotName(e.target.value)}
					disabled={createBotMutation.isPending}
				/>
				<Button type="submit" variant="contained" loading={createBotMutation.isPending} sx={{ minWidth: 120 }}>
					Create
				</Button>
			</Box>
		</Paper>
	);
};

export default CreateBot;

