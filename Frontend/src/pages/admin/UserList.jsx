import { useState } from 'react';
import { useStats } from '../../context/StatsContext';
import SideBar from './SideBar';
import { UserCheck, UserMinus, Users, Search } from 'lucide-react'; 

function UserList() {
  const { stats, toggleActive } = useStats(); 
    const [search, setSearch] = useState('');

  const filteredUsers = stats.users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = stats.users.filter(u => u.isActive).length;
  const blockedCount = stats.users.length - activeCount;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex relative">
      <SideBar />
      
      <main className="flex-1 p-6 md:p-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-center text-white tracking-tight">User Management</h1>
          </div>

          <div className="flex gap-4">
            <div className="bg-slate-800/40 border border-slate-700/50 p-3 rounded-2xl flex items-center gap-3 backdrop-blur-sm">
              <div className="p-2 bg-green-500/10 rounded-xl text-green-400"><UserCheck size={20}/></div>
              <div><p className="text-[10px] uppercase text-slate-500 font-bold">Active</p><p className="text-lg font-bold text-white">{activeCount}</p></div>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/50 p-3 rounded-2xl flex items-center gap-3 backdrop-blur-sm">
              <div className="p-2 bg-red-500/10 rounded-xl text-red-400"><UserMinus size={20}/></div>
              <div><p className="text-[10px] uppercase text-slate-500 font-bold">Blocked</p><p className="text-lg font-bold text-white">{blockedCount}</p></div>
            </div>
          </div>
        </div>

        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Find a user "
            className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`bg-slate-800/80 rounded-3xl border border-slate-700/50 p-6  transition-all group relative overflow-hidden ${!user.isActive ? 'opacity-80' : ''}`}
            >
              {user.isActive && (
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/5 blur-3xl rounded-full" />
              )}

              <div className="flex justify-between items-start mb-5">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-xl font-bold text-cyan-400 shadow-inner">
                  {user.name.charAt(0)}
                </div>
                <span className={`px-3 py-1 rounded-full  font-black uppercase text-sm  ${user.isActive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {user.isActive ? 'Active' : 'Blocked'}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white truncate">{user.name}</h2>

                
              <div className="space-y-4 py-4 border-t border-slate-700/50">
                <div>
                  <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">User ID:-</label>
                  <p className="text-sm text-slate-300 truncate">{user.id}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Email Address</label>
                  <p className="text-sm text-slate-300 truncate">{user.email}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Last Seen</label>
                  <p className="text-sm text-slate-300">{user.lastActive}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => toggleActive(user.id)}
                  className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all ${
                    user.isActive 
                    ? 'bg-slate-700 text-slate-300 hover:bg-red-500 hover:text-white' 
                    : 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/20'
                  }`}
                >
                  {user.isActive ? 'Block Account' : 'Unblock Account'}
                </button>
              
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 bg-slate-800/20 rounded-3xl border-2 border-dashed border-slate-800">
            <Users size={60} className="text-slate-700 mb-4" />
            <h3 className="text-xl font-bold text-slate-400">No matches found</h3>
            <p className="text-slate-500 text-sm">We couldn't find any users named "{search}"</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default UserList;