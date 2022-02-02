import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import ConfirmForm from "./components/auth/ConfirmForm";
import PrivateRoute from "./components/route/PrivateRoute";
import NftDashboard from "./components/dashboard/NftDashboard";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					exact path="/"
					element={
						<Layout>
							<LoginForm />
						</Layout>
					}
				></Route>
				<Route
					exact path="/confirm"
					element={
						<Layout>
							<ConfirmForm />
						</Layout>
					}
				></Route>
				<Route
					exact path="/dashboard"
					element={
						<PrivateRoute>				
						<Layout>
							<NftDashboard/>
						</Layout>
						</PrivateRoute>
					}
				
					
				></Route>
        		
			</Routes>
		</Router>
	);
}

export default App;
