import { useCallback, useEffect, useRef, useState } from 'react';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';

const iconProps = { className: 'icon-lucide', strokeWidth: 1.85, absoluteStrokeWidth: true };

const WELCOME_TEXT = `Hi — I can help you find the right part of Patrick's site.

He works with **data, records, documents and clients**, and also builds websites and software.

• **Hiring / remote work** — start with Experience, then Projects
• **Document support** — PrimeDraft Services
• **Websites, apps, IT support** — Benchog Labs
• **Contact** — email, LinkedIn and WhatsApp are in the Contact section

What would you like to look at?`;

const SERVICE_CHIPS = [
  { label: 'Hiring / experience', prompt: 'I am a recruiter or employer. Summarize Patrick\'s current experience and how to contact him.' },
  { label: 'Data & records', prompt: 'Tell me about Patrick\'s data entry, records and registration support work.' },
  { label: 'Documents', prompt: 'How does PrimeDraft document support work?' },
  { label: 'Websites & apps', prompt: 'Tell me about website and software projects Patrick has built.' },
  { label: 'IT support', prompt: 'IT support and computer services — scope and how to get help.' },
  { label: 'Contact', prompt: 'I want to contact Patrick — email, LinkedIn and other options.', goToContact: true },
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
  if (/whatsapp|phone|call|text/.test(t)) {
    return 'You can reach Patrick on WhatsApp at **+233240025563** — share your goal, timeline, and any links or files that help explain the project.';
  }
  if (/email|mail|contact/.test(t)) {
    return 'Email works great: **pat.benchog@gmail.com**. A short note with what you need, your deadline, and budget range (even rough) helps Patrick respond faster.';
  }
  if (/price|cost|budget|how much/.test(t)) {
    return 'Starting prices are listed on the Pricing section. The final figure depends on scope and timeline — email **pat.benchog@gmail.com** with what you need.';
  }
  if (/margin|ghana card|regist|database|data entry|record/.test(t)) {
    return 'Patrick currently supports **non-citizen registration in Ghana** through Margins ID Group: client interviews, entering identity information into a national database, checking documents, and helping people through the process. Accuracy and confidentiality matter in that work.';
  }
  if (/hire|recruit|job|employ|remote|admin/.test(t)) {
    return 'For hiring, start with **Experience** and **Projects**. Email **pat.benchog@gmail.com** or use [LinkedIn](https://www.linkedin.com/in/patrick-benchog). He is open to remote data, records, admin, document and client-support roles.';
  }
  if (/app|mobile|product|backend/.test(t)) {
    return 'Patrick has built working apps such as **The Optimist** (personal finance), **StockPulse** (inventory) and **IMS Fee App** (fee management). Share the problem and must-have features if you want something similar.';
  }
  if (/web|site|landing|portfolio/.test(t)) {
    return 'Website work sits under **Benchog Labs**. Live examples include this portfolio, **PrimeDraft Services** and **BenchTech Support**.';
  }
  if (/data|dashboard|excel|analytics|report/.test(t)) {
    return 'Patrick works with records and databases in his current role, and has also built **Excel dashboards** from sales and marketing datasets. Those dashboards are analysis projects, not claims about his own revenue.';
  }
  if (/cad|mechanical|autocad|solid|drawing|manufactur/.test(t)) {
    return 'Patrick has a **BSc in Mechanical Engineering** and uses **Solid Edge** and **AutoCAD**. Engineering is part of his background; his current day-to-day work is data, documents, clients and technology.';
  }
  if (/photo|design|graphic|brand|poster|edit/.test(t)) {
    return 'Graphics, photo editing and presentation layout are available. There is a design and photography gallery on the Projects section.';
  }
  if (/thesis|document|proof|academic|cv|primedraft/.test(t)) {
    return '**PrimeDraft Services** covers editing, proofreading, formatting and document preparation. The live site is primedraftservices.vercel.app, or email **pat.benchog@gmail.com**.';
  }
  if (/fix|windows|install|computer|laptop|virus|office/.test(t)) {
    return '**IT support** covers setup, antivirus and software fixes. BenchTech Support is the public site for that offer.';
  }
  return 'Patrick works with **data, records, documents and clients**, and also builds websites and software through Benchog Labs. Ask about hiring, PrimeDraft, or a project — or go to the Contact section.';
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
      if (r.ok && data.reply) {
        setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
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
                  <strong>Patrick's assistant</strong>
                  <span>Services, scope, and how to book</span>
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
                placeholder="Describe your project or question…"
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
