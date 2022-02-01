import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import Custom from "./components/layout/Custom";
import ConfirmForm from "./components/auth/ConfirmForm";
function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/login"
					element={
						<Layout>
							<LoginForm />
						</Layout>
					}
				></Route>
				<Route
					path="/confirm"
					element={
						<Layout>
							<ConfirmForm />
						</Layout>
					}
				></Route>
        		<Route
					path="/"
					element={
						<Layout>
						
						</Layout>
					}
				></Route>
			</Routes>
		</Router>
	);
}

export default App;
