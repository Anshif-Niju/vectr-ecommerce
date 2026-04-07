import { useState } from 'react';
import { useStats } from '../../context/StatsContext';
import SideBar from './SideBar';
import { UserCheck, UserMinus, Users, Search } from 'lucide-react';
import { adminShellStyles, adminUserListStyles } from './Tailwind/AdminTailwind';

function UserList() {
  const { stats, toggleActive } = useStats();
  const [search, setSearch] = useState('');

  const filteredUsers = stats.users.filter((user) =>
    (user.username || user.name || '').toLowerCase().includes(search.toLowerCase()),
  );

  const activeCount = stats.users.filter((u) => u.isActive).length;
  const blockedCount = stats.users.length - activeCount;

  return (
    <div className={adminShellStyles.page}>
      <SideBar />

      <main className={adminUserListStyles.main}>
        <div className={adminUserListStyles.header}>
          <div>
            <h1 className={adminUserListStyles.title}>User Management</h1>
          </div>

          <div className={adminUserListStyles.statsWrap}>
            <div className={adminUserListStyles.statCard}>
              <div className={adminUserListStyles.statIcon('active')}>
                <UserCheck size={20} />
              </div>
              <div>
                <p className={adminUserListStyles.statLabel}>Active</p>
                <p className={adminUserListStyles.statValue}>{activeCount}</p>
              </div>
            </div>
            <div className={adminUserListStyles.statCard}>
              <div className={adminUserListStyles.statIcon('blocked')}>
                <UserMinus size={20} />
              </div>
              <div>
                <p className={adminUserListStyles.statLabel}>Blocked</p>
                <p className={adminUserListStyles.statValue}>{blockedCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={adminUserListStyles.searchWrap}>
          <Search className={adminUserListStyles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Find a user "
            className={adminUserListStyles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={adminUserListStyles.grid}>
          {filteredUsers.map((user) => (
            <div key={user._id || user.id} className={adminUserListStyles.card(user.isActive)}>
              {user.isActive && <div className={adminUserListStyles.glow} />}

              <div className={adminUserListStyles.topRow}>
                <div className={adminUserListStyles.avatar}>
                  {(user.username || user.name || 'U').charAt(0)}
                </div>
                <span className={adminUserListStyles.statusBadge(user.isActive)}>
                  {user.isActive ? 'Active' : 'Blocked'}
                </span>
              </div>

              <h2 className={adminUserListStyles.name}>{user.username || user.name}</h2>

              <div className={adminUserListStyles.infoSection}>
                <div>
                  <label className={adminUserListStyles.infoLabel}>User ID:-</label>
                  <p className={adminUserListStyles.infoValue}>{user._id || user.id}</p>
                </div>
                <div>
                  <label className={adminUserListStyles.infoLabel}>Email Address</label>
                  <p className={adminUserListStyles.infoValue}>{user.email}</p>
                </div>
                <div>
                  <label className={adminUserListStyles.infoLabel}>Last Seen</label>
                  <p className={adminUserListStyles.infoDate}>
                    {user.accountCreatedDate
                      ? new Date(user.accountCreatedDate).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
              </div>

              <div className={adminUserListStyles.actionRow}>
                <button
                  onClick={() => toggleActive(user._id || user.id)}
                  className={adminUserListStyles.actionButton(user.isActive)}
                >
                  {user.isActive ? 'Block Account' : 'Unblock Account'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className={adminUserListStyles.emptyState}>
            <Users size={60} className={adminUserListStyles.emptyIcon} />
            <h3 className={adminUserListStyles.emptyTitle}>No matches found</h3>
            <p className={adminUserListStyles.emptyText}>
              We couldn't find any users named "{search}"
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default UserList;
