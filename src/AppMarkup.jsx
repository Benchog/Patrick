/* eslint-disable react/no-unknown-property */
import {
  Menu,
  Cpu,
  Heart,
  Smartphone,
  Code2,
  BarChart3,
  Compass,
  Palette,
  Monitor,
  FileText,
  BrainCircuit,
  Lock,
  Github,
  Linkedin,
  MessageCircle,
  Mail,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PricingSection } from './PricingSection.jsx';
import { ToolStackIcons } from './ToolStackIcons.jsx';
import { ServiceRequestSection } from './ServiceRequestSection.jsx';

const iconProps = { className: 'icon-lucide', strokeWidth: 1.85, absoluteStrokeWidth: true };

export function AppMarkup() {
  return (
    <>
      <a className="skip-link" href="#mainContent">Skip to main content</a>
      
          
          <nav id="navbar">
              <div className="nav-container">
                  <a href="#hero" className="logo logo-with-icon" aria-label="Patrick — Home">
                      <Code2 {...iconProps} size={26} className="logo-nav-icon" aria-hidden="true" />
                      <span className="logo-wordmark">Patrick</span>
                  </a>
                  <ul className="nav-links" id="primaryNavLinks">
                      <li><a href="#hero">Profile</a></li>
                      
                      <li><a href="#skills">Skills</a></li>
                      <li><a href="#services">Services</a></li>
                      <li><a href="#projects">Projects</a></li>
                      <li><a href="#pricing">Pricing</a></li>
                      <li><a href="#contact">Contact</a></li>
                      <li className="nav-hire-item"><a href="#contact" className="nav-hire-mobile">Hire Patrick</a></li>
                  </ul>
                  <div className="nav-trailing">
                      <a href="#contact" className="hire-now-btn">Hire Patrick</a>
                      <button type="button" className="nav-theme-icon" id="themePanelOpen" aria-label="Open appearance settings">
                          <Palette {...iconProps} size={18} aria-hidden="true" />
                      </button>
                      <button type="button" className="menu-toggle" id="menuToggle" aria-label="Toggle navigation menu" aria-controls="primaryNavLinks" aria-expanded="false">
                          <Menu {...iconProps} size={22} aria-hidden="true" />
                      </button>
                  </div>
              </div>
          </nav>
          <div id="themePanelBackdrop" className="theme-panel-backdrop" aria-hidden="true"></div>
          <div id="themePanel" className="theme-panel" aria-hidden="true">
              <h4>Appearance</h4>
              <p>Press <strong>T</strong> or <strong>Ctrl+K</strong> anytime.</p>
              <div className="theme-options">
                  <button type="button" className="theme-option-btn" data-theme-choice="light">Light</button>
                  <button type="button" className="theme-option-btn" data-theme-choice="dark">Dark</button>
                  <button type="button" className="theme-option-btn full" data-theme-choice="toggle">Toggle</button>
              </div>
          </div>
      
          <main id="mainContent">
          
          <section id="hero" className="hero hero--premium">
              <div className="hero-portrait-bg" aria-hidden="true"></div>
              <div className="hero-grid-glow" aria-hidden="true"></div>
              <div className="hero-vignette" aria-hidden="true"></div>
              <div className="particles" id="particles"></div>
              <div className="hero-inner">
                  <div className="hero-copy">
                      <p className="hero-kicker">
                          <span className="hero-kicker-pulse" aria-hidden="true"></span>
                          Mechanical Engineer · Product builder · Techiman, Ghana
                      </p>
                      <h1>Patrick Benchog</h1>
                      <p className="hero-lead tagline">Mechanical Engineer and digital systems builder focused on creating premium apps, dashboards, and web platforms that solve real business friction.</p>
                      <div className="hero-stats" aria-label="Highlights">
                          <div className="hero-stat">
                              <span className="hero-stat-value">Full stack</span>
                              <span className="hero-stat-label">Apps, sites &amp; dashboards</span>
                          </div>
                          <div className="hero-stat">
                              <span className="hero-stat-value">Ops-first</span>
                              <span className="hero-stat-label">Built for real workflows</span>
                          </div>
                          <div className="hero-stat">
                              <span className="hero-stat-value">AI-native expert</span>
                              <span className="hero-stat-label">Strategic models, sharp judgment</span>
                          </div>
                          <div className="hero-stat">
                              <span className="hero-stat-value">Discipline</span>
                              <span className="hero-stat-label">Engineering + craft</span>
                          </div>
                      </div>
                      <ToolStackIcons />
                      <p className="caption hero-caption-tight">
                          <span className="rotating-text" id="rotatingText">App Builder</span> • Problem Solver • Fast Executor
                      </p>
                      <div className="hero-cta-row">
                          <a href="#contact" className="cta-button cta-button--primary">Get in Touch</a>
                          <a href="#projects" className="cta-button cta-button--ghost">View work</a>
                          <a href="Benchog Patrick_CV.pdf" className="glass-button slide-in-up hero-cv-btn" target="_blank" rel="noopener">Download CV</a>
                      </div>
                  </div>
                  <div className="hero-visual" aria-hidden="false">
                      <div className="hero-portrait-ring">
                          <div className="hero-portrait-ring-inner">
                              <img src="1750806398142.jpeg" alt="Patrick Benchog" />
                          </div>
                          <div className="hero-portrait-orbit" aria-hidden="true"></div>
                      </div>
                  </div>
              </div>
          </section>
      
          
          <section id="skills" className="fade-in">
              <h2 className="section-title">Skills</h2>
              <div className="skills-grid">
                  <div className="skill-category">
                      <h3><Cpu {...iconProps} size={20} aria-hidden="true" /> Hard Skills</h3>
                      <div className="skill-item">
                          <span>App Development</span>
                          <div className="skill-bar">
                              <div className="skill-progress" style={{"width":"90%"}}></div>
                          </div>
                      </div>
                      <div className="skill-item">
                          <span>Expert AI workflows</span>
                          <div className="skill-bar">
                              <div className="skill-progress" style={{"width":"95%"}}></div>
                          </div>
                      </div>
                      <div className="skill-item">
                          <span>Web Development</span>
                          <div className="skill-bar">
                              <div className="skill-progress" style={{"width":"88%"}}></div>
                          </div>
                      </div>
                      <div className="skill-item">
                          <span>Data Analysis & Dashboards</span>
                          <div className="skill-bar">
                              <div className="skill-progress" style={{"width":"82%"}}></div>
                          </div>
                      </div>
                      <div className="skill-item">
                          <span>CAD/CAM (Solid Edge & AutoCAD)</span>
                          <div className="skill-bar">
                              <div className="skill-progress" style={{"width":"85%"}}></div>
                          </div>
                      </div>
                      <div className="skill-item">
                          <span>Graphics & Photo Editing</span>
                          <div className="skill-bar">
                              <div className="skill-progress" style={{"width":"88%"}}></div>
                          </div>
                      </div>
                  </div>
                  <div className="skill-category">
                      <h3><Heart {...iconProps} size={20} aria-hidden="true" /> Soft Skills</h3>
                      <div className="skill-item">
                          <span>Leadership</span>
                          <div className="skill-bar">
                              <div className="skill-progress" style={{"width":"92%"}}></div>
                          </div>
                      </div>
                      <div className="skill-item">
                          <span>Problem-Solving</span>
                          <div className="skill-bar">
                              <div className="skill-progress" style={{"width":"96%"}}></div>
                          </div>
                      </div>
                      <div className="skill-item">
                          <span>Creativity</span>
                          <div className="skill-bar">
                              <div className="skill-progress" style={{"width":"94%"}}></div>
                          </div>
                      </div>
                      <div className="skill-item">
                          <span>Communication</span>
                          <div className="skill-bar">
                              <div className="skill-progress" style={{"width":"89%"}}></div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      
          
          <section id="services" className="fade-in">
              <h2 className="section-title">How I Change the Game</h2>
              <div className="services-grid">
                  <div className="service-card">
                      <div className="service-icon"><Smartphone {...iconProps} size={48} aria-hidden="true" /></div>
                      <h3>App Development</h3>
                      <p>Building real, fully functional cross-platform systems and web platforms that solve genuine problems — connected to backends, synced across devices, and ready for real users.</p>
                  </div>
                  <div className="service-card">
                      <div className="service-icon"><Code2 {...iconProps} size={48} aria-hidden="true" /></div>
                      <h3>Website Development</h3>
                      <p>Creating stunning, fast, and professional websites for businesses and individuals — deployed and live, not just mockups. From portfolios to full service websites.</p>
                  </div>
                  <div className="service-card">
                      <div className="service-icon"><BarChart3 {...iconProps} size={48} aria-hidden="true" /></div>
                      <h3>Data Analytics & Dashboards</h3>
                      <p>Turning raw data into clear, beautiful dashboards that tell the real story behind the numbers — built for decision-makers who need answers, not just charts.</p>
                  </div>
                  <div className="service-card">
                      <div className="service-icon"><Compass {...iconProps} size={48} aria-hidden="true" /></div>
                      <h3>CAD/CAM Engineering</h3>
                      <p>Professional mechanical design and engineering using Solid Edge and AutoCAD — from concept sketches to precise technical drawings ready for manufacturing.</p>
                  </div>
                  <div className="service-card">
                      <div className="service-icon"><Palette {...iconProps} size={48} aria-hidden="true" /></div>
                      <h3>Graphics & Photo Editing</h3>
                      <p>High-speed, high-quality graphics design and photo editing powered by modern tools — flyers, branding, visuals, and edits delivered with precision and creativity.</p>
                  </div>
                  <div className="service-card">
                      <div className="service-icon"><Monitor {...iconProps} size={48} aria-hidden="true" /></div>
                      <h3>IT Support & Computer Services</h3>
                      <p>Windows installation, software setup, system activation, antivirus, and all software-related fixes — fast, reliable, and professional tech support.</p>
                  </div>
                  <div className="service-card">
                      <div className="service-icon"><FileText {...iconProps} size={48} aria-hidden="true" /></div>
                      <h3>Document & Thesis Editing</h3>
                      <p>Expert proofreading, editing, formatting, and paraphrasing for academic and professional documents — structured, polished, and submission-ready.</p>
                  </div>
                  <div className="service-card">
                      <div className="service-icon"><BrainCircuit {...iconProps} size={48} aria-hidden="true" /></div>
                      <h3>Prompt Engineering Systems</h3>
                      <p>I design robust prompt workflows and reusable AI templates that generate production-ready outputs for content, products, automation, and business operations.</p>
                  </div>
              </div>
          </section>
      
              
          <section id="projects" className="fade-in">
              <h2 className="section-title">Proof of Impact</h2>
              <div className="projects-filter">
                  <button type="button" className="filter-btn active" data-filter="all">All Projects</button>
                  <button type="button" className="filter-btn" data-filter="app">Apps</button>
                  <button type="button" className="filter-btn" data-filter="web">Websites</button>
                  <button type="button" className="filter-btn" data-filter="data">Data Analytics</button>
                  <button type="button" className="filter-btn" data-filter="ai">AI Systems</button>
                  <button type="button" className="filter-btn" data-filter="design">Design</button>
                  <button type="button" className="filter-btn" data-filter="photography">Photography</button>
              </div>
              <div className="projects-carousel-shell">
              <button type="button" className="projects-carousel-btn projects-carousel-btn--prev" data-projects-carousel="prev" aria-label="Previous projects">
                  <ChevronLeft {...iconProps} size={28} aria-hidden="true" />
              </button>
              <div className="projects-grid" id="projectsCarouselTrack">
      
                  
                  <div className="project-card" data-category="app">
                      <div className="project-card-cover">
                          <img src="Dashboard.png" alt="The Optimist — main dashboard" />
                      </div>
                      <div className="project-card-body">
                          <h3>The Optimist</h3>
                          <p className="project-card-excerpt">Turn financial confusion into total clarity.</p>
                          <p className="project-impact">Impact: helps users move from money stress to structured financial control.</p>
                          <ul className="project-card-highlights">
                              <li>Complete personal finance management system</li>
                              <li>Real-time budgeting and smart alerts</li>
                              <li>AI-powered financial guidance</li>
                          </ul>
                          <div className="project-tags">
                              <span className="tag">Cross-platform</span>
                              <span className="tag">Cloud backend</span>
                              <span className="tag">Supabase</span>
                              <span className="tag">AI-accelerated</span>
                          </div>
                          <div className="project-card-actions">
                              <button type="button" className="btn-view-project" data-project="optimist">View Project</button>
                              <a href="https://theoptimist.pages.dev/" className="btn-project-live" target="_blank" rel="noopener">Live App ↗</a>
                          </div>
                      </div>
                  </div>
      
                  
                  <div className="project-card" data-category="app">
                      <div className="project-card-cover">
                          <img src="SP-Dashboard.png" alt="StockPulse — supervisor dashboard" />
                      </div>
                      <div className="project-card-body">
                          <h3>StockPulse</h3>
                          <p className="project-card-excerpt">Stop counting stock every week — automate it.</p>
                          <p className="project-impact">Impact: cuts manual stock workload and improves inventory accuracy.</p>
                          <ul className="project-card-highlights">
                              <li>Automated inventory tracking system</li>
                              <li>Daily usage logging with real-time updates</li>
                              <li>Instant report generation and sharing</li>
                          </ul>
                          <div className="project-tags">
                              <span className="tag">Cross-platform</span>
                              <span className="tag">Automation</span>
                              <span className="tag">Reports</span>
                              <span className="tag">Inventory systems</span>
                          </div>
                          <div className="project-card-actions">
                              <button type="button" className="btn-view-project" data-project="stockpulse">View Project</button>
                              <a href="https://stockpulse-pb.pages.dev/" className="btn-project-live" target="_blank" rel="noopener">Live App ↗</a>
                          </div>
                      </div>
                  </div>
      
                  
                  <div className="project-card" data-category="app">
                      <div className="project-card-cover">
                          <img src="IMS-Dash.png" alt="IMS Fee App — main dashboard" />
                      </div>
                      <div className="project-card-body">
                          <h3>IMS Fee App</h3>
                          <p className="project-card-excerpt">Know exactly what to pay before you arrive.</p>
                          <p className="project-impact">Impact: reduces wasted trips and uncertainty for non-citizen clients.</p>
                          <ul className="project-card-highlights">
                              <li>Real-time fee calculation system</li>
                              <li>Weekly dollar rate updates</li>
                              <li>Eliminates client uncertainty and wasted trips</li>
                          </ul>
                          <div className="project-tags">
                              <span className="tag">Cross-platform</span>
                              <span className="tag">Non-citizens Ghana</span>
                              <span className="tag">Live fees</span>
                              <span className="tag">Client operations</span>
                          </div>
                          <div className="project-card-actions">
                              <button type="button" className="btn-view-project" data-project="ims">View Project</button>
                              <a href="https://nia-fees.pages.dev/" className="btn-project-live" target="_blank" rel="noopener">Live App ↗</a>
                          </div>
                      </div>
                  </div>
      
                  
                  <div className="project-card" data-category="data">
                      <div className="project-card-cover project-card-cover--contain">
                          <img src="Furniture_Sales_Dashboard-.png" alt="Furniture sales dashboard preview" className="img-fallback-chain" data-fallback-srcs="Furniture_Sales_Dashboard.png,Furniture_Sales_Dashboard.svg" />
                      </div>
                      <div className="project-card-body">
                          <h3>Furniture Sales Dashboard</h3>
                          <p className="project-card-excerpt">Uncovering hidden profit leaks in sales performance.</p>
                          <p className="project-impact">Impact: highlights margin leakage despite strong topline revenue.</p>
                          <ul className="project-card-highlights">
                              <li>$741K+ sales data analyzed</li>
                              <li>Identified low profit margins</li>
                              <li>Revealed operational inefficiencies</li>
                          </ul>
                          <div className="project-tags">
                              <span className="tag">Excel</span>
                              <span className="tag">Sales analytics</span>
                              <span className="tag">Profit insights</span>
                          </div>
                          <div className="project-card-actions">
                              <button type="button" className="btn-view-project" data-project="furniture">View Project</button>
                          </div>
                      </div>
                  </div>
      
                  
                  <div className="project-card" data-category="data">
                      <div className="project-card-cover project-card-cover--contain">
                          <img src="Marketing_Performance_Dashboard%20.png" alt="Marketing performance dashboard preview" className="img-fallback-chain" data-fallback-srcs="Marketing_Performance_Dashboard.png,Marketing_Performance_Dashboard_.png,Marketing_Performance_Dashboard.svg" />
                      </div>
                      <div className="project-card-body">
                          <h3>Marketing Campaign Dashboard</h3>
                          <p className="project-card-excerpt">Massive reach means nothing without conversion.</p>
                          <p className="project-impact">Impact: pinpoints where campaign spend loses value and where ROI wins.</p>
                          <ul className="project-card-highlights">
                              <li>1.1B impressions analyzed</li>
                              <li>Conversion funnel breakdown</li>
                              <li>ROI optimization insights</li>
                          </ul>
                          <div className="project-tags">
                              <span className="tag">Excel</span>
                              <span className="tag">Campaign analytics</span>
                              <span className="tag">ROI</span>
                          </div>
                          <div className="project-card-actions">
                              <button type="button" className="btn-view-project" data-project="marketing">View Project</button>
                          </div>
                      </div>
                  </div>
      
                  
                  <div className="project-card" data-category="web">
                      <div className="project-card-cover">
                          <img src="PrimeDraft-Home.png" alt="PrimeDraft Services — site preview" className="img-fallback-chain" data-fallback-srcs="Primed.png" />
                      </div>
                      <div className="project-card-body">
                          <h3>PrimeDraft Services</h3>
                          <p className="project-card-excerpt">Business site for document editing &amp; proofreading: services, testimonials, and quote flow — deployed and live on Vercel.</p>
                          <p className="project-impact">Impact: sharper brand credibility and lead-ready service presentation.</p>
                          <ul className="project-card-highlights">
                              <li>Service clarity and offer positioning</li>
                              <li>Trust-building reviews and proof points</li>
                              <li>Conversion-focused contact flow</li>
                          </ul>
                          <div className="project-tags">
                              <span className="tag">Website</span>
                              <span className="tag">Business</span>
                              <span className="tag">Deployed</span>
                          </div>
                          <div className="project-card-actions">
                              <button type="button" className="btn-view-project" data-project="primed">View Project</button>
                              <a href="https://primedraftservices.vercel.app" className="btn-project-live" target="_blank" rel="noopener">Visit Site ↗</a>
                          </div>
                      </div>
                  </div>
      
                  
                  <div className="project-card" data-category="web">
                      <div className="project-card-cover">
                          <img src="BenchTech-Dashboard.png" alt="BenchTech Support — site preview" className="img-fallback-chain" data-fallback-srcs="BenchTech.png" />
                      </div>
                      <div className="project-card-body">
                          <h3>BenchTech Support</h3>
                          <p className="project-card-excerpt">IT support brand site: Windows &amp; Office setup, antivirus, software fixes, and emergency help — live on GitHub Pages.</p>
                          <p className="project-impact">Impact: converts technical services into a clear trust-first customer journey.</p>
                          <ul className="project-card-highlights">
                              <li>Clear service catalog for quick trust</li>
                              <li>Simple route to request immediate help</li>
                              <li>Professional presentation for IT credibility</li>
                          </ul>
                          <div className="project-tags">
                              <span className="tag">Website</span>
                              <span className="tag">IT Services</span>
                              <span className="tag">Deployed</span>
                          </div>
                          <div className="project-card-actions">
                              <button type="button" className="btn-view-project" data-project="benchtech">View Project</button>
                              <a href="https://benchog.github.io/BenchTech-Support/" className="btn-project-live" target="_blank" rel="noopener">Visit Site ↗</a>
                          </div>
                      </div>
                  </div>
      
                  
                  <div className="project-card" data-category="design">
                      <div className="project-card-cover project-card-cover--tight">
                          <img src="Fast%20Food.png" alt="Design gallery preview" className="img-fallback-chain" data-fallback-srcs="Opti%20Deco%201.png,Social%20Media%20Shoe%20poster.png,WEB.png" />
                      </div>
                      <div className="project-card-body">
                          <h3>Design Gallery</h3>
                          <p className="project-card-excerpt">Posters, social designs, and brand visuals — built with clean hierarchy, strong contrast, and attention to detail.</p>
                          <p className="project-impact">Impact: turns ideas into visuals that communicate fast and look premium.</p>
                          <ul className="project-card-highlights">
                              <li>Posters and social creatives</li>
                              <li>Brand + layout consistency</li>
                              <li>High-clarity visual storytelling</li>
                          </ul>
                          <div className="project-tags">
                              <span className="tag">Design</span>
                              <span className="tag">Brand</span>
                              <span className="tag">Visual systems</span>
                          </div>
                          <div className="project-card-actions">
                              <button type="button" className="btn-view-gallery" data-gallery-kind="design">View Gallery</button>
                          </div>
                      </div>
                  </div>
      
                  
                  <div className="project-card" data-category="photography">
                      <div className="project-card-cover">
                          <img src="file_000000000234722f9a7e16dd667d455d.png" alt="Photography gallery preview" className="img-fallback-chain" data-fallback-srcs="file_00000000989471fda7bae3382546014a.png,wmremove-transformed.jpeg" />
                      </div>
                      <div className="project-card-body">
                          <h3>Photography Gallery</h3>
                          <p className="project-card-excerpt">Portraits and real moments — edited for clean tones, strong focus, and a calm, confident look.</p>
                          <p className="project-impact">Impact: visual work that supports personal brand and professional presentation.</p>
                          <ul className="project-card-highlights">
                              <li>Portraits and edits</li>
                              <li>Tone and light control</li>
                              <li>Clean, professional finish</li>
                          </ul>
                          <div className="project-tags">
                              <span className="tag">Photography</span>
                              <span className="tag">Editing</span>
                              <span className="tag">Portrait</span>
                          </div>
                          <div className="project-card-actions">
                              <button type="button" className="btn-view-gallery" data-gallery-kind="photography">View Gallery</button>
                          </div>
                      </div>
                  </div>

                  <div className="project-card prompt-vault-card" data-category="ai">
                      <div className="project-card-cover project-card-cover--contain">
                          <div className="prompt-preview-snippet" aria-hidden="true">
                              <p>You are a strategic product architect with systems thinking...</p>
                              <p className="blur-line">[framework + persona calibration block hidden]</p>
                              <p>Return response in execution sequence with risk matrix and scorecard...</p>
                              <p className="blur-line">[proprietary response constraints hidden]</p>
                          </div>
                      </div>
                      <div className="project-card-body">
                          <h3>Prompt Vault: Elite AI Templates</h3>
                          <p className="project-card-excerpt">Premium templates for generating high-quality outputs fast across product, marketing, and operations workflows.</p>
                          <p className="project-impact">Impact: converts hours of drafting into repeatable outputs in minutes.</p>
                          <ul className="project-card-highlights">
                              <li>Battle-tested prompt architecture blocks</li>
                              <li>Domain-specific templates (business + technical)</li>
                              <li>Locked premium sections available after purchase</li>
                          </ul>
                          <div className="project-tags">
                              <span className="tag">Prompt Engineering</span>
                              <span className="tag">Template Systems</span>
                              <span className="tag">AI Ops</span>
                          </div>
                          <div className="project-card-actions">
                              <button type="button" className="btn-view-project" data-project="promptvault">View Project</button>
                              <a href="#service-request" className="btn-project-live">Request Access</a>
                          </div>
                          <p className="prompt-lock-note"><Lock {...iconProps} size={14} aria-hidden="true" /> Protected preview. Full templates unlock after purchase.</p>
                      </div>
                  </div>
      
              </div>
              <button type="button" className="projects-carousel-btn projects-carousel-btn--next" data-projects-carousel="next" aria-label="Next projects">
                  <ChevronRight {...iconProps} size={28} aria-hidden="true" />
              </button>
              </div>
              <div className="project-flow-strip" aria-label="Project screenshot highlights">
                  <div className="project-flow-track">
                      <img src="Dashboard.png" alt="The Optimist screenshot" />
                      <img src="SP-Dashboard.png" alt="StockPulse screenshot" />
                      <img src="IMS-Dash.png" alt="IMS app screenshot" />
                      <img src="Furniture_Sales_Dashboard-.png" alt="Furniture dashboard screenshot" className="img-fallback-chain" data-fallback-srcs="Furniture_Sales_Dashboard.png,Furniture_Sales_Dashboard.svg" />
                      <img src="Marketing_Performance_Dashboard%20.png" alt="Marketing dashboard screenshot" className="img-fallback-chain" data-fallback-srcs="Marketing_Performance_Dashboard.png,Marketing_Performance_Dashboard_.png,Marketing_Performance_Dashboard.svg" />
                      <img src="PrimeDraft-Home.png" alt="PrimeDraft screenshot" className="img-fallback-chain" data-fallback-srcs="Primed.png" />
                      <img src="BenchTech-Dashboard.png" alt="BenchTech screenshot" className="img-fallback-chain" data-fallback-srcs="BenchTech.png" />
                      <img src="Dashboard.png" alt="The Optimist screenshot duplicate" />
                      <img src="SP-Dashboard.png" alt="StockPulse screenshot duplicate" />
                      <img src="IMS-Dash.png" alt="IMS app screenshot duplicate" />
                      <img src="Furniture_Sales_Dashboard-.png" alt="Furniture dashboard screenshot duplicate" className="img-fallback-chain" data-fallback-srcs="Furniture_Sales_Dashboard.png,Furniture_Sales_Dashboard.svg" />
                      <img src="Marketing_Performance_Dashboard%20.png" alt="Marketing dashboard screenshot duplicate" className="img-fallback-chain" data-fallback-srcs="Marketing_Performance_Dashboard.png,Marketing_Performance_Dashboard_.png,Marketing_Performance_Dashboard.svg" />
                      <img src="PrimeDraft-Home.png" alt="PrimeDraft screenshot duplicate" className="img-fallback-chain" data-fallback-srcs="Primed.png" />
                      <img src="BenchTech-Dashboard.png" alt="BenchTech screenshot duplicate" className="img-fallback-chain" data-fallback-srcs="BenchTech.png" />
                  </div>
              </div>
          </section>
      
          <PricingSection />
          <ServiceRequestSection />
      
              
          <section id="contact" className="fade-in" tabIndex={-1} aria-label="Contact">
              <h2 className="section-title">Let's Build the Future</h2>
              <div className="contact-content">
                  <div className="contact-card">
                      <h3>Let us build something that moves results.</h3>
                      <p>I design and ship practical apps, websites, dashboards, and digital assets that solve real operational problems. If you are hiring, collaborating, or scaling a project, I am ready to contribute fast with clear communication and execution.</p>
                      
                      <div className="social-links">
                          <a href="https://github.com/Benchog" className="social-link" title="GitHub" target="_blank" rel="noopener noreferrer">
                              <Github {...iconProps} size={22} aria-hidden="true" />
                          </a>
                          <a href="https://www.linkedin.com/in/patrick-benchog" className="social-link" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                              <Linkedin {...iconProps} size={22} aria-hidden="true" />
                          </a>
                          <a href="https://wa.me/233240025563" className="social-link" title="WhatsApp" target="_blank" rel="noopener noreferrer">
                              <MessageCircle {...iconProps} size={22} aria-hidden="true" />
                          </a>
                          <a href="mailto:pat.benchog@gmail.com" className="social-link" title="Email pat.benchog@gmail.com" rel="noopener noreferrer">
                              <Mail {...iconProps} size={22} aria-hidden="true" />
                          </a>
                      </div>
                  </div>
              </div>
          </section>
          </main>
      
          <div id="projectModal" className="project-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="projectModalTitle">
              <div className="project-modal-backdrop" data-close-modal tabIndex={-1}></div>
              <div className="project-modal-panel">
                  <button type="button" className="project-modal-close" data-close-modal aria-label="Close">&times;</button>
                  <div className="project-modal-scroll" id="projectModalBody"></div>
              </div>
          </div>
      
          <div id="collectionModal" className="collection-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Gallery collection">
              <div className="collection-modal-backdrop" data-close-collection></div>
              <div className="collection-modal-panel">
                  <button type="button" className="collection-modal-close" data-close-collection aria-label="Close">&times;</button>
                  <div className="collection-modal-scroll">
                      <p className="collection-modal-kicker" id="collectionKicker">Collection</p>
                      <h2 className="collection-modal-title" id="collectionTitle">Gallery</h2>
                      <p className="collection-modal-intro" id="collectionIntro"></p>
                      <section id="gallery">
                          <p className="gallery-intro">When I'm not building apps, I'm usually behind a camera or a layout — cleaning up light, tightening type, or trying to make something people actually stop for. These are pieces I still like when I look back: not every file on my drive, but work that felt honest when I made it.</p>
                          <div className="gallery-filter" role="tablist" aria-label="Gallery filters">
                              <button type="button" className="gallery-filter-btn active" data-gallery-filter="all">All</button>
                              <button type="button" className="gallery-filter-btn" data-gallery-filter="photography">Photography</button>
                              <button type="button" className="gallery-filter-btn" data-gallery-filter="design">Design</button>
                          </div>
                          <p id="galleryLoadNote" className="gallery-load-note" style={{"display":"none"}} aria-live="polite"></p>
                          <div id="galleryStudio" className="gallery-studio" style={{"display":"none"}}>
                              <div className="gallery-stage-wrap">
                                  <button type="button" className="gallery-stage-btn" id="galleryStagePrev" aria-label="Previous piece">&#8249;</button>
                                  <button type="button" className="gallery-stage" id="galleryStageOpen" aria-label="Open fullscreen viewer">
                                      <img id="galleryStageImg" alt="" loading="lazy" />
                                      <div className="gallery-stage-overlay">
                                          <div className="gallery-stage-title" id="galleryStageTitle"></div>
                                          <div className="gallery-stage-row">
                                              <span className="gallery-stage-pill" id="galleryStagePill"></span>
                                              <span className="gallery-stage-hint">Tap to expand</span>
                                          </div>
                                      </div>
                                  </button>
                                  <button type="button" className="gallery-stage-btn" id="galleryStageNext" aria-label="Next piece">&#8250;</button>
                              </div>
                              <div className="gallery-strip-wrap">
                                  <div id="galleryStrip" className="gallery-strip" role="list" aria-label="Gallery thumbnails"></div>
                              </div>
                              <div className="gallery-foot" id="galleryFoot" aria-live="polite"></div>
                          </div>
                      </section>
                  </div>
              </div>
          </div>
      
          <div id="galleryLightbox" className="gallery-lightbox" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Gallery viewer">
              <div className="gallery-lightbox-backdrop" data-close-gallery></div>
              <div className="gallery-lightbox-panel">
                  <button type="button" className="gallery-lightbox-close" data-close-gallery aria-label="Close">&times;</button>
                  <button type="button" className="gallery-lightbox-nav prev" data-gallery-prev aria-label="Previous">&#8249;</button>
                  <button type="button" className="gallery-lightbox-nav next" data-gallery-next aria-label="Next">&#8250;</button>
                  <figure className="gallery-lightbox-figure">
                      <img id="galleryLightboxImg" alt="" />
                      <figcaption id="galleryLightboxCaption" className="gallery-lightbox-caption"></figcaption>
                  </figure>
              </div>
          </div>
      
          
          <footer>
              <div className="footer-mantra">
                  "Built with optimism. Powered by innovation. Driven to leave a mark on this world."
              </div>
              <p style={{"marginBottom":"0.45rem"}}>Recruiting? <a href="mailto:pat.benchog@gmail.com" style={{"color":"var(--accent-gold)","fontWeight":"700","textDecoration":"none"}}>Hire Patrick now</a> — response is fast.</p>
              <p>&copy; 2026 Patrick Benchog - Optimistic. All rights reserved.</p>
          </footer>
    </>
  );
}
