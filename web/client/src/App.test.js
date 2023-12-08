// FILEPATH: /Users/leogaudin/Documents/Repositories/track-and-trace/web/client/App.test.jsx
import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import App from './App';
import AppContext, { AppProvider } from './context/AppContext';
import { createTheme } from './theme/index';
import BoxesOverview from './components/BoxesOverview';
import { ThemeProvider } from '@mui/material';
import { theme } from './App';
import ScansOverview from './components/ScansOverview';

const boxes = [
	{
	   "_id":"6549f758accfeff2f215d179",
	   "id":"500182",
	   "project":"Math books",
	   "division":"CEED",
	   "district":"Dowa",
	   "zone":"Chigudu",
	   "school":"Chamwavi",
	   "htName":"Brighton Kumichira",
	   "htPhone":"996626821",
	   "institutionType":"Co-Educational (Mixed)",
	   "adminId":"4e25b5c881dc4040a3512d542dcf43486063644126e70c1cc25c70ba95fb0d84b74377be077706f24107da04a2a9682853be90ece787529113c9d62a1e01067a",
	   "createdAt":"2023-11-07T08:37:40.604Z",
	   "scans":[

	   ],
	   "__v":0
	},
	{
	   "_id":"6549f758accfeff2f215d17a",
	   "id":"500596",
	   "project":"Math books",
	   "division":"CEED",
	   "district":"Dowa",
	   "zone":"Chigudu",
	   "school":"Chibanzi",
	   "htName":"Benson Thaulo",
	   "htPhone":"999341152",
	   "institutionType":"Co-Educational (Mixed)",
	   "adminId":"4e25b5c881dc4040a3512d542dcf43486063644126e70c1cc25c70ba95fb0d84b74377be077706f24107da04a2a9682853be90ece787529113c9d62a1e01067a",
	   "createdAt":"2023-11-07T08:37:40.604Z",
	   "scans":[
		  {
			 "boxId":"500596",
			 "comment":"",
			 "id":"28720b03bfa3e47b8e9820e557e70cc5",
			 "operatorId":"+33742424243",
			 "location":{
				"mocked":false,
				"timestamp":1701101900326,
				"extras":{
				   "networkLocationType":"wifi"
				},
				"coords":{
				   "speed":0,
				   "heading":0,
				   "altitude":53.70000076293945,
				   "accuracy":18.459999084472656,
				   "longitude":-4.4372894,
				   "latitude":36.7081209
				}
			 },
			 "countryName":"Peninsular Spain",
			 "time":1701101913244,
			 "finalDestination":false
		  }
	   ],
	   "__v":0
	},
	{
	   "_id":"6549f758accfeff2f215d17b",
	   "id":"501115",
	   "project":"Math books",
	   "division":"CEED",
	   "district":"Dowa",
	   "zone":"Chigudu",
	   "school":"Chigudu",
	   "htName":"Michael Kanthumaso",
	   "htPhone":"999724880",
	   "institutionType":"Co-Educational (Mixed)",
	   "adminId":"4e25b5c881dc4040a3512d542dcf43486063644126e70c1cc25c70ba95fb0d84b74377be077706f24107da04a2a9682853be90ece787529113c9d62a1e01067a",
	   "createdAt":"2023-11-07T08:37:40.604Z",
	   "scans":[

	   ],
	   "__v":0
	},
	{
	   "_id":"6549f758accfeff2f215d17c",
	   "id":"501307",
	   "project":"Math books",
	   "division":"CEED",
	   "district":"Dowa",
	   "zone":"Chigudu",
	   "school":"Chikudzo",
	   "htName":"Amos Chilangizo",
	   "htPhone":"991046304",
	   "institutionType":"Co-Educational (Mixed)",
	   "adminId":"4e25b5c881dc4040a3512d542dcf43486063644126e70c1cc25c70ba95fb0d84b74377be077706f24107da04a2a9682853be90ece787529113c9d62a1e01067a",
	   "createdAt":"2023-11-07T08:37:40.604Z",
	   "scans":[

	   ],
	   "__v":0
	},
	{
	   "_id":"6549f758accfeff2f215d17d",
	   "id":"501378",
	   "project":"Math books",
	   "division":"CEED",
	   "district":"Dowa",
	   "zone":"Chigudu",
	   "school":"Jidi",
	   "htName":"Hazwell Jumbe",
	   "htPhone":"999766157",
	   "institutionType":"Co-Educational (Mixed)",
	   "adminId":"4e25b5c881dc4040a3512d542dcf43486063644126e70c1cc25c70ba95fb0d84b74377be077706f24107da04a2a9682853be90ece787529113c9d62a1e01067a",
	   "createdAt":"2023-11-07T08:37:40.604Z",
	   "scans":[

	   ],
	   "__v":0
	},
	{
	   "_id":"6549f758accfeff2f215d17e",
	   "id":"501403",
	   "project":"Math books",
	   "division":"CEED",
	   "district":"Dowa",
	   "zone":"Chigudu",
	   "school":"Kapatamoyo",
	   "htName":"Sakala Chimkwasale",
	   "htPhone":"O995526448",
	   "institutionType":"Co-Educational (Mixed)",
	   "adminId":"4e25b5c881dc4040a3512d542dcf43486063644126e70c1cc25c70ba95fb0d84b74377be077706f24107da04a2a9682853be90ece787529113c9d62a1e01067a",
	   "createdAt":"2023-11-07T08:37:40.604Z",
	   "scans":[

	   ],
	   "__v":0
	},
	{
	   "_id":"6549f758accfeff2f215d17f",
	   "id":"501872",
	   "project":"Math books",
	   "division":"CEED",
	   "district":"Dowa",
	   "zone":"Chigudu",
	   "school":"Maiwe",
	   "htName":"Gladson Gopani",
	   "htPhone":"999919410",
	   "institutionType":"Co-Educational (Mixed)",
	   "adminId":"4e25b5c881dc4040a3512d542dcf43486063644126e70c1cc25c70ba95fb0d84b74377be077706f24107da04a2a9682853be90ece787529113c9d62a1e01067a",
	   "createdAt":"2023-11-07T08:37:40.604Z",
	   "scans":[

	   ],
	   "__v":0
	}
 ];

