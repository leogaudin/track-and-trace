import React, { useState } from 'react';
import { handleCSV } from '../service/csv';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
import UploadSummary from '../components/UploadSummary';
import { Dialog, DialogContent } from "@mui/material";

export default function Upload({ open, setOpen }) {
	const [hover, setHover] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [results, setResults] = useState([]);
	const [isComplete, setComplete] = useState(false);

	const handleDragEnter = e => {
		e.preventDefault();
		setHover(true);
		e.stopPropagation();
	};

	const handleDragLeave = e => {
		e.preventDefault();
		setHover(false);
		e.stopPropagation();
	};

	const handleDragOver = e => {
		e.preventDefault();
		setHover(true);
		e.stopPropagation();
	};

	const handleDrop = e => {
		e.preventDefault();
		setIsLoading(true);
		handleCSV(e.dataTransfer.files, setUploadProgress, setResults, setIsLoading, setComplete);
		setHover(false);
		e.stopPropagation();
	};

	function handleClose() {
		setOpen(false);
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			scroll='paper'
			keepMounted={false}
			maxWidth
		>
			<DialogContent>
				<div
					className={'drag-drop-zone'}
					style={{
						minWidth: '25rem',
						minHeight: '25rem',
						backgroundColor: hover ? '#0B71E7' : 'white',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column'
					}}
					onDrop={e => handleDrop(e)}
					onDragOver={e => handleDragOver(e)}
					onDragEnter={e => handleDragEnter(e)}
					onDragLeave={e => handleDragLeave(e)}
				>
					{isLoading && !isComplete ?
						(
							<CircularProgressWithLabel color='success' value={uploadProgress * 100} />
						) :
						null
					}
					{!isLoading && isComplete ?
						<UploadSummary results={results} open={open} setOpen={setOpen} />
						: null
					}
					{
						!isLoading && !isComplete
							? <p>Drag files here to upload</p>
							: null
					}
				</div>
			</DialogContent>
		</Dialog>
	);
}
