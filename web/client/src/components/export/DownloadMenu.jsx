import {Button, Menu, Tooltip} from "@mui/material";
import { downloadCSV, downloadJson } from ".";
import { useState } from "react";

export default function DownloadMenu({data, title, detail}) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (format) => {
		setAnchorEl(null);
		if (format === 'csv')
			downloadCSV(data, title);
		else if (format === 'json')
			downloadJson(data, title);
	};

	return (
		<Tooltip placement="top" title={detail} arrow>
			<Button
				variant="contained"
				color="success"
				size="large"
				onClick={handleClick}
			>
				{title}
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Button color="success" onClick={() => handleClose('csv')}>CSV</Button>
				<Button color="success" onClick={() => handleClose('json')}>JSON</Button>
			</Menu>
		</Tooltip>
	);
}
