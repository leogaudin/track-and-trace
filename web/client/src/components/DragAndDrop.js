import React, { useState } from 'react';
import { handleCSV } from '../service/csv';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';

export default function DragAndDrop() {
	const [hover, setHover] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [results, setResults] = useState([]);

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
		handleCSV(e.dataTransfer.files, setUploadProgress, results, setResults);
		setHover(false);
		e.stopPropagation();
	};

	console.log(results);

	return (
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
			{isLoading ?
				(
					<CircularProgressWithLabel color='success' value={uploadProgress * 100} />
				) :
				(
					<p>Drag files here to upload</p>
				)
			}
		</div>
	);
};
