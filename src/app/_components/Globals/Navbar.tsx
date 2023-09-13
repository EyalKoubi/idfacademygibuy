import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <header className="bg-gray-600 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition duration-300 ease-in-out"
        >
          {" "}
          Log Out
        </Link>
        <h1 className="text-white text-2xl font-semibold">IDF ACADEMY</h1>
      </div>
    </header>
  );
};

export default Navbar;
