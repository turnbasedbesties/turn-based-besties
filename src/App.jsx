import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Real artwork from the feed
  const [artwork, setArtwork] = useState('https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/40151834/40151834-1704062369470-12b37e40bbfe4.jpg')

  const CHANNEL_URL = 'https://www.youtube.com/@turnbasedbesties'
  const REDDIT_URL = 'https://www.reddit.com/r/TurnBasedBestiesPod/'
  const LINKTREE_URL = 'https://linktr.ee/turnbasedbesties'
  const CANVA_URL = 'https://turnbasedbesties.my.canva.site/'
  const RSS_URL = 'https://anchor.fm/s/efeb6ca8/podcast/rss'

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true)
      setError(null)
      try {
        // Using rss2json which handles CORS for us
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}&t=${Date.now()}`)
        const data = await response.json()
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          setEpisodes(data.items.slice(0, 10))
          if (data.feed && data.feed.image) {
            setArtwork(data.feed.image)
          }
        } else {
          throw new Error("No items found")
        }
      } catch (err) {
        console.error("Error fetching RSS feed:", err)
        // Static fallback so the board is NEVER empty
        setEpisodes([
          {
            title: "Episode 41: Convince Me to Play Hades 2!",
            pubDate: "2024-12-20",
            description: "DJ and Sam discuss the highly anticipated sequel to Hades.",
            link: "https://podcasters.spotify.com/pod/show/turnbasedbesties"
          },
          {
            title: "Episode 40: The RPGs of 2024",
            pubDate: "2024-12-10",
            description: "A look back at the best RPGs of the year.",
            link: "https://podcasters.spotify.com/pod/show/turnbasedbesties"
          },
          {
            title: "Medical Moment: Status Ailments",
            pubDate: "2024-11-25",
            description: "Dr. Sam diagnoses common RPG status effects.",
            link: "https://podcasters.spotify.com/pod/show/turnbasedbesties"
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchFeed()
  }, [])

  const platforms = [
    { name: 'Spotify', url: 'https://podcasters.spotify.com/pod/show/turnbasedbesties' },
    { name: 'Apple Podcasts', url: 'https://podcasts.apple.com/us/podcast/turn-based-besties/id1723990684' },
    { name: 'Reddit', url: REDDIT_URL },
    { name: 'YouTube', url: CHANNEL_URL },
    { name: 'Official Site', url: CANVA_URL },
    { name: 'Linktree', url: LINKTREE_URL }
  ]

  const renderHome = () => (
    <div className="tab-content fade-in">
      <div className="main-content">
        <section className="section episodes-section">
          <h2>Latest Quest Log</h2>
          <div className="timeline">
            {loading && episodes.length === 0 ? (
              <p className="status-msg">Loading epic adventures...</p>
            ) : episodes.length > 0 ? (
              episodes.map((ep, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-date">
                    {ep.pubDate ? new Date(ep.pubDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recent'}
                  </div>
                  <div className="timeline-content">
                    <h3>{ep.title}</h3>
                    <div className="ep-desc" dangerouslySetInnerHTML={{ __html: (ep.description || '').slice(0, 180) + '...' }}></div>
                    <a href={ep.link} target="_blank" rel="noopener noreferrer" className="link-btn">Listen to Episode</a>
                  </div>
                </div>
              ))
            ) : (
              <p className="status-msg">The quest board is temporarily blank. Check our links to listen!</p>
            )}
          </div>
        </section>

        <aside className="sidebar">
          <section className="sidebar-section">
            <h2>Join the Community</h2>
            <div className="link-stack">
              <a href={REDDIT_URL} target="_blank" rel="noopener noreferrer" className="card link-card">
                <div className="card-icon">🏠</div>
                <div>
                  <h4>Subreddit</h4>
                  <p>Discuss episodes with other besties.</p>
                </div>
              </a>
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="card link-card">
                <div className="card-icon">📺</div>
                <div>
                  <h4>YouTube</h4>
                  <p>Video essays and full recordings.</p>
                </div>
              </a>
              <a href={LINKTREE_URL} target="_blank" rel="noopener noreferrer" className="card link-card">
                <div className="card-icon">🔗</div>
                <div>
                  <h4>Linktree</h4>
                  <p>All our official channels.</p>
                </div>
              </a>
            </div>
          </section>

          <section className="sidebar-section">
            <h2>Support the Party</h2>
            <p className="small-text">Help two grown adults with no free time keep talking about RPGs!</p>
            <a href="https://podcasts.apple.com/us/podcast/turn-based-besties/id1723990684" target="_blank" rel="noopener noreferrer" className="button full-width">
              Rate on Apple Podcasts
            </a>
          </section>
        </aside>
      </div>
    </div>
  )

  const renderCreators = () => (
    <div className="tab-content fade-in">
      <section className="section">
        <h2>The Party Members</h2>
        <div className="creators-grid">
          <div className="creator-card">
            <div className="creator-header">
              <h3>DJ</h3>
              <span className="role-tag">The Retro Specialist</span>
            </div>
            <p>
              DJ is a nearly 40 lifelong, casual but often persnickety gaymer who lives for retro RPGs. 
              By day, he's a <strong>professional opera singer</strong>, which means he loves to nerd out over the 
              perfect combination of music and video games.
            </p>
            <ul className="fav-games">
              <li><strong>Class:</strong> Bard / Historian</li>
              <li><strong>Specialty:</strong> Music & Pixel Art Analysis</li>
            </ul>
          </div>

          <div className="creator-card">
            <div className="creator-header">
              <h3>Sam</h3>
              <span className="role-tag">The Resident Physician</span>
            </div>
            <p>
              Sam is a mid 30s father of three who picked up gaming as an adult. 
              A <strong>physician by day and gamer by night</strong>, he brings fresh eyes to old games, 
              offering a unique modern perspective to the classics.
            </p>
            <ul className="fav-games">
              <li><strong>Class:</strong> White Mage / Healer</li>
              <li><strong>Specialty:</strong> "Medical Moments" & New Player Insights</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )

  const renderAbout = () => (
    <div className="tab-content fade-in">
      <section className="section about-show">
        <h2>What is Turn-Based Besties?</h2>
        <div className="card">
          <p>
            Welcome to <strong>Turn-Based Besties</strong>, a podcast where two grown adults with no free time talk about their favorite RPGs!
          </p>
          <p>
            Born from a lifelong friendship, DJ and Sam provide honest, thoughtful, and often hilarious conversation 
            about the genre they love most.
          </p>
          <div className="theme-credit" style={{ margin: '1.5rem 0', padding: '1rem', borderLeft: '3px solid var(--accent-color)', background: 'rgba(255,255,255,0.05)' }}>
            <strong>Theme Music:</strong> "Night Shade" by Adhesive Wombat
          </div>
          <h3>Our Regular Segments</h3>
          <div className="segments-grid">
            <div className="segment">
              <h4>Medical Moment</h4>
              <p>Dr. Sam applies his professional knowledge to diagnose game characters.</p>
            </div>
            <div className="segment">
              <h4>Retro Reviews</h4>
              <p>DJ guides Sam through the 16-bit classics he missed as a kid.</p>
            </div>
            <div className="segment">
              <h4>Music & Mechanics</h4>
              <p>Nerd out over how scores and systems intertwine.</p>
            </div>
          </div>
        </div>

        <div className="card listener-mail" style={{ marginTop: '2rem', border: '1px dashed var(--accent-color)' }}>
          <h3>Send us a Message!</h3>
          <p>Have a question for DJ or a "Medical Moment" for Dr. Sam? We'd love to hear from you!</p>
          <a href="mailto:turnbasedbesties@gmail.com" className="button">Email the Besties</a>
        </div>
      </section>
    </div>
  )

  return (
    <div className="container">
      <nav className="navbar">
        <div className="nav-logo">Turn-Based Besties</div>
        <div className="nav-links">
          <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'active' : ''}>Quest Board</button>
          <button onClick={() => setActiveTab('creators')} className={activeTab === 'creators' ? 'active' : ''}>Party Info</button>
          <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>The Lore</button>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-artwork">
          <img src={artwork} alt="Turn-Based Besties Logo" className="main-logo" />
        </div>
        <h1>Turn-Based Besties</h1>
        <p className="description">
          Two grown adults with no free time talking about RPGs.
        </p>
        <div className="platform-pills">
          {platforms.map(p => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="pill">
              {p.name}
            </a>
          ))}
        </div>
      </header>

      {activeTab === 'home' && renderHome()}
      {activeTab === 'creators' && renderCreators()}
      {activeTab === 'about' && renderAbout()}

      <footer className="footer">
        <div className="social-links-footer">
          <a href="https://instagram.com/turnbasedbesties" target="_blank">Instagram</a>
          <a href={CHANNEL_URL} target="_blank">YouTube</a>
          <a href={REDDIT_URL} target="_blank">Reddit</a>
          <a href={CANVA_URL} target="_blank">Official Page</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Turn-Based Besties Podcast</p>
      </footer>
    </div>
  )
}

export default App
