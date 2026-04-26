import { useState, useEffect } from 'react';
import { fetchUsers, fetchUserById } from '../../api/user';
import './GetUsers.css';

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load users. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (id) => {
    try {
      const user = await fetchUserById(id);
      setSelectedUser(user);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName?.toLowerCase().includes(searchLower) ||
      user.lastName?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.userName?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) return (
    <div className="loader-wrapper">
      <div className="dot-spinner"></div>
      <p>Loading users...</p>
    </div>
  );

  if (error) return (
    <div className="error-wrapper">
      <p>{error}</p>
      <button onClick={loadUsers} className="retry-btn">Retry</button>
    </div>
  );

  return (
  <div className="user-management-wrapper">
    <header className="app-header">
      <div className="header-inner">
        <div className="brand-group">
          <h1>Users <span className="highlight">List</span></h1>
        </div>
        
        <div className="controls-group">
          <div className="search-container">
            <span className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={loadUsers} className="refresh-btn" title="Refresh">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6"></path>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <main className="users-grid">
      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <p>No users found matching your search.</p>
        </div>
      ) : (
        <>
          <div className="users-list">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className={`user-card ${selectedUser?._id === user._id ? 'active' : ''}`}
                onClick={() => handleUserClick(user._id)}
              >
                <div className="user-avatar">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
                <div className="user-info">
                  <h4>{user.firstName} {user.lastName}</h4>
                  <p>@{user.userName}</p>
                </div>
                {user.isAdmin && <span className="admin-badge">Admin</span>}
              </div>
            ))}
          </div>
          
          <div className="status-footer">
            <span className="status-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            <span>{filteredUsers.length} {filteredUsers.length === 1 ? 'User' : 'Users'} Found</span>
          </div>
        </>
      )}
    </main>

    {/* Modal remains the same */}
    {selectedUser && (
      <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
        <div className="modal-container" onClick={e => e.stopPropagation()}>
          <div className="modal-content">
            <button className="close-button" onClick={() => setSelectedUser(null)}>×</button>
            <div className="user-profile">
              <div className="profile-avatar">
                {selectedUser.firstName?.[0]}{selectedUser.lastName?.[0]}
              </div>
              <h2>{selectedUser.firstName} {selectedUser.lastName}</h2>
              {selectedUser.isAdmin && <span className="admin-tag">Administrator</span>}
            </div>
            <div className="user-details">
              <div className="detail-row">
                <label>Username</label>
                <span>{selectedUser.userName}</span>
              </div>
              <div className="detail-row">
                <label>Email</label>
                <span>{selectedUser.email}</span>
              </div>
              <div className="detail-row">
                <label>User ID</label>
                <span>{selectedUser._id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default GetUsers;