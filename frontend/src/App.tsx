import { useEffect } from "react";

import { Router } from "./Router";
import { match } from "ts-pattern";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
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
		<body>
			<Header />
			{match(route)
				.with({ name: "Home" }, () => <Homepage />)
				.otherwise(() => (
					<h1 className="m-auto">Oops! Not found!</h1>
				))}
			<Footer />
		</body>
	);
}

export default App;
