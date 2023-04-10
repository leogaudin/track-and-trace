import React, { useState } from 'react';
import { handleCSV } from '../service/csv';

export default function DragAndDrop() {
	const [hover, setHover] = useState(false);
	const [counter, setCounter] = useState(0);
	const [lines, setLines] = useState(0)

	function incrementCounter() {
		setCounter(counter => counter + 1);
	}

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
		handleCSV(e.dataTransfer.files, incrementCounter, setLines);
		setHover(false);
		e.stopPropagation();
	};
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
			<p>Drag files here to upload</p>
			<p>{counter}/{lines} uploaded</p>
		</div>
	);
};
