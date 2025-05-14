import { Link, Outlet } from "react-router-dom";

function UserLayout() {
    return (
        <>
            <nav className="bg-amber-400 p-4 text-3xl select-none text-white font-bold fixed top-0 w-full h-16 z-10 grid items-center">
                <ul className="flex justify-between">
                    <li><Link to="/">E-commerce</Link></li>
                    <li className={"text-xl"}><Link to="/orders">My Orders</Link></li>
                </ul>
            </nav>
            <div className="mb-16"></div>
            <div className="p-3">
                {/*Outlet renders the child route's element*/}
                <Outlet />
            </div>
        </>
    );
}

export default UserLayout;
