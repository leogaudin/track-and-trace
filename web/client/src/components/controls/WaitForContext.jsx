import { useContext } from "react";
import Loading from "../customisation/Loading";
import AppContext from "../../context/AppContext";

export default function WaitForContext({ children }) {
	const {loading} = useContext(AppContext);
	if (loading) return <Loading />;
	return children;
}
