import React from 'react';
import QRCode from 'qrcode-svg';
import { saveAs } from 'file-saver';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const HTMLExport = ({ objects, folderName = 'Documents', itemName = 'Item' }) => {
  const { t } = useTranslation();
  const htmlContent = (objects) => {
    const pages = objects.map((object) => {
      const { school, project, division, district, zone, institutionType, htName, htPhone, createdAt, id } = object;

      const qrCode = new QRCode({
        content: 'tnt://' + id,
        width: 300,
        height: 300,
        padding: 0,
        color: '#000000',
        background: '#ffffff',
        ecl: 'H',
      });

      let qrCodeSvg = qrCode.svg();
      qrCodeSvg = qrCodeSvg.replace(/ style="fill:#000000;shape-rendering:crispEdges;"/g, '');

      return `
        <div class="page">
          <div class="document-container">
            <div class="content-wrapper">
              <div class="info-container">
                <div class="info-heading">${t('informations')}</div>
                <div class="info-row">
                  <span class="info-label">${t('recipient')}:</span>
                  <span class="info-value">${school}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">${t('project')}:</span>
                  <span class="info-value">${project}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">${t('division')}:</span>
                  <span class="info-value">${division}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">${t('district')}:</span>
                  <span class="info-value">${district}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">${t('zone')}:</span>
                  <span class="info-value">${zone}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">${t('institutionType')}:</span>
                  <span class="info-value">${institutionType}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">${t('personInCharge')}:</span>
                  <span class="info-value">${htName}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">${t('phone')}:</span>
                  <span class="info-value">${htPhone}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">${t('created')}:</span>
                  <span class="info-value">${new Date(createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div class="qrcode-container">
                ${qrCodeSvg}
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
        {t('download', {item: "HTML"})}
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
    color: #000000;
  }
  .page {
    page-break-before: always;
    page-break-after: always;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .document-container {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: #ffffff;
    width: 8.27in;
    height: 4in;
  }
  .content-wrapper {
    display: flex;
    align-items: center;
    max-width: 800px;
    background-color: #ffffff;
    border-radius: 4px;
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
