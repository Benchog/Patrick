import { useCallback, useEffect, useRef, useState } from 'react';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';

const iconProps = { className: 'icon-lucide', strokeWidth: 1.85, absoluteStrokeWidth: true };

const WELCOME_TEXT = `Hi. I can help you find the right part of Patrick's site.

He works with **data, records, documents and clients**. He **handles non-citizen Ghana Card registration in Techiman, Bono East, Ghana**, and also offers websites, apps, graphics, photography and IT support through Benchog Labs.

• **Hiring / remote work**: Experience, About and Skills
• **Document support**: PrimeDraft Services
• **Websites, apps, design, IT**: Benchog Labs
• **Contact**: email, LinkedIn, WhatsApp and CV download

What would you like to know?`;

const SERVICE_CHIPS = [
  { label: 'Hiring / experience', prompt: 'I am a recruiter or employer. Summarize Patrick\'s current experience and how to contact him.' },
  { label: 'Data & records', prompt: 'Tell me about Patrick\'s Ghana Card registration work and records responsibilities.' },
  { label: 'Documents', prompt: 'What document services does Patrick offer through PrimeDraft?' },
  { label: 'Benchog Labs', prompt: 'What does Benchog Labs offer?' },
  { label: 'IT support', prompt: 'IT support and computer services: scope and how to get help.' },
  { label: 'Contact', prompt: 'I want to contact Patrick: email, LinkedIn and other options.', goToContact: true },
];

