/* Main app: hash routing (home / publications / cv) + theme toggle. */
const { useState: uState, useEffect: uEffect } = React;

/* ----- hash routing ----- */
function parseHash() {
  const h = (location.hash || "#/").replace(/^#/, "");
  const parts = h.split("/").filter(Boolean);
  if (parts.length === 0) return { name: "home" };
  if (parts[0] === "pubs" || parts[0] === "publications") return { name: "pubs" };
  if (parts[0] === "cv" || parts[0] === "resume") return { name: "cv" };
  return { name: "home" };
}
function routeToHash(r) {
  if (r.name === "pubs") return "#/pubs";
  if (r.name === "cv") return "#/cv";
  return "#/";
}

/* ===== Home ===== */
function HomeView({ data, go }) {
  return (
    <div className="view">
      <Hero profile={data.profile} links={data.quickLinks} />

      <hr className="divider" />
      <section className="block wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">Research</div>
            <h2 style={{ marginTop: ".6rem" }}>Selected publications</h2>
          </div>
          <a className="sec-link" onClick={() => go({ name: "pubs" })}>All work <Ic.arrow style={{ width: 15, height: 15 }} /></a>
        </div>
        <div className="pub-list">
          {data.publications.filter((p) => p.selected !== false).map((p) => <PubCard key={p.id} pub={p} />)}
        </div>
      </section>

      <hr className="divider" />
      <section className="block wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">Updates</div>
            <h2 style={{ marginTop: ".6rem" }}>Recent news</h2>
          </div>
        </div>
        <NewsList items={data.news} />
      </section>
    </div>
  );
}

/* ===== Publications page ===== */
function PubsView({ data }) {
  return (
    <div className="view">
      <section className="page-head wrap">
        <div className="eyebrow">Research</div>
        <h1>Publications</h1>
        <p>Selected works. You can also find my articles on <a href={data.quickLinks.find((l) => l.icon === "scholar")?.href} target="_blank" rel="noopener">Google Scholar</a>.</p>
      </section>
      <section className="block wrap" style={{ paddingTop: "1rem" }}>
        <div className="pub-list">{data.publications.map((p) => <PubCard key={p.id} pub={p} />)}</div>
      </section>
    </div>
  );
}

/* ===== CV page ===== */
function CvView({ data }) {
  const cv = data.profile.cv;
  const fileName = cv.split("/").pop();
  return (
    <div className="view">
      <section className="page-head wrap">
        <div className="eyebrow">Curriculum vitae</div>
        <h1>CV</h1>
        <p>My academic CV. View it below, open it in a new tab, or download a copy.</p>
        <div className="cv-actions">
          <a className="btn btn--accent" href={cv} target="_blank" rel="noopener"><Ic.ext/>Open in new tab</a>
          <a className="btn" href={cv} download={fileName}><Ic.file/>Download PDF</a>
        </div>
      </section>
      <section className="block wrap cv-block">
        <object className="cv-frame" data={cv + "#view=FitH"} type="application/pdf" aria-label={data.profile.name + " CV"}>
          <div className="cv-fallback">
            <p>Your browser can&rsquo;t display PDFs inline.</p>
            <a className="btn btn--accent" href={cv} target="_blank" rel="noopener"><Ic.ext/>Open the CV</a>
          </div>
        </object>
      </section>
    </div>
  );
}

/* ===== App shell ===== */
function App() {
  const data = window.DATA;
  const [route, setRoute] = uState(parseHash());
  const [theme, setTheme] = uState(() => {
    const saved = localStorage.getItem("kp-theme");
    if (saved) return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  uEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("kp-theme", theme);
  }, [theme]);

  uEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (r) => { location.hash = routeToHash(r); window.scrollTo(0, 0); };

  let view;
  if (route.name === "pubs") view = <PubsView data={data} go={go} />;
  else if (route.name === "cv") view = <CvView data={data} />;
  else view = <HomeView data={data} go={go} />;

  return (
    <>
      <Nav route={route} go={go} theme={theme} toggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />
      {view}
      <Footer profile={data.profile} links={data.quickLinks} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
