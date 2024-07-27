import { NavbarMenu } from "./Navbar.jsx";

const Header = () => {

  return (
    <div className="bg-blue-gray-900 h-screen ">
      <div className=" w-full py-2 px-8 bg-gradient-to-b from-black ">
        <NavbarMenu />
      </div>
    </div>
  );
};

export default Header;
