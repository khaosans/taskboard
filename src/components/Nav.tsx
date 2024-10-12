import Link from 'next/link';
import { SignedIn, SignedOut } from "@clerk/nextjs";

const Nav = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
        <SignedIn>
          <li>
            <Link href="/taskboard" className="hover:text-gray-300">
              Taskboard
            </Link>
          </li>
        </SignedIn>
        <SignedOut>
          <li>
            <Link href="/login" className="hover:text-gray-300">
              Login
            </Link>
          </li>
          <li>
            <Link href="/sign-up" className="hover:text-gray-300">
              Sign Up
            </Link>
          </li>
        </SignedOut>
      </ul>
    </nav>
  );
};

export default Nav;