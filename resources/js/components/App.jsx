import ReactDOM from 'react-dom';
import "../../css/Sidebar.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Crew from './Crew/Crew';
import MainLayout from './MainLayout';
import Document from './Document/Document';
import Users from './Users/Users';
import Rank from './Rank/Rank';
import Home from './Home/Home';
import AddCrew from './Crew/create/AddCrew';
import EditCrew from './Crew/edit/EditCrew';
import AddDocument from './Document/create/AddDocument';
import EditDocument from './Document/edit/EditDocument';
import AddRank from './Rank/create/AddRank';
import EditRank from './Rank/edit/EditRank';


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index path='/home' element={<Home />} />
                    <Route path="/crews" element={<Crew />} />
                    <Route path="/crews/create" element={<AddCrew />} />
                    <Route path="/crews/edit/:id" element={<EditCrew />} />
                    <Route path="/documents" element={<Document />} />
                    <Route path="/documents/create" element={<AddDocument />} />
                    <Route path="/documents/edit/:id" element={<EditDocument />} />
                    <Route path="/ranks" element={<Rank />} />
                    <Route path="/ranks/create" element={<AddRank />} />
                    <Route path="/ranks/edit/:id" element={<EditRank />} />
                    <Route path="/users" element={<Users />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
