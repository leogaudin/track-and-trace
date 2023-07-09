import React from 'react';
import QRCode from 'qrcode-svg';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Button } from '@mui/material';

const HTMLExport = ({ objects, folderName = 'Documents', itemName = 'Item' }) => {
  const generateHTML = (object) => {
    const qrCode = new QRCode({
      content: object.id,
      width: 150,
      height: 150,
      padding: 0,
      color: '#000000',
      background: '#ffffff',
      ecl: 'H',
    });

    let qrCodeSvg = qrCode.svg();
    qrCodeSvg = qrCodeSvg.replace(/<rect/g, '<rect rx="7"');
    qrCodeSvg = qrCodeSvg.replace(/ style="fill:#000000;shape-rendering:crispEdges;"/g, '');

    return htmlContent(object, qrCodeSvg);
  };

  const downloadDocuments = () => {
    const zip = new JSZip();
    const promises = objects.map((object, index) => {
      const htmlContent = generateHTML(object);
      const fileName = `${itemName}-${object.id}.html`;
      zip.file(fileName, htmlContent);
    });

    Promise.all(promises).then(() => {
      zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 9 } })
        .then((content) => {
          saveAs(content, `${folderName}.zip`);
        })
        .catch((error) => {
          console.error('Failed to generate ZIP file:', error);
        });
    });
  };

  return (
    <div>
      <Button variant={'contained'} color='success' size='large' onClick={downloadDocuments}>
        Download ZIP
      </Button>
    </div>
  );
};

const htmlContent = (object, qrCodeSvg) => {
  const { school, project, division, district, zone, institutionType, htName, htPhone, createdAt, id } = object;

  return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            ${htmlStyles}
          </style>
        </head>
        <body>
          <div class="document-container">
            <div class="content-wrapper">
              <div class="info-container">
                <div class="info-heading">Informations</div>
                <div class="info-row">
                  <span class="info-label">Recipient:</span>
                  <span class="info-value">${school}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Project:</span>
                  <span class="info-value">${project}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Division:</span>
                  <span class="info-value">${division}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">District:</span>
                  <span class="info-value">${district}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Zone:</span>
                  <span class="info-value">${zone}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Institution Type:</span>
                  <span class="info-value">${institutionType}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Person in Charge:</span>
                  <span class="info-value">${htName}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Phone:</span>
                  <span class="info-value">${htPhone}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Created:</span>
                  <span class="info-value">${new Date(createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div class="qrcode-container">
                ${qrCodeSvg}
                <div class="qrcode-value">${id}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
};

const htmlStyles = `
	  body {
		font-family: sans-serif, Helvetica Neue, Helvetica, Arial;
		margin: 0;
		padding: 0;
    font-weight: 100;
	  }
	  .document-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		padding: 20px;
		box-sizing: border-box;
		background-color: #f5f5f5;
	  }
	  .content-wrapper {
		display: flex;
		align-items: center;
		max-width: 800px;
		background-color: #ffffff;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		padding: 20px;
	  }
	  .info-container {
		flex: 1;
	  }
	  .info-heading {
		color: #424242;
		font-size: 12px;
		text-transform: uppercase;
		margin-bottom: 10px;
    font-weight: 100;
	  }
	  .info-row {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	  }
	  .info-label {
		font-weight: normal;
		flex: 0 0 120px;
	  }
	  .info-value {
		flex-grow: 1;
	  }
	  .qrcode-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 20px;
	  }
	  .qrcode-value {
		font-family: 'Consolas', 'Monaco', 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New';
		font-size: 0.7rem;
		margin-top: 5px;
	  }
	`;

export default HTMLExport;
