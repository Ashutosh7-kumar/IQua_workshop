import './App.css';
import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8000';
const API_KEY = 'skretail_4f8c2e1b9a2d'; // Use this key in backend too

function App() {
  const [form, setForm] = useState({
    Name: '',
    Description: '',
    StartDate: '',
    EndDate: '',
    DiscountType: '',
    DiscountValue: '',
    Status: 'Draft',
    Location: '',
  });
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch campaigns on page load
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/campaigns`, {
        headers: { 'x-api-key': API_KEY },
      });
      if (!res.ok) throw new Error('Failed to fetch campaigns');
      const data = await res.json();
      setCampaigns(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to create campaign');
      setForm({
        Name: '',
        Description: '',
        StartDate: '',
        EndDate: '',
        DiscountType: '',
        DiscountValue: '',
        Status: 'Draft',
      });
      setSuccess('Campaign created successfully!');
      fetchCampaigns();
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this campaign?')) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/campaigns/${id}`, {
        method: 'DELETE',
        headers: { 'x-api-key': API_KEY },
      });
      if (!res.ok) throw new Error('Failed to delete campaign');
      setSuccess('Campaign deleted!');
      fetchCampaigns();
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Review system
  const [reviewing, setReviewing] = useState({}); // { [id]: stars }
  const handleStarHover = (id, star) => {
    setReviewing((prev) => ({ ...prev, [id]: star }));
  };
  const handleStarClick = async (id, star) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/campaigns/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ Review: star }),
      });
      if (!res.ok) throw new Error('Failed to submit review');
      setSuccess('Review submitted!');
      fetchCampaigns();
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Filter campaigns by search
  const filteredCampaigns = campaigns.filter(
    (c) =>
      c.Name?.toLowerCase().includes(search.toLowerCase()) ||
      c.Description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1>Smart Retail Promotions Hub</h1>
      <div className="app-container">
        <form className="campaign-form" onSubmit={handleSubmit}>
          <h2>🎉 Create Campaign</h2>
          <input name="Name" value={form.Name} onChange={handleChange} placeholder="Name" required />
          <textarea name="Description" value={form.Description} onChange={handleChange} placeholder="Description" required />
          <input name="Location" value={form.Location} onChange={handleChange} placeholder="Location" required />
          <input name="StartDate" type="date" value={form.StartDate} onChange={handleChange} required />
          <input name="EndDate" type="date" value={form.EndDate} onChange={handleChange} required />
          <select name="DiscountType" value={form.DiscountType} onChange={handleChange} required>
            <option value="">Discount Type</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
          <input name="DiscountValue" type="number" value={form.DiscountValue} onChange={handleChange} placeholder="Discount Value" required />
          <select name="Status" value={form.Status} onChange={handleChange} required>
            <option value="Draft">Draft</option>
            <option value="Live">Live</option>
            <option value="Ended">Ended</option>
          </select>
          <button type="submit" disabled={loading}>Create Campaign</button>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </form>
        <div className="campaign-list">
          <h2>📋 All Campaigns</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {loading ? <p>Loading...</p> : null}
          {filteredCampaigns.length === 0 && !loading ? <p>No campaigns found.</p> : null}
          <ul>
            {filteredCampaigns.map((c) => (
              <li key={c._id} className="campaign-item">
                <div className="campaign-header">
                  <strong>{c.Name}</strong>
                  <span className={`badge badge-${c.Status?.toLowerCase()}`}>{c.Status}</span>
                </div>
                <div className="campaign-desc">{c.Description}</div>
                <div className="campaign-location">📍 {c.Location}</div>
                <div className="campaign-dates">
                  <span>🗓 {c.StartDate} to {c.EndDate}</span>
                </div>
                <div className="campaign-discount">
                  <span>💸 {c.DiscountType}: {c.DiscountValue}</span>
                </div>
                <div className="campaign-review">
                  <span>Review: </span>
                  {[1,2,3,4,5].map(star => (
                    <span
                      key={star}
                      style={{
                        cursor: 'pointer',
                        color:
                          (reviewing[c._id] ? reviewing[c._id] : c.Review) >= star
                            ? '#FFD700'
                            : '#d1d5db',
                        fontSize: '1.5rem',
                        marginRight: '2px',
                      }}
                      onMouseEnter={() => handleStarHover(c._id, star)}
                      onMouseLeave={() => setReviewing((prev) => ({ ...prev, [c._id]: undefined }))}
                      onClick={() => handleStarClick(c._id, star)}
                      title={`Give ${star} star${star > 1 ? 's' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                  <span style={{marginLeft:8, color:'#888', fontSize:'1rem'}}>{c.Review || 0}/5</span>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(c._id)} title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m5 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
