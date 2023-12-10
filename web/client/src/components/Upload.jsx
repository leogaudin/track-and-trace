import React, { useState, useRef } from 'react';
import { handleCSV } from '../service/csv';
import CircularProgressWithLabel from './customisation/CircularProgressWithLabel';
import UploadSummary from './customisation/UploadSummary';
import { Alert, Dialog, DialogContent, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

export default function Upload({ open, setOpen }) {
  const [hover, setHover] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [isComplete, setComplete] = useState(false);
  const inputFile = useRef(null);
  const { t } = useTranslation();

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
    minHeight: '25rem',
    backgroundColor: hover ? '#10B981' : '#fff',
    borderRadius: '1rem',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const uploadFileInputStyles = {
    display: 'none',
  };

  return (
    <Dialog
      open={Boolean(open)}
      onClose={handleClose}
      scroll='paper'
      keepMounted={false}
      maxWidth='md'
    >
      <DialogContent>
        {!isComplete ? (
          <div
            className={isLoading ? null : 'drag-drop-zone'}
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
              <div style={dragDropZoneStyles}>
                <div></div>
                <Typography variant='overline'>
                  {hover ? t('drop') : t('dragPrompt')}
                </Typography>
                <div style={{paddingTop: 0, width: '100%'}}>
                <Alert severity='info' style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                    <Typography variant='body1'>
                      <b>{t('supportedTypes')}:</b> .csv
                      <br />
                      {t('csvExplanation')}
                    </Typography>
                  </Alert>
                  <Alert severity='warning' style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                    <Typography variant='body1'>
                      <b>{t('longUpload')}</b>
                    </Typography>
                  </Alert>
                </div>
              </div>
            )}
          </div>
        ) : (
          <UploadSummary results={results} open={open} setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
}
