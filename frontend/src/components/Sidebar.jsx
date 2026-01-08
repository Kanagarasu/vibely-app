import React from 'react'
import { assets, dummyUserData } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import Menuitems from './Menuitems'
import { CirclePlus, LogOut } from 'lucide-react'
import { UserButton, useClerk } from '@clerk/clerk-react';
import logo from '../assets/logo1.png';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate()
    const user = dummyUserData
    const { signOut } = useClerk()

    return (
        <>
            {/* MOBILE OVERLAY */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 sm:hidden"
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed sm:static z-50
            w-64 xl:w-72
            bg-white border-r border-gray-200
            flex flex-col justify-between
            top-0 bottom-0 left-0
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
            `}
            >


                {/* TOP */}
                <div className="w-full">
                    <img
                        onClick={() => navigate('/')}
                        src={logo}
                        alt="logo"
                        className="w-35 ml-10 my-4 cursor-pointer"
                    />

                    <hr className="border-gray-200 mb-4" />

                    <Menuitems setSidebarOpen={setSidebarOpen} />

                    {/* CREATE POST */}
                    <div className="px-6">
                        <Link
                            to="/create-post"
                            className="flex items-center justify-center gap-2 py-2.5 mt-6 rounded-xl
              text-white font-medium
              bg-linear-to-r from-indigo-500 to-purple-600
              hover:from-indigo-600 hover:to-purple-700
              active:scale-95 transition"
                        >
                            <CirclePlus className="w-5 h-5" />
                            Create Post
                        </Link>
                    </div>
                </div>

                {/* BOTTOM USER SECTION */}
                <div className="w-full border-t border-gray-200 p-4 px-6 flex items-center justify-between">
                    <div className="flex gap-3 items-center">
                        <UserButton />
                        <div className="leading-tight">
                            <h1 className="text-sm font-medium">{user.full_name}</h1>
                            <p className="text-xs text-gray-500">@{user.username}</p>
                        </div>
                    </div>

                    <LogOut
                        onClick={signOut}
                        className="w-5 h-5 text-gray-400 hover:text-gray-700 cursor-pointer transition"
                    />
                </div>
            </aside>
        </>
    )
}

export default Sidebar
