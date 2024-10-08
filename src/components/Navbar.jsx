import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className=" base-container flex justify-between items-center mt-9">
      <div className=" border px-5 py-2 rounded-lg bg-slate-100 cursor-pointer ">
        <Link to="/" className="text-3xl font-semibold">
          Books
        </Link>
      </div>
      <div className=" flex justify-between w-1/2 items-center ">
        <ul>
          <li>
            <Link
              to={"/"}
              className=" font-medium text-xl border rounded-md px-3 py-1 bg-gray-100"
            >
              Home
            </Link>
          </li>
        </ul>
        <ul className=" flex gap-4 ">
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/register"}>Rgister</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
