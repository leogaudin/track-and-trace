import TextField from "@mui/material/TextField";

export const SearchBar = ({setSearchQuery}) => (
	<TextField
		id="search-bar"
		className="text"
		onInput={(e) => {
			setSearchQuery(e.target.value);
		}}
		label="Search..."
		variant="filled"
		placeholder="Search..."
		fullWidth
	/>
  );

