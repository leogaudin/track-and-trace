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
    if (!isLoading)
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

  const dragDropZoneStyles = {
    minWidth: '25rem',
    minHeight: '25rem',
    backgroundColor: hover ? '#10B981' : '#fff',
    borderRadius: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const uploadFileInputStyles = {
    display: 'none',
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll='paper'
      keepMounted={false}
      maxWidth
    >
      <DialogContent>
        {!isComplete ? (
          <div
            className={isLoading ? null : 'drag-drop-zone'}
            style={dragDropZoneStyles}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
          >
            <input
              type='file'
              id='file'
              ref={inputFile}
              onChange={onChangeFile}
              style={uploadFileInputStyles}
              accept='.csv'
            />
            {isLoading ? (
              <CircularProgressWithLabel
                color='success'
                value={uploadProgress * 100}
              />
            ) : (
              <Typography variant='overline'>
                {hover ? "Drop!" : "Click or Drag files here to upload"}
              </Typography>
            )}
          </div>
        ) : (
          <UploadSummary results={results} open={open} setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
}
