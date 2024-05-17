import Link from "next/link";
import { FaSpotify } from "react-icons/fa";
import { isAuthenticated } from "@/utils/isAuthenticated";

const Navigation = async ({ mood }) => {
  const session = await isAuthenticated();
  return (
    <div
      className="
    bg-base-300 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 duration-100 [transform:translate3d(0,0,0)] 
    shadow-sm
    "
    >
      <div className="navbar w-full">
        <div className="flex-1">
          <Link href="/">
            <button className="btn btn-ghost text-xl">mood2music</button>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-full">
                {session ? (
                  <img src={session?.user?.picture} />
                ) : (
                  <FaSpotify className="text-3xl" />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              {!session && (
                <li>
                  <Link href="/api/auth/signin">Login</Link>
                </li>
              )}
              {session && (
                <>
                  <li>
                    <a>Profile</a>
                  </li>
                  <li>
                    <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
