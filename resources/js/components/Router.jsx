import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Crew from "./Crew/Crew";
import Document from "./Document/Document";
import CrewDocument from "./CrewDocument/CrewDocument";
import Rank from "./Rank/Rank";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="/crews" index element={<Crew />} />
                    <Route path="/crew-documents" element={<CrewDocument />} />
                    <Route path="/documents" element={<Document />} />
                    <Route path="/ranks" element={<Rank />} />
                    <Route path="/users" element={<Users />} />
                    {/* <Route path="blogs" element={<Blogs />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NoPage />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}