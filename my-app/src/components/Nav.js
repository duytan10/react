import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Nav = () => {
  const listLink = [
    {
      id: 1,
      to: "/",
      title: "Home",
    },
    {
      id: 2,
      to: "/blog",
      title: "Blog",
    },
    {
      id: 3,
      to: "/profile",
      title: "Profile",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-center p-5 shadow-md gap-x-5">
        {listLink.map((item) => (
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              isActive ? "text-green-500 font-semibold" : ""
            }
          >
            {item.title}
          </NavLink>
        ))}
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default Nav;
