import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import Custom from "./components/layout/Custom";
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
							<Custom />
						</Layout>
					}
				></Route>
        
			</Routes>
		</Router>
	);
}

export default App;
