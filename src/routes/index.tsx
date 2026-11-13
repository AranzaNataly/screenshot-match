import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Github, Sun, Moon, AtSign, MapPin, BookOpen, Music2, CookingPot, Anchor, Network, Feather, Plus, ChevronDown, ChevronUp, Instagram, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Constellation } from '@/components/constellation';
import { deliveries, deliveryLink, aboutParagraphs, manifestoParagraphs, type Delivery } from '@/lib/portfolio-data';
import portraitAsset from '@/assets/nataly-portrait.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Nataly de Souza Arantes · AranzaNataly' },
    { name: 'description', content: 'O portfólio de Nataly: minhas entregas, descobertas e sonhos. Conheça AranzaNataly, de Varginha, MG.' },
    { property: 'og:title', content: 'Nataly de Souza Arantes · AranzaNataly' },
    { property: 'og:description', content: 'Curiosa, dedicada, criativa, determinada, sonhadora e apaixonada por aprender coisas novas.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Portfolio,
});

// Desenhos abstratos identificam as entregas; não representam trabalhos já concluídos.
function DeliveryArt({ art }: { art: Delivery['art'] }) {
  if (art === 'album') return <div className="art-vinyl" />;
  if (art === 'dashboard') return <div className="dashboard-art"><span /><span /><span /><span /><span /></div>;
  const Icon = art === 'tree' ? Network : art === 'anchor' ? Anchor : Feather;
  return <div className={art === 'tree' ? 'branch-art' : art === 'anchor' ? 'anchor-art' : 'manifest-art'}><Icon className="large-art-icon" /></div>;
}

function DeliveryTicket({ delivery }: { delivery: Delivery }) {
  const url = deliveryLink(delivery);
  const cover = delivery.cover;
  return <article className={`ticket reveal ${url ? '' : 'upcoming'}${cover ? ' has-cover' : ''}`}>
    {cover ? <a className="ticket-cover" href={cover} target="_blank" rel="noreferrer"><img src={cover} alt={`Capa de ${delivery.title}, criada por Nataly de Souza Arantes`} /></a> : <div className="ticket-art" aria-hidden="true"><span className="art-label">ARANZANATALY / {delivery.art.toUpperCase()}</span><div className="ticket-art-inner"><DeliveryArt art={delivery.art} /></div><span className="art-index">Nº {delivery.number}</span></div>}
    <div className="ticket-main">
      <div className="ticket-body"><div className="ticket-meta"><span>ENTREGA {delivery.number}</span><span className="status">{delivery.status}</span></div><h3>{delivery.title}</h3><p className="ticket-learning">O que aprendi: {delivery.learning}</p>{delivery.tracks ? <div className="ticket-tracks-block"><p className="ticket-tracks-title">AS FAIXAS</p><ul className="ticket-tracks">{delivery.tracks.map((track, index) => <li key={track.title}><span>{index + 1}</span><div><strong>{track.title}</strong><em>{track.note}</em></div></li>)}</ul></div> : null}</div>
      <div className="ticket-footer"><span>{delivery.date}</span>{url ? <a href={url} target="_blank" rel="noreferrer">Ver no GitHub <ArrowUpRight size={12} /></a> : <span className="barcode" aria-hidden="true" />}</div>
    </div>
  </article>;
}

