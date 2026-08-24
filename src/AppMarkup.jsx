/* eslint-disable react/no-unknown-property */
import {
  Menu,
  Cpu,
  Heart,
  Code2,
  Palette,
  FileText,
  Lock,
  Github,
  Linkedin,
  MessageCircle,
  Mail,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PricingSection } from './PricingSection.jsx';
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
                      <li><a href="#hero">Home</a></li>
                      <li><a href="#about">About</a></li>
                      <li><a href="#experience">Experience</a></li>
                      <li><a href="#education">Education</a></li>
                      <li><a href="#skills">Skills</a></li>
                      <li><a href="#services">Services</a></li>
                      <li><a href="#projects">Projects</a></li>
                      <li><a href="#contact">Contact</a></li>
                      <li className="nav-hire-item"><a href="#contact" className="nav-hire-mobile">Contact Patrick</a></li>
                  </ul>
                  <div className="nav-trailing">
                      <a href="#contact" className="hire-now-btn">Contact</a>
                      <button type="button" className="nav-theme-icon" id="themePanelOpen" aria-label="Toggle light and dark mode">
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
                          Data • Documents • Client Support • Ghana
                      </p>
                      <h1>Patrick Benchog</h1>
                      <p className="hero-headline tagline">Data, documentation and client support — with a technical edge.</p>
                      <p className="hero-lead">I work with people, records and systems. That includes entering and verifying information, supporting clients through established processes, preparing documents, and building practical websites and software when the work needs a technical solution.</p>
                      <div className="hero-stats" aria-label="Areas of work">
                          <div className="hero-stat">
                              <span className="hero-stat-value">Data &amp; records</span>
                              <span className="hero-stat-label">Entry, verification, database work</span>
                          </div>
                          <div className="hero-stat">
                              <span className="hero-stat-value">Client support</span>
                              <span className="hero-stat-label">Interviews, guidance, communication</span>
                          </div>
                          <div className="hero-stat">
                              <span className="hero-stat-value">Documents</span>
                              <span className="hero-stat-label">Editing, formatting, preparation</span>
                          </div>
                          <div className="hero-stat">
                              <span className="hero-stat-value">Technology</span>
                              <span className="hero-stat-label">Websites, apps, design &amp; IT</span>
                          </div>
                      </div>
                      <div className="hero-cta-row">
                          <a href="#experience" className="cta-button cta-button--primary">View My Experience</a>
                          <a href="#projects" className="cta-button cta-button--ghost">View My Work</a>
                          <a href="#contact" className="glass-button slide-in-up hero-cv-btn">Contact Me</a>
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

          <section id="about" className="fade-in">
              <h2 className="section-title">About</h2>
              <div className="about-content">
                  <div className="about-image">
                      <img src="1750806398142.jpeg" alt="Patrick Benchog" loading="lazy" />
                  </div>
                  <div className="about-text">
                      <p>My work sits where data, people, documentation and technology meet.</p>
                      <p>I am in charge of the non-citizen Ghana Card registration in Techiman, Bono East, Ghana, through Margins ID Group. That work involves interviewing clients, collecting and entering identity information into a national database, reviewing supporting documents, and helping people complete the Ghana Card process accurately and confidentially.</p>
                      <p>Alongside that, I run PrimeDraft Services for academic and professional document support, and Benchog Labs for websites, apps, graphics design, mobile photography and IT support. I also hold a Bachelor of Science in Mechanical Engineering from the University for Development Studies.</p>
                      <p>I am looking for remote roles in data entry, records and administrative support, document work, operations support and client service — and I remain available for document, web and technology projects.</p>
                  </div>
              </div>
          </section>

          <section id="experience" className="fade-in">
              <h2 className="section-title">Experience</h2>
              <div className="experience-list">
                  <article className="experience-card">
                      <p className="experience-kicker">Current</p>
                      <h3>Margins ID Group</h3>
                      <p className="experience-role">Identity Management System (IMS)</p>
                      <p>In charge of the non-citizen Ghana Card registration in Techiman, Bono East, Ghana. The work depends on accurate data entry, careful document checks and clear client communication.</p>
                      <ul>
                          <li>Interview clients and collect identity information</li>
                          <li>Enter and process information in a national database</li>
                          <li>Review supporting documentation and verify details</li>
                          <li>Assist clients through the registration process</li>
                          <li>Handle sensitive personal and identity information confidentially</li>
                          <li>Follow established procedures and keep accurate records</li>
                      </ul>
                  </article>
                  <article className="experience-card">
                      <p className="experience-kicker">Business</p>
                      <h3>PrimeDraft Services</h3>
                      <p className="experience-role">Document support</p>
                      <p>A document-support practice for students and professionals. Requests are managed from first brief through delivery.</p>
                      <ul>
                          <li>Editing, proofreading and formatting of academic and professional documents</li>
                          <li>Document preparation, including CVs and presentation layout</li>
                          <li>Client communication, request handling and deadline management</li>
                          <li>Careful handling of confidential files</li>
                      </ul>
                  </article>
                  <article className="experience-card">
                      <p className="experience-kicker">Business</p>
                      <h3>Benchog Labs</h3>
                      <p className="experience-role">Technology and digital solutions</p>
                      <p>My technology initiative for practical digital work. The focus is understanding the problem, then delivering something people can actually use.</p>
                      <ul>
                          <li>Websites</li>
                          <li>Apps</li>
                          <li>Graphics design</li>
                          <li>Mobile photography</li>
                          <li>IT support</li>
                      </ul>
                  </article>
              </div>
          </section>

          <section id="education" className="fade-in">
              <h2 className="section-title">Education</h2>
              <article className="education-card">
                  <h3>Bachelor of Science in Mechanical Engineering</h3>
                  <p>University for Development Studies</p>
                  <p className="education-note">Specialization in thermo-fluids and energy. Engineering training still informs how I approach records, systems and problem-solving — it is not the centre of my current professional work.</p>
              </article>
          </section>
      
          
          <section id="skills" className="fade-in">
              <h2 className="section-title">Skills</h2>
              <div className="skills-grid skills-grid--grouped">
                  <div className="skill-category">
                      <h3><FileText {...iconProps} size={20} aria-hidden="true" /> Office &amp; productivity</h3>
                      <ul className="skill-chip-list">
                          <li>Microsoft Office</li>
                          <li>Microsoft Excel</li>
                          <li>Microsoft Word</li>
                          <li>Google Sheets</li>
                          <li>Google Docs</li>
                          <li>Google Workspace</li>
                      </ul>
                  </div>
                  <div className="skill-category">
                      <h3><Heart {...iconProps} size={20} aria-hidden="true" /> Data &amp; records</h3>
                      <ul className="skill-chip-list">
                          <li>Database Systems</li>
                          <li>Digital Records Management</li>
                      </ul>
                  </div>
                  <div className="skill-category">
                      <h3><Cpu {...iconProps} size={20} aria-hidden="true" /> Technology &amp; creative</h3>
                      <ul className="skill-chip-list">
                          <li>Web development</li>
                          <li>App development</li>
                          <li>IT Support</li>
                          <li>Graphics Design</li>
                          <li>Mobile Photography</li>
                      </ul>
                  </div>
              </div>
          </section>
      
          
          <section id="services" className="fade-in">
              <h2 className="section-title">Services</h2>
              <p className="section-lead">Work is grouped by the kind of help you need. Document services are delivered through PrimeDraft Services. Technology work is delivered through Benchog Labs.</p>
              <div className="services-groups">
                  <article className="service-group">
                      <h3>Data &amp; administrative support</h3>
                      <ul>
                          <li><strong>Data entry</strong> — accurate capture of records into databases and spreadsheets.</li>
                          <li><strong>Records management</strong> — organizing, reviewing and maintaining files so information stays usable.</li>
                          <li><strong>Information verification</strong> — checking documents and details before they are processed.</li>
                          <li><strong>Administrative support</strong> — process-following, documentation and day-to-day operations help.</li>
                      </ul>
                  </article>
                  <article className="service-group">
                      <h3>Document services <span>PrimeDraft Services</span></h3>
                      <ul>
                          <li><strong>Editing &amp; proofreading</strong> — grammar, structure and tone for academic and professional writing.</li>
                          <li><strong>Formatting</strong> — theses, reports and formal documents laid out to required standards.</li>
                          <li><strong>Document preparation</strong> — CVs, cover letters, thesis writing, assignments and presentation layout.</li>
                          <li><strong>AI content humanization</strong> — refining AI-generated text so it reads naturally and fits the brief.</li>
                          <li><strong>Client communication</strong> — clear briefs, revisions and deadline handling.</li>
                      </ul>
                  </article>
                  <article className="service-group">
                      <h3>Technology services <span>Benchog Labs</span></h3>
                      <ul>
                          <li><strong>Websites</strong> — business and personal sites that are live and easy to use.</li>
                          <li><strong>Apps</strong> — practical software for workflows, records and day-to-day operations.</li>
                          <li><strong>Graphics design</strong> — visuals for branding, marketing and communication.</li>
                          <li><strong>Mobile photography</strong> — portraits and photo work suited to professional presentation.</li>
                          <li><strong>IT support</strong> — Windows, Office setup, antivirus and software fixes.</li>
                      </ul>
                  </article>
              </div>
          </section>
      
              
          <section id="projects" className="fade-in">
              <h2 className="section-title">Projects</h2>
              <div className="projects-filter">
                  <button type="button" className="filter-btn active" data-filter="all">All Projects</button>
                  <button type="button" className="filter-btn" data-filter="app">Apps</button>
                  <button type="button" className="filter-btn" data-filter="web">Websites</button>
                  <button type="button" className="filter-btn" data-filter="data">Data Analytics</button>
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
                          <p className="project-card-excerpt">A personal finance manager for tracking income, expenses, budgets and savings in one place.</p>
                          <p className="project-impact">Built to give individuals a clearer view of their money, including accounts, reports and budgeting tools.</p>
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
                          <p className="project-card-excerpt">A stock management system for recording inventory, logging daily usage and producing reports.</p>
                          <p className="project-impact">Built to reduce repeated manual stock counts and keep workplace inventory easier to follow.</p>
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
                          <p className="project-card-excerpt">A fee management application for recording and managing payment transactions, including live fee information for clients.</p>
                          <p className="project-impact">Built around a real operational need: helping clients understand fees and requirements before they travel.</p>
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
                          <p className="project-card-excerpt">An Excel dashboard built from a furniture sales dataset to compare sales, profit and operational patterns.</p>
                          <p className="project-impact">The dashboard surfaces findings from the dataset — including a large sales total against a much smaller profit figure — so the numbers are easier to discuss.</p>
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
                          <p className="project-card-excerpt">An Excel dashboard built from marketing campaign data to review impressions, clicks, conversions and ROI.</p>
                          <p className="project-impact">The analysis is of the campaign dataset, not a live client account. It shows where reach did and did not convert.</p>
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
                          <p className="project-card-excerpt">The live website for PrimeDraft Services — document editing, proofreading and quote requests.</p>
                          <p className="project-impact">Built to present the document-support offer clearly and give clients a way to get in touch.</p>
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
                          </div>
                      </div>
                  </div>
      
                  
                  <div className="project-card" data-category="web">
                      <div className="project-card-cover">
                          <img src="BenchTech-Dashboard.png" alt="BenchTech Support — site preview" className="img-fallback-chain" data-fallback-srcs="BenchTech.png" />
                      </div>
                      <div className="project-card-body">
                          <h3>BenchTech Support</h3>
                          <p className="project-card-excerpt">A live IT support website covering Windows and Office setup, antivirus, software fixes and service booking.</p>
                          <p className="project-impact">Built so technical help is listed clearly and easy to request.</p>
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
                          <p className="project-card-excerpt">Posters, social designs and brand visuals.</p>
                          <p className="project-impact">A sample of layout and visual work — not a client case-study gallery.</p>
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
                          <p className="project-card-excerpt">Portraits and photo edits.</p>
                          <p className="project-impact">Personal visual work, included because it is part of the skills I actually use.</p>
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

                  <div className="project-card prompt-vault-card" data-category="ai" hidden aria-hidden="true" style={{"display":"none"}}>
                      <div className="project-card-cover project-card-cover--contain">
                          <div className="prompt-preview-snippet" aria-hidden="true">
                              <p>You are a strategic product architect with systems thinking...</p>
                              <p className="blur-line">[framework + persona calibration block hidden]</p>
                              <p>Return response in execution sequence with risk matrix and scorecard...</p>
                              <p className="blur-line">[proprietary response constraints hidden]</p>
                          </div>
                      </div>
                      <div className="project-card-body">
                          <h3>Prompt Vault</h3>
                          <p className="project-card-excerpt">A library of reusable AI prompt templates for product, operations and writing work. Full templates are available after purchase or authorized access.</p>
                          <p className="project-impact">Shown as a protected preview — not an open public product catalogue.</p>
                          <ul className="project-card-highlights">
                              <li>Reusable prompt frameworks</li>
                              <li>Templates for business and technical tasks</li>
                              <li>Locked sections available after purchase</li>
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
              <h2 className="section-title">Contact</h2>
              <div className="contact-content">
                  <div className="contact-card">
                      <h3>Let&apos;s talk about the work.</h3>
                      <p>If you are hiring for data, records, administrative or client-support work, or you need document or technology help, use the links below. LinkedIn is the best place to see my professional profile alongside this site.</p>
                      <div className="contact-actions">
                          <a href="Benchog Patrick_CV.pdf" className="cta-button cta-button--primary contact-cv-btn" target="_blank" rel="noopener">Download CV</a>
                      </div>
                      
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
                  Data, documents, people and practical technology.
              </div>
              <p style={{"marginBottom":"0.45rem"}}><a href="mailto:pat.benchog@gmail.com" style={{"color":"var(--accent-gold)","fontWeight":"700","textDecoration":"none"}}>pat.benchog@gmail.com</a> · <a href="https://www.linkedin.com/in/patrick-benchog" style={{"color":"var(--accent-gold)","fontWeight":"700","textDecoration":"none"}} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
              <p>&copy; 2026 Patrick Benchog. All rights reserved.</p>
          </footer>
    </>
  );
}
