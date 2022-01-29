import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";

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
        
			</Routes>
		</Router>
	);
}

export default App;
