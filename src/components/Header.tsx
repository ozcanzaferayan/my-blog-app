import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/posts/add">Add Post</Link>
          </li>
        </ul>
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full">
              <Image
                width={100}
                height={100}
                src={sessionData?.user.image ?? ""}
                alt="Profile image"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            {sessionData && (
              <>
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button
                    onClick={() =>
                      void signOut({
                        callbackUrl: "/",
                      })
                    }
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {!sessionData && (
              <li>
                <button onClick={() => void signIn()}>Sign in</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
