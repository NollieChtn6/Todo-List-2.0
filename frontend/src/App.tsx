import { Router } from "./Router";
import { match } from "ts-pattern";
import { Homepage } from "./pages/HomePage";
import { Button } from "primereact/button";

function App() {
	const route = Router.useRoute(["Home"]);
	return (
		<>
			{match(route)
				.with({ name: "Home" }, () => <Homepage />)
				.otherwise(() => (
					<h1 className="m-auto">Oops! Not found!</h1>
				))}
			<Button>This is a test</Button>
		</>
	);
}

export default App;
