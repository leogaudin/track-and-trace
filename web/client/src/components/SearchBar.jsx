import TextField from "@mui/material/TextField";
import "./constants/language";
import i18n from "./constants/language";

export const SearchBar = ({setSearchQuery}) => (
	<TextField
		id="search-bar"
		className="text"
		onInput={(e) => {
			setSearchQuery(e.target.value);
		}}
		label={i18n.t("search")}
		variant="filled"
		placeholder={i18n.t("search")}
		fullWidth
	/>
  );