/** User wants to book, hire, or reach out — scroll main page to #contact */
function shouldScrollToContact(text) {
  const t = text.toLowerCase();
  if (/\b(go to contact|jump to contact|contact section|#contact)\b/.test(t)) return true;
  if (/\b(book|booking|book a call|book him|hire|hiring|reach out|get in touch)\b/.test(t)) return true;
  if (/\b(work with (patrick|you|him)|start (a |the )?project|request (a |the )?(quote|proposal)|commission)\b/.test(t)) return true;
  if (/\b(schedule|calendar|meeting|collaborate|engagement)\b/.test(t) && /\b(patrick|project|work)\b/.test(t)) return true;
  return false;
}

function scrollPageToContact() {
  const contact = document.getElementById('contact');
  if (contact) {
    contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
    try {
      contact.focus({ preventScroll: true });
    } catch {
      /* ignore */
    }
  } else {
    window.location.hash = 'contact';
  }
}

function fallbackReply(userText) {
  const t = userText.toLowerCase();

  if (/who (is|are) (patrick|you)|about patrick|tell me about (him|patrick)/.test(t)) {
    return 'Patrick Benchog works with **data, records, documents and clients**, and also builds practical technology solutions. He **handles non-citizen Ghana Card registration in Techiman, Bono East, Ghana** through Margins ID Group, runs **PrimeDraft Services** as Founder & Document Support Specialist, and **Benchog Labs** for websites, apps, graphics design, mobile photography and IT support.';
  }
  if (/whatsapp|phone|call|text/.test(t)) {
    return 'You can reach Patrick on WhatsApp at **+233240025563**. Share what you need and your timeline so he can reply with a clear next step.';
  }
  if (/linkedin/.test(t)) {
    return 'LinkedIn: [patrick-benchog](https://www.linkedin.com/in/patrick-benchog). That profile works well alongside this site for recruiters and collaborators.';
  }
  if (/email|mail|contact|cv|resume|download/.test(t)) {
    return 'Email: **pat.benchog@gmail.com**. You can also use LinkedIn, WhatsApp or the **Download CV** button in Contact.';
  }
  if (/price|cost|budget|how much|pricing|quote/.test(t)) {
    return 'Starting prices for **client packages** are in the Pricing section. Final quotes depend on scope and timeline. Email **pat.benchog@gmail.com** with what you need.';
  }
  if (/margin|ghana card|regist|techi|bono|ims|identity management|handle/.test(t)) {
    return 'Patrick **handles the non-citizen Ghana Card registration in Techiman, Bono East, Ghana** through Margins ID Group in a **Customer Service, Data Entry & Operations** role. That includes interviewing clients, entering information into a national database, processing forms and documentation, and assisting clients day to day. He is not presenting himself as a government employee or the owner of that database.';
  }
  if (/hire|recruit|job|employ|remote|admin|data entry|records/.test(t)) {
    return 'For hiring, start with **Experience**, **About** and **Skills**. Email **pat.benchog@gmail.com** or use [LinkedIn](https://www.linkedin.com/in/patrick-benchog). He is open to remote data, records, admin, document and client-support roles.';
  }
  if (/benchog labs|what does benchog/.test(t)) {
    return '**Benchog Labs** offers websites, apps, graphics design, mobile photography and IT support.';
  }
  if (/app|mobile|product|backend|stockpulse|optimist|ims fee/.test(t)) {
    return 'Patrick has built working apps such as **The Optimist** (personal finance), **StockPulse** (inventory) and **IMS Fee App** (fee management). Share the problem and must-have features if you want something similar.';
  }
  if (/web|site|landing|portfolio|benchtech/.test(t)) {
    return 'Website work sits under **Benchog Labs**. Examples on this site include this portfolio and **BenchTech Support**.';
  }
  if (/data|dashboard|excel|analytics|record|database|sheets|workspace|word|office|powerpoint/.test(t)) {
    return 'Patrick works with **national database operations**, data entry and digital records in his current role, and uses Microsoft Excel, Word, PowerPoint and Google Workspace tools. He has also built Excel dashboards from sales and marketing datasets. Those are analysis projects, not claims about his own revenue.';
  }
  if (/cad|mechanical|autocad|solid|drawing|manufactur|education|degree|uds/.test(t)) {
    return 'Patrick holds a **BSc in Mechanical Engineering** from the University for Development Studies, mentioned in the About section. Engineering is part of his background; his current day-to-day work is data, documents, clients and technology.';
  }
  if (/photo|design|graphic|brand|poster|edit/.test(t)) {
    return 'Graphics design and mobile photography are offered through **Benchog Labs**. There is also a design and photography gallery under Projects.';
  }
  if (/thesis|document|proof|academic|cv|cover letter|assignment|humaniz|primedraft/.test(t)) {
    return '**PrimeDraft Services** covers editing, proofreading, formatting, document preparation (including CVs, cover letters, thesis writing and assignments), and AI content humanization. Email **pat.benchog@gmail.com** to discuss a document.';
  }
  if (/it\b|windows|install|computer|laptop|virus|office setup/.test(t)) {
    return '**IT support** is offered through Benchog Labs: setup, antivirus and software fixes. BenchTech Support is the public site for that offer.';
  }
  if (/skill/.test(t)) {
    return 'Skills on the site include data entry and processing, national database operations, administrative and operations support, document and file management, Microsoft Office and Google Workspace tools, customer and client support, plus web development, app development, IT support, graphics design and mobile photography.';
  }
  if (/prompt vault|ai systems|prompt engineer/.test(t)) {
    return 'That item is not shown in the public Projects section right now. For AI-related document help, see **AI content humanization** under PrimeDraft Services, or email **pat.benchog@gmail.com**.';
  }
  return 'I can help with Patrick\'s **experience**, **skills**, **services**, **projects**, **pricing** or **contact** details. Ask a specific question about hiring, Ghana Card work, PrimeDraft documents, or Benchog Labs (websites, apps, graphics, photography, IT).';
}

const CHAT_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat';

export function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(() => [
    { role: 'assistant', content: WELCOME_TEXT },
  ]);
  const listRef = useRef(null);

  const goToContact = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => scrollPageToContact(), 160);
  }, []);

  const scrollToEnd = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages, open, loading, scrollToEnd]);

  useEffect(() => {
    if (open) document.body.classList.add('portfolio-assistant-open');
    else document.body.classList.remove('portfolio-assistant-open');
    return () => document.body.classList.remove('portfolio-assistant-open');
  }, [open]);

  const requestReply = useCallback(async (thread, lastUserText, options = {}) => {
    const skipContactScroll = options.skipContactScroll === true;
    setLoading(true);
    try {
      const r = await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: thread.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && (data.reply || data.content)) {
        setMessages((m) => [...m, { role: 'assistant', content: data.reply || data.content }]);
        if (!skipContactScroll && shouldScrollToContact(lastUserText)) goToContact();
        return;
      }
      const fb = fallbackReply(lastUserText);
      setMessages((m) => [...m, { role: 'assistant', content: fb }]);
      if (!skipContactScroll && shouldScrollToContact(lastUserText)) goToContact();
    } catch {
      const fb = fallbackReply(lastUserText);
      setMessages((m) => [...m, { role: 'assistant', content: fb }]);
      if (!skipContactScroll && shouldScrollToContact(lastUserText)) goToContact();
    } finally {
      setLoading(false);
    }
  }, [goToContact]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const text = input.trim();
      if (!text || loading) return;
      setInput('');
      const nextThread = [...messages, { role: 'user', content: text }];
      setMessages(nextThread);
      requestReply(nextThread, text);
    },
    [input, loading, messages, requestReply],
  );

  const onChip = useCallback(
    (chip) => {
      if (loading) return;
      const prompt = typeof chip === 'string' ? chip : chip.prompt;
      const forceContact = typeof chip === 'object' && chip.goToContact;
      const nextThread = [...messages, { role: 'user', content: prompt }];
      setMessages(nextThread);
      if (forceContact) goToContact();
      requestReply(nextThread, prompt, { skipContactScroll: forceContact });
    },
    [loading, messages, requestReply, goToContact],
  );

  return (
    <div className="portfolio-assistant" aria-live="polite">
      <button
        type="button"
        className="portfolio-assistant-fab"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="portfolio-assistant-panel"
        aria-label="Open Patrick's AI assistant"
      >
        <Sparkles {...iconProps} size={22} aria-hidden="true" />
        <span>Ask AI</span>
      </button>

      {open ? (
        <button
          type="button"
          className="portfolio-assistant-backdrop"
          aria-label="Close assistant"
          onClick={() => setOpen(false)}
        >
        </button>
      ) : null}

      {open ? (
        <div
          id="portfolio-assistant-panel"
          className="portfolio-assistant-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Patrick portfolio assistant"
        >
          <div className="portfolio-assistant-panel-inner">
            <header className="portfolio-assistant-header">
              <div className="portfolio-assistant-title">
                <Sparkles {...iconProps} size={20} aria-hidden="true" />
                <div>
                  <strong>Patrick&apos;s assistant</strong>
                  <span>Hiring, services, and how to get in touch</span>
                </div>
              </div>
              <button
                type="button"
                className="portfolio-assistant-close"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
              >
                <X {...iconProps} size={22} aria-hidden="true" />
              </button>
            </header>

            <div className="portfolio-assistant-messages" ref={listRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`portfolio-assistant-msg portfolio-assistant-msg--${msg.role}`}>
                  <div className="portfolio-assistant-msg-bubble">{formatMessage(msg.content)}</div>
                </div>
              ))}
              {loading ? (
                <div className="portfolio-assistant-msg portfolio-assistant-msg--assistant">
                  <div className="portfolio-assistant-msg-bubble portfolio-assistant-typing">
                    <Loader2 {...iconProps} size={18} className="icon-lucide portfolio-assistant-spin" aria-hidden="true" />
                    Thinking…
                  </div>
                </div>
              ) : null}
            </div>

            <div className="portfolio-assistant-chips" role="group" aria-label="Quick service topics">
              {SERVICE_CHIPS.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  className="portfolio-assistant-chip"
                  onClick={() => onChip(c)}
                  disabled={loading}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <form className="portfolio-assistant-form" onSubmit={onSubmit}>
              <input
                type="text"
                className="portfolio-assistant-input"
                placeholder="Ask about experience, services, or contact…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                disabled={loading}
                aria-label="Message"
              />
              <button type="submit" className="portfolio-assistant-send" disabled={loading || !input.trim()} aria-label="Send message">
                {loading ? <Loader2 {...iconProps} size={20} className="icon-lucide portfolio-assistant-spin" /> : <Send {...iconProps} size={20} />}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function formatMessage(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return (
      <span key={i}>
        {part.split('\n').map((line, j, arr) => (
          <span key={j}>
            {line}
            {j < arr.length - 1 ? <br /> : null}
          </span>
        ))}
      </span>
    );
  });
}
