import { useState, useEffect } from "react";
import Header from "./Header";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

function Navbar() {
  const { theme, setTheme } = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );
  const handleToggle = (e) => {
    if (e.target.checked) setTheme("dark");
    else setTheme("light");
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  return (
    <div className="navbar bg-base-100 mt-5 mb-10 mx-auto h-30 w-5/6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a href="/add">Add new Financial</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center h-10">
        <div className="btn btn-ghost text-xl align-middle h-24">
          <Header />
        </div>
      </div>
      <div className="navbar-end space-x-2">
        <div className="space-x-2">
          <SignedOut>
            <SignInButton
              mode="modal"
              className="btn btn-outline btn-success"
            />
            <SignUpButton mode="modal" className="btn btn-outline btn-info" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <label className="grid cursor-pointer place-items-center">
          <input
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
            //ถ้าใช้ controller อันอื่นต้องใช้
            // onChange={handleToggle}
            // checked={theme === "dark" ? true : false}
          />
          <svg
            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
    </div>
  );
}

export default Navbar;