function Portfolio() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [seconds, setSeconds] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  // Os efeitos só acessam o navegador após a página carregar.
  useEffect(() => {
    const start = Date.now();
    const timer = window.setInterval(() => setSeconds(Math.floor((Date.now() - start) / 1000)), 1000);
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!media.matches) document.body.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => { clearInterval(timer); window.removeEventListener('scroll', updateProgress); observer.disconnect(); document.body.classList.remove('motion-ready'); };
  }, []);
  useEffect(() => { document.documentElement.dataset['theme'] = theme; }, [theme]);

  return <>
    <div ref={progressRef} className="reading-progress" aria-hidden="true" />
    <header className="site-header"><div className="container header-inner">
      <a href="#inicio" className="brand" aria-label="AranzaNataly, início"><span className="brand-star" aria-hidden="true">✳</span><span>AranzaNataly<span className="brand-dot">.</span></span></a>
      <nav className="nav-links" aria-label="Navegação principal"><a href="#sobre">Sobre mim</a><a href="#entregas">Minhas entregas</a><a href="#manifesto">Manifesto</a></nav>
      <div className="header-actions"><Button variant="ghost" size="icon" className="icon-control" title={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'} aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}</Button><Button variant="outline" asChild className="outline-action"><a href="#contato">Vamos conversar <ArrowUpRight size={13} /></a></Button></div>
    </div></header>
    <main>
      <section id="inicio" className="hero" aria-labelledby="hero-title"><Constellation />
        <div className="side-note note-left"><div className="note-line" />16 anos de curiosidade.<br />Varginha, MG · Brasil</div>
        <div className="side-note note-right"><div className="note-line" />Entre códigos, músicas<br />e novas possibilidades.</div>
        <div className="hero-content"><p className="eyebrow"><span className="small-dot" /> MEU CANTINHO NA INTERNET</p>
          <div className="portrait-stage"><div className="vinyl" aria-hidden="true" /><div ref={portraitRef} className="portrait-shell" onMouseMove={event => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const rect = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.transform = `rotateY(${(event.clientX - rect.left - rect.width / 2) / 13}deg) rotateX(${-(event.clientY - rect.top - rect.height / 2) / 13}deg)`;
          }} onMouseLeave={() => { if (portraitRef.current) portraitRef.current.style.transform = ''; }}><img className="portrait" src={portraitAsset.url} alt="Nataly de Souza Arantes sentada ao ar livre" /></div><span className="portrait-spark" aria-hidden="true">✧</span></div>
          <h1 id="hero-title">Nataly de<br /><span>Souza Arantes</span></h1>
          <div className="artist-name"><AtSign size={12} /> AranzaNataly</div>
          <p className="hero-description">Curiosa, dedicada, criativa, determinada, sonhadora<br className="hidden sm:block" /> e apaixonada por aprender coisas novas.</p>
          <div className="hero-buttons"><Button variant="outline" asChild className="outline-action"><a href="#entregas">Explorar minhas entregas <ArrowDown size={13} /></a></Button><Button variant="outline" asChild className="outline-action quiet-action"><a href="https://github.com/AranzaNataly" target="_blank" rel="noreferrer"><Github size={14} /> Meu GitHub <ArrowUpRight size={12} /></a></Button></div>
          <a className="scroll-note" href="#sobre"><ArrowDown size={12} /> Tem mais de mim por aqui</a>
        </div>
        <svg className="wave" viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 25Q360 0 720 25T1440 25V40H0Z" fill="currentColor" /></svg>
      </section>
      <section id="sobre" className="about-section" aria-labelledby="about-title"><div className="container about-grid reveal">
        <div><p className="section-index">01 / UM POUCO DE MIM</p><h2 id="about-title" className="section-title">Muito além do código.</h2><p className="about-intro">Cozinhar, ouvir música e ler livros de romance. Três coisas que me definem.</p><div className="interest-list"><span><CookingPot size={14} /> Culinária</span><span><Music2 size={14} /> Música</span><span><BookOpen size={14} /> Romance</span></div></div>
        <div className="about-copy">{aboutParagraphs.map(p => <p key={p}>{p}</p>)}<div className="about-foot"><span><MapPin size={11} className="inline mr-1" /> Varginha, MG</span><span>Técnico Informática para Internet</span><span>Futuro: Engenharia de Software ou design</span></div></div>
      </div></section>
      <section id="entregas" className="deliveries-section" aria-labelledby="deliveries-title"><div className="container">
        <div className="section-heading reveal"><div><p className="section-index">02 / MEU PERCURSO</p><h2 id="deliveries-title" className="section-title">Minhas entregas<span className="text-primary">.</span></h2><p className="section-subtitle">Um pedacinho de mim em cada projeto.</p></div><a className="github-note" href="https://github.com/AranzaNataly" target="_blank" rel="noreferrer"><Github size={14} /> Acompanhe no GitHub <ArrowUpRight size={13} /></a></div>
        <div className="ticket-grid">{deliveries.map(delivery => <DeliveryTicket key={delivery.number} delivery={delivery} />)}<div className="empty-ticket reveal"><Plus size={23} strokeWidth={1} /><div><h3>O próximo capítulo</h3><p>Em breve · [PREENCHER]</p></div></div><div className="empty-ticket reveal"><Plus size={23} strokeWidth={1} /><div><h3>Mais uma descoberta</h3><p>Em breve · [PREENCHER]</p></div></div></div>
      </div></section>
      <section id="manifesto" className="manifesto-section" aria-labelledby="manifesto-title"><div className="container manifesto-grid reveal"><div><p className="section-index">03 / NO QUE EU ACREDITO</p><h2 id="manifesto-title" className="manifesto-title">Meus sonhos.<br />Minha <span>essência.</span></h2></div><div className="manifesto-copy"><p>{manifestoParagraphs[0]}</p><div id="manifesto-completo" hidden={!expanded}><p className="mt-5">{manifestoParagraphs[1]}</p></div><Button variant="outline" className="outline-action" aria-expanded={expanded} aria-controls="manifesto-completo" onClick={() => setExpanded(!expanded)}>{expanded ? 'Recolher manifesto' : 'Ler manifesto completo'}{expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}</Button></div></div></section>
    </main>
    <footer id="contato" className="contact-section"><div className="container"><div className="contact-top reveal"><div><p className="section-index">04 / A GENTE SE ENCONTRA</p><h2 className="contact-title">Vamos <span>conversar?</span></h2></div><div className="contact-links"><Button variant="outline" className="outline-action" asChild><a href="mailto:desouzanataly01@gmail.com"><Mail size={14} /> E-mail <ArrowUpRight size={12} /></a></Button><Button variant="outline" className="outline-action" asChild><a href="https://www.instagram.com/nataly._souza/" target="_blank" rel="noreferrer"><Instagram size={14} /> Instagram <ArrowUpRight size={12} /></a></Button><Button variant="outline" className="outline-action" asChild><a href="https://github.com/AranzaNataly" target="_blank" rel="noreferrer"><Github size={14} /> GitHub <ArrowUpRight size={12} /></a></Button></div></div><div className="footer-bottom"><span className="footer-signature">Nataly de Souza Arantes · AranzaNataly</span><a href="mailto:desouzanataly01@gmail.com">desouzanataly01@gmail.com</a><span>Você está aqui há {seconds} segundos.</span></div></div></footer>
  </>;
}
