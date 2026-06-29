/* Site content for Katarina Petrović. window.DATA is consumed by app.jsx. */
window.DATA = (function () {
  const profile = {
    name: "Katarina Petrović",
    handle: "kpetrovicc",
    role: ["PhD Student at ", "University of Oxford", ""],
    email: "katarina.petrovic@cs.ox.ac.uk",
    photo: "assets/profile.png",
    bioHtml:
      'My research focuses on <b>flow-based generative models</b> such as flow matching and diffusion. ' +
      'I am particularly interested in <b>AI4Science</b> applications such as modelling cell trajectories and small-molecule generation. ' +
      'I am supervised by <a href="https://www.cs.ox.ac.uk/people/michael.bronstein/" target="_blank" rel="noopener">Prof. Michael Bronstein</a> and ' +
      '<a href="https://www.cs.ox.ac.uk/people/ismaililkan.ceylan/" target="_blank" rel="noopener">Dr İsmail Ceylan</a>. ' +
      'Previously I was a research intern at the <a href="https://www.networkscienceinstitute.org" target="_blank" rel="noopener">Network Science Institute</a> ' +
      '(<a href="https://barabasi.com/science" target="_blank" rel="noopener">Barabási Lab</a>) in Boston, and I hold an MEng in Engineering Science from the University of Oxford.',
  };

  const quickLinks = [
    { label: "Email", href: "mailto:katarina.petrovic@cs.ox.ac.uk", icon: "mail", accent: true },
    { label: "Scholar", href: "https://scholar.google.com/citations?user=wew2d54AAAAJ&hl=en", icon: "scholar" },
    { label: "GitHub", href: "https://github.com/kpetrovicc", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kpetrovvic/", icon: "linkedin" },
    { label: "X", href: "https://x.com/kpetrovvic", icon: "x" },
  ];

  const publications = [
    {
      id: "curly-flow-matching",
      title: "Curly Flow Matching for Learning Non-gradient Dynamics",
      authors: "<b>Katarina Petrović</b>*, Lazar Atanackovic, Viggo Moro, Kacper Kapuśniak, İsmail Ceylan, Michael Bronstein, Joey Bose, Alexander Tong",
      venue: "NeurIPS 2025",
      img: "images/epoch_100a_animation.gif",
      arxiv: "https://arxiv.org/abs/2510.26645",
    },
    {
      id: "temporal-graph-rewiring",
      title: "Temporal Graph Rewiring with Expander Graphs",
      authors: "<b>Katarina Petrović</b>*, Andy Huang, Farimah Poursafaei, Petar Veličković",
      venue: "ICML 2024 GRaM",
      img: "images/TGR.jpg",
      arxiv: "https://arxiv.org/abs/2406.02362",
    },
    {
      id: "eit-quantum-dot",
      title: "Electromagnetically induced transparency in a multilayered spherical quantum dot with hydrogenic impurity",
      authors: "Vladan Pavlović, Marko Šušnjar, <b>Katarina Petrović</b>, Ljiljana Stevanović",
      venue: "Optical Materials (Elsevier)",
      img: "images/EIT.jpg",
      pdf: "https://www.sciencedirect.com/science/article/pii/S0925346718300430",
    },
  ];

  const news = [
    { date: "2025-10", html: 'Heading to <b>San Diego for NeurIPS 2025</b> to present <i>Curly Flow Matching</i> — let\'s catch up!' },
    { date: "2025-09", html: 'Our paper <a href="https://arxiv.org/abs/2510.26645" target="_blank" rel="noopener"><i>Curly Flow Matching for Learning Non-gradient Field Dynamics</i></a> was accepted at <b>NeurIPS 2025</b>.' },
    { date: "2025-04", html: 'Travelling to <b>ICLR 2025</b> in Singapore — let\'s catch up!' },
    { date: "2025-03", html: 'Curly Flow Matching accepted at the <b>ICLR 2025</b> <a href="https://www.lmrl.org" target="_blank" rel="noopener">LMRL</a> and <a href="https://mlgenx.github.io" target="_blank" rel="noopener">MLGenX</a> workshops.' },
    { date: "2024-10", html: 'Started my <b>PhD at the University of Oxford</b> with Prof. Michael Bronstein and Dr İsmail Ceylan.' },
    { date: "2024-07", html: 'Our paper <a href="https://arxiv.org/abs/2406.02362" target="_blank" rel="noopener"><i>Temporal Graph Rewiring with Expander Graphs</i></a> was accepted at the <b>ICML 2024 GRaM</b> workshop.' },
    { date: "2023-11", html: 'Started my research internship at the <b>Network Science Institute</b> (Barabási Lab) in Boston.' },
  ];

  const posts = [];
  const hiddenPosts = [];
  const galleries = {};

  return { profile, quickLinks, publications, news, posts, hiddenPosts, galleries };
})();
