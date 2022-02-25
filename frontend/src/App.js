import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import ConfirmForm from "./components/auth/ConfirmForm";
import PrivateRoute from "./components/route/PrivateRoute";
import NftDashboard from "./components/pages/HomePage";
import NotFoundPage from "./components/pages/NotFoundPage";
import NftTest from "./components/nft/NftTest";
import NftPage from "./components/pages/NftPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					exact
					path="/nftPage"
					element={
						<PrivateRoute>
						<Layout>
							<NftPage />
						</Layout>
						</PrivateRoute>
					}
				></Route>

				<Route
					exact
					path="/getNfts"
					element={
						<PrivateRoute>
						<Layout>
							<NftTest />
						</Layout>
						</PrivateRoute>
					}
				></Route>
				<Route
					exact
					path="/"
					element={
						<Layout>
							<LoginForm />
						</Layout>
					}
				></Route>
				<Route
					exact
					path="/confirm"
					element={
						<Layout>
							<ConfirmForm />
						</Layout>
					}
				></Route>
				<Route
					exact
					path="/dashboard"
					element={
						<PrivateRoute>
							<Layout>
								<NftDashboard />
							</Layout>
						</PrivateRoute>
					}
				></Route>
				<Route
					path="*"
					element={
						<Layout>
							<NotFoundPage />
						</Layout>
					}
				></Route>
			</Routes>
		</Router>
	);
}

export default App;
