import {FC} from "react";
import { Box, Typography } from "@mui/material";
import Task, {TaskStatus} from "../../interfaces/task.interface.ts";

interface Props {
	task: Task;
}

const TaskItem: FC<Props> = ({ task }) => {

	return (
		<Box>
			<Typography variant="body2">
				Task: {task.description}
			</Typography>
			{task.status === TaskStatus.NOT_STARTED && (
				<Typography variant="body2" color="secondary">
					Not started yet
				</Typography>
			)}
			{task.status === TaskStatus.IN_PROGRESS && (
				<Typography variant="body2" color="primary">
					In progress...
				</Typography>
			)}
			{task.status === TaskStatus.COMPLETED && (
				<Typography variant="body2" sx={{ color: 'green' }}>
					Done ✅
				</Typography>
			)}
		</Box>
	);
};

export default TaskItem;
