import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout.tsx";
import UserLayout from "./layouts/UserLayout.tsx";
import {ToastContainer} from "react-toastify";
import Home from "./pages/Home.tsx";
import OrderListPage from "./pages/OrderListPage.tsx";
import ShowOrderPage from "./pages/ShowOrderPage.tsx";
import Admin from "./pages/Admin.tsx";
import CreateItem from "./pages/CreateItem.tsx";
import EditItem from "./pages/EditItem.tsx";

function App() {
    return (
        <>
            <ToastContainer />
            <Router>
                <Routes>
                    <Route element={<UserLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/orders" element={<OrderListPage />} />
                        <Route path="/orders/:id" element={<ShowOrderPage />} />
                    </Route>

                    {/* Admin layout */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Admin />} />
                        <Route path="create" element={<CreateItem />} />
                        <Route path="edit/:id" element={<EditItem />} />
                        <Route path="orders" element={<OrderListPage />} />
                        <Route path="orders/:id" element={<ShowOrderPage />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
