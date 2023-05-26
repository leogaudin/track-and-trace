import * as React from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import BoxInfo from './BoxInfo';
import { Button } from '@mui/material';

const PDFGenerator = ({data}) => {
  const pdfExportComponent = React.useRef(null);

  return (
<div>
	<Button
		variant={'contained'}
		color='success'
		onClick={() => {
			pdfExportComponent.current?.save();
		}}
	>
		Download PDF
	</Button>
	<PDFExport forcePageBreak=".page-break" ref={pdfExportComponent}>
		<div style={{display: 'hidden'}}>
			{data.map((box, index) => (
				<div className={index > 0 ? "page-break" : null} key={box.id}>
					<BoxInfo boxData={box} width={600} height={337}/>
				</div>
			))}
		</div>
	</PDFExport>
</div>
	);
};

export default PDFGenerator;
