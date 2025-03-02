import {Box, Typography} from "@mui/material";
import {FC} from "react";
import TaskItem from "./TaskItem.tsx";
import BotWithTasks from "../../interfaces/bot-with-tasks.interface.ts";

interface Props {
	bot: BotWithTasks;
}

const BotItem: FC<Props>  = ({ bot }) => {
	return (
		<Box sx={{my: 2}}>
			<Typography variant="subtitle1">
				Bot name: {bot.name}
			</Typography>
			<Box sx={{ml: 1}}>
				{bot.tasks.map((task, i) => (
					<TaskItem key={i} task={task} />
				))}
			</Box>
		</Box>
	);
}

export default BotItem;
