import React from 'react';
import QRCode from 'qrcode-svg';
import { saveAs } from 'file-saver';
import { Button } from '@mui/material';

const HTMLExport = ({ objects, folderName = 'Documents', itemName = 'Item' }) => {
  const htmlContent = (objects) => {
    const pages = objects.map((object) => {
      const { school, project, division, district, zone, institutionType, htName, htPhone, createdAt, id } = object;

      const qrCode = new QRCode({
        content: 'tnt://' + object.id,
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

      return `
        <div class="page">
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
        </div>
      `;
    });

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            ${htmlStyles}
          </style>
        </head>
        <body>
          ${pages.join('')}
        </body>
      </html>
    `;
  };

  const downloadDocuments = () => {
    const htmlContentString = htmlContent(objects);
    const blob = new Blob([htmlContentString], { type: 'text/html;charset=utf-8' });
    saveAs(blob, `${folderName}.html`);
  };

  return (
    <div>
      <Button variant={'contained'} color='success' size='large' onClick={downloadDocuments}>
        Download HTML
      </Button>
    </div>
  );
};

const htmlStyles = `
  body {
    font-family: sans-serif, Helvetica Neue, Helvetica, Arial;
    margin: 0;
    padding: 0;
    font-weight: 100;
    color: #8E8E8E;
  }
  .page {
    page-break-after: always;
  }
  .document-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    background-color: #ffffff;
  }
  .content-wrapper {
    display: flex;
    align-items: center;
    max-width: 800px;
    background-color: #ffffff;
    border-radius: 4px;
    padding: 20px;
  }
  .info-container {
    flex: 1;
  }
  .info-heading {
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
