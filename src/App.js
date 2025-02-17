import CreatePage from './create.page';
import Home from './home';
import Navbar from './navbar';
import { Route, Routes } from 'react-router-dom';
import Notfound from './Notfound';
import BlogDetail from './BlogDetail';

function App() {

	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/blog/:id' element={<BlogDetail />} />
				<Route path='/create' element={<CreatePage /> } />
				<Route path='*' element={<Notfound /> } />
			</Routes>
		</div>
	);
}

export default App;
