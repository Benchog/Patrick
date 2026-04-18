import { useCallback, useEffect, useRef, useState } from 'react';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';

const iconProps = { className: 'icon-lucide', strokeWidth: 1.85, absoluteStrokeWidth: true };

const WELCOME_TEXT = `Hi — I'm Patrick's AI guide. Here's what he partners on:

• **App development** — production-ready cross-platform products with real backends
• **Websites** — fast, credible sites that ship and convert
• **Data & dashboards** — clarity from messy numbers for real decisions
• **CAD / CAM** — mechanical drawings and design discipline (Solid Edge, AutoCAD)
• **Graphics & photo** — brand visuals and polished edits
• **IT support** — setup, fixes, and reliable troubleshooting
• **Documents & thesis** — editing, structure, and academic polish

**Which service do you want to explore or book?** Tap an option below or describe your goal in your own words.`;

const SERVICE_CHIPS = [
  { label: 'Apps', prompt: 'I want to know more about app development with Patrick and what booking looks like.' },
  { label: 'Websites', prompt: 'Tell me about website projects and how Patrick works with clients.' },
  { label: 'Dashboards', prompt: 'Explain data analytics and dashboard work — deliverables and typical process.' },
  { label: 'CAD / CAM', prompt: 'What CAD/CAM and mechanical design support does Patrick offer?' },
  { label: 'Graphics', prompt: 'Graphics and photo editing — what can Patrick deliver?' },
  { label: 'IT support', prompt: 'IT support and computer services — scope and how to get help.' },
  { label: 'Documents', prompt: 'Document and thesis editing — how does that engagement work?' },
  { label: 'Hire / general', prompt: 'I want to hire Patrick for something broader — how should I reach out?' },
  { label: 'Book / contact', prompt: 'I want to book Patrick or discuss a project — take me to contact options.', goToContact: true },
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
    return 'Investment depends on scope, integrations, and timeline. Patrick will give you a clear proposal after a quick understanding of the work — use the Contact section or email **pat.benchog@gmail.com** with your brief.';
  }
  if (/app|mobile|product|backend/.test(t)) {
    return 'Patrick builds **cross-platform, production-minded apps** — real data, sync, and deployments rather than mockups. If you share the problem, users, and must-have features, he can outline a sensible path and next steps.';
  }
  if (/web|site|landing|portfolio/.test(t)) {
    return 'For **websites**, Patrick focuses on speed, credibility, and clear calls-to-action — deployed hosting, responsive layout, and copy structure that matches your offer.';
  }
  if (/data|dashboard|excel|analytics|report/.test(t)) {
    return '**Dashboards** are about decisions: Patrick turns raw exports into charts and narratives that show what is actually happening — and what to do next.';
  }
  if (/cad|mechanical|autocad|solid|drawing|manufactur/.test(t)) {
    return 'With a **Mechanical Engineering** background, Patrick delivers disciplined CAD work — from concepts to drawings you can hand to a shop or team.';
  }
  if (/photo|design|graphic|brand|poster|edit/.test(t)) {
    return '**Visual work** spans brand-friendly layouts, social creatives, and photo edits with clean hierarchy and a premium finish.';
  }
  if (/thesis|document|edit|proof|academic/.test(t)) {
    return '**Document support** includes proofreading, structure, formatting, and clarity — tuned for academic or professional submission.';
  }
  if (/fix|windows|install|computer|laptop|virus|office/.test(t)) {
    return '**IT support** covers setup, activation, antivirus, and software fixes — practical help when machines or tools get in the way.';
  }
  return 'Patrick combines **engineering discipline** with **shipping software and creative work**. Pick a service chip above or say what outcome you need — I will route you to the right conversation and the Contact section when you are ready to book.';
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
