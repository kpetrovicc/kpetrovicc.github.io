/* Shared components. Depends on window.Ic. Exports to window. */
const { useState, useEffect, useRef } = React;

function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function fmtMonth(iso) {
  const d = new Date(iso + "-01T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/* ---------- nav ---------- */
function Nav({ route, go, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { id: "home", label: "Home" },
    { id: "pubs", label: "Publications" },
  ];
  const here = route.name;
  return (
    <header className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="wrap nav__inner">
        <div className="brand" onClick={() => go({ name: "home" })} title="Home">
          <span className="brand__mark"><img src="assets/avatar.png" alt="" /></span>
          <span className="brand__name">Katarina Petrović</span>
        </div>
        <nav className="nav__links">
          {links.map((l) => (
            <span key={l.id} className={"nav__link" + (here === l.id ? " active" : "")} onClick={() => go({ name: l.id })}>{l.label}</span>
          ))}
        </nav>
        <button className="icon-btn" onClick={toggleTheme} title={theme === "dark" ? "Switch to light" : "Switch to dark"} aria-label="Toggle theme">
          {theme === "dark" ? <Ic.sun/> : <Ic.moon/>}
        </button>
      </div>
    </header>
  );
}

/* ---------- quick links ---------- */
function QuickLinks({ links }) {
  return (
    <div className="hero__links">
      {links.map((l) => (
        <a key={l.label} className={"social-btn" + (l.accent ? " social-btn--accent" : "")} href={l.href}
           title={l.label} aria-label={l.label}
           target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener"
           onClick={(e) => { if (l.href === "#") e.preventDefault(); }}>
          {Ic[l.icon] && Ic[l.icon]()}
        </a>
      ))}
    </div>
  );
}

/* ---------- hero ---------- */
function Hero({ profile, links }) {
  return (
    <section className="hero">
      <div className="wrap hero__grid">
        <div className="hero__card">
          <div className="hero__photo">
            <img src={profile.photo} alt={profile.name} />
          </div>
          <h1 className="hero__name">
            <span className="grad">{profile.name}</span>
          </h1>
          <p className="hero__role">{profile.role[0]}<b>{profile.role[1]}</b>{profile.role[2]}.</p>
          {profile.tagline && <p className="hero__tagline">{profile.tagline}</p>}
          <QuickLinks links={links} />
        </div>
        <div className="hero__intro">
          <div className="hero__bio" dangerouslySetInnerHTML={{ __html: profile.bioHtml }} />
        </div>
      </div>
    </section>
  );
}

/* ---------- publication row ---------- */
function PubCard({ pub }) {
  return (
    <article className="pub">
      <div className="pub__media">
        {pub.img ? <img src={pub.img} alt="" /> : <div className="ph">figure</div>}
      </div>
      <div>
        <div className="pub__venue"><span className="venue">{pub.venue}{pub.status ? " · " + pub.status : ""}</span></div>
        <h3 className="pub__title">
          {pub.arxiv || pub.pdf
            ? <a href={pub.arxiv || pub.pdf} target="_blank" rel="noopener">{pub.title}</a>
            : pub.title}
        </h3>
        <p className="pub__authors" dangerouslySetInnerHTML={{ __html: pub.authors }} />
        <div className="pub__links">
          {pub.arxiv && <a className="linklet" href={pub.arxiv} target="_blank" rel="noopener"><Ic.ext/>arXiv</a>}
          {pub.pdf && <a className="linklet" href={pub.pdf} target="_blank" rel="noopener"><Ic.ext/>PDF</a>}
        </div>
      </div>
    </article>
  );
}

/* ---------- news list (home) ---------- */
function NewsList({ items }) {
  return (
    <ol className="news">
      {items.map((n, i) => (
        <li className="news__row" key={i}>
          <div className="news__date">{fmtMonth(n.date)}</div>
          <div className="news__body" dangerouslySetInnerHTML={{ __html: n.html }} />
        </li>
      ))}
    </ol>
  );
}

/* ---------- footer ---------- */
function Footer({ profile, links }) {
  return (
    <footer className="foot">
      <div className="wrap foot__inner">
        <div className="foot__meta">© {new Date().getFullYear()} {profile.name} · Oxford, UK</div>
        <div className="foot__links">
          {links.filter((l) => l.icon !== "file").map((l) => (
            <a key={l.label} className="icon-btn" href={l.href}
               target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener" aria-label={l.label}>
              {Ic[l.icon] && Ic[l.icon]()}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, QuickLinks, Hero, PubCard, NewsList, Footer, fmtDate, fmtMonth });
