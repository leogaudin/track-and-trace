import React, { useState, useRef } from 'react';
import { handleCSV } from '../service/csv';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
import UploadSummary from '../components/UploadSummary';
import { Dialog, DialogContent, Typography } from "@mui/material";

export default function Upload({ open, setOpen }) {
	const [hover, setHover] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [results, setResults] = useState([]);
	const [isComplete, setComplete] = useState(false);
	const inputFile = useRef(null);

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
		onChangeFile(e);
		e.stopPropagation();
	};

	const handleClick = e => {
		inputFile.current.click();
		e.stopPropagation();
	}

	const onChangeFile = e => {
		let files = [];
		e.preventDefault();
		setIsLoading(true);
		setHover(false);
		if (e.dataTransfer && e.dataTransfer.files)
			files = e.dataTransfer.files;
		else if (e.target.files)
			files = e.target.files;
		handleCSV(files, setUploadProgress, setResults, setIsLoading, setComplete);
	}

	function handleClose() {
		if (!isLoading && !isComplete)
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
						backgroundColor: hover ? '#10B981' : '#fff',
						borderRadius: '1rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column'
					}}
					onDrop={e => handleDrop(e)}
					onDragOver={e => handleDragOver(e)}
					onDragEnter={e => handleDragEnter(e)}
					onDragLeave={e => handleDragLeave(e)}
					onClick={e => handleClick(e)}
				>
					<input
						type='file'
						id='file'
						ref={inputFile}
						onChange={onChangeFile}
						style={{ display: 'none' }}
						accept='.csv'
					/>
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
							? <Typography variant='overline'>{hover ? "Drop!" : "Click or Drag files here to upload"}</Typography>
							: null
					}
				</div>
			</DialogContent>
		</Dialog>
	);
}