const scans = [
	{
	   "boxId":"500596",
	   "comment":"",
	   "id":"28720b03bfa3e47b8e9820e557e70cc5",
	   "operatorId":"+33742424243",
	   "location":{
		  "mocked":false,
		  "timestamp":1701101900326,
		  "extras":{
			 "networkLocationType":"wifi"
		  },
		  "coords":{
			 "speed":0,
			 "heading":0,
			 "altitude":53.70000076293945,
			 "accuracy":18.459999084472656,
			 "longitude":-4.4372894,
			 "latitude":36.7081209
		  }
	   },
	   "countryName":"Peninsular Spain",
	   "time":1701101913244,
	   "finalDestination":false
	},
	{
	   "boxId":"500596",
	   "comment":"",
	   "id":"28720b03bfa3e47b8e9820e557e70cc5",
	   "operatorId":"+33742424243",
	   "location":{
		  "mocked":false,
		  "timestamp":1701101900326,
		  "extras":{
			 "networkLocationType":"wifi"
		  },
		  "coords":{
			 "speed":0,
			 "heading":0,
			 "altitude":53.70000076293945,
			 "accuracy":18.459999084472656,
			 "longitude":-4.4372894,
			 "latitude":36.7081209
		  }
	   },
	   "countryName":"Peninsular Spain",
	   "time":1701101913244,
	   "finalDestination":false
	},
	{
	   "boxId":"500596",
	   "comment":"",
	   "id":"28720b03bfa3e47b8e9820e557e70cc5",
	   "operatorId":"+33742424243",
	   "location":{
		  "mocked":false,
		  "timestamp":1701101900326,
		  "extras":{
			 "networkLocationType":"wifi"
		  },
		  "coords":{
			 "speed":0,
			 "heading":0,
			 "altitude":53.70000076293945,
			 "accuracy":18.459999084472656,
			 "longitude":-4.4372894,
			 "latitude":36.7081209,
			}
	   },
	   "countryName":"Peninsular Spain",
	   "time":1701101913244,
	   "finalDestination":false
	}
];

// describe('App', () => {
//   it('renders Boxes', async () => {
//     const theme = createTheme();

//     const {getByLabelText, getByRole} = render(
//       <AppProvider theme={theme} useMediaQuery={useMediaQuery}>
//         <App />
//       </AppProvider>
//     );

//     const usernameField = getByLabelText('Username');
//     const passwordField = getByLabelText('Password');
//     const submitButton = getByRole('button', { type: /submit/i });
//     await waitFor(() => {
//       fireEvent.change(usernameField, { target: { value: 'leogaudinoff@gmail.com' } });
//       fireEvent.change(passwordField, { target: { value: '123456' } });
//       fireEvent.click(submitButton);
//     });
//     await waitFor(() => {
//       expect(getByRole('heading', { name: /Boxes/i })).toBeInTheDocument();
//     });
//   });
// });

describe('Boxes', () => {
	it('render boxes when alright', async () => {
		const { getByText } = render(
			<ThemeProvider theme={theme}>
				<AppProvider theme={theme} >
					<AppContext.Provider value={{ boxes }}>
						<BoxesOverview />
					</AppContext.Provider>
				</AppProvider>
			</ThemeProvider>
		);
		await waitFor(() => {
			expect(getByText(/500182/i)).toBeInTheDocument();
			expect(getByText(/500596/i)).toBeInTheDocument();
			expect(getByText(/501115/i)).toBeInTheDocument();
		});
	});
	it('doesn\'t crash when boxes are null', async () => {
		render(
			<ThemeProvider theme={theme}>
				<AppProvider theme={theme} >
					<AppContext.Provider value={{ boxes: null }}>
						<BoxesOverview />
					</AppContext.Provider>
				</AppProvider>
			</ThemeProvider>
		);
	});
});

describe('Scans', () => {
	it('render scans when alright', async () => {
		const { getAllByText } = render(
			<ThemeProvider theme={theme}>
				<AppProvider theme={theme} >
					<AppContext.Provider value={{boxes, scans}}>
						<ScansOverview />
					</AppContext.Provider>
				</AppProvider>
			</ThemeProvider>
		);
		await waitFor(() => {
			expect(getAllByText(/500596/i)).toHaveLength(3);
		});
	});
	it('doesn\'t crash when scans are null', async () => {
		render(
			<ThemeProvider theme={theme}>
				<AppProvider theme={theme} >
					<AppContext.Provider value={{ boxes, scans: null }}>
						<ScansOverview />
					</AppContext.Provider>
				</AppProvider>
			</ThemeProvider>
		);
	});
	it('doesn\'t crash when boxes are null and you click on a scan', async () => {
		const { getAllByText } = render(
			<ThemeProvider theme={theme}>
				<AppProvider theme={theme} >
					<AppContext.Provider value={{ boxes: null, scans }}>
						<ScansOverview />
					</AppContext.Provider>
				</AppProvider>
			</ThemeProvider>
		);
		await waitFor(() => {
			const scan = getAllByText(/500596/i)[0];
			fireEvent.click(scan);
		});
	});
});
