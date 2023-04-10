import React from "react";
import DragAndDrop from "./DragAndDrop";
import { Dialog, DialogContent } from "@mui/material";

export default function Upload({ open, setOpen }) {

	function handleClose() {
		setOpen(false);
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			scroll='body'
			keepMounted={false}
			maxWidth
		>
			<DialogContent>
				<DragAndDrop />
			</DialogContent>
		</Dialog>
	);
}
