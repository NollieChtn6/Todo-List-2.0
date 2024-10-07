import { useEffect } from "react";

import { Router } from "./Router";
import { match } from "ts-pattern";
import { Homepage } from "./pages/HomePage";

import { useTasksStore } from "./store/taskStore";
import { useTagsStore } from "./store/tagStore";

function App() {
	const route = Router.useRoute(["Home"]);
	const fetchTasks = useTasksStore((state) => state.fetchTasks);
	const fetchTags = useTagsStore((state) => state.fetchTags);

	useEffect(() => {
		const loadData = async () => {
			await fetchTasks();
			await fetchTags();
		};
		loadData();
	}, [fetchTasks, fetchTags]);

	return (
		<>
			{/* <h1>My todo list</h1> */}
			{match(route)
				.with({ name: "Home" }, () => <Homepage />)
				.otherwise(() => (
					<h1 className="m-auto">Oops! Not found!</h1>
				))}
		</>
	);
}

export default App;
