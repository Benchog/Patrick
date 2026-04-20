import { Sparkles } from 'lucide-react';

const aiIconProps = { className: 'icon-lucide tool-stack-lucide', strokeWidth: 1.75, absoluteStrokeWidth: true, size: 26 };

/** Decorative brand-style tiles with a shared 3D “plate” treatment (uniform chrome, recognizable marks). */
export function ToolStackIcons() {
  return (
    <div className="tool-stack" aria-label="Tools and platforms Patrick works with">
      <p className="tool-stack-kicker">Stack I ship with</p>
      <div className="tool-stack-row">
        <div className="tool-icon-3d" title="AI — models &amp; assistants">
          <div className="tool-icon-3d-plate tool-icon-3d-plate--ai">
            <div className="tool-icon-3d-face">
              <Sparkles {...aiIconProps} aria-hidden="true" />
            </div>
          </div>
          <span className="tool-icon-3d-label">AI</span>
        </div>

        <div className="tool-icon-3d" title="Microsoft Excel">
          <div className="tool-icon-3d-plate">
            <div className="tool-icon-3d-face tool-icon-3d-face--excel">
              <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
                <rect width="24" height="24" rx="3" fill="#217346" />
                <path
                  fill="#fff"
                  d="M6.5 6.5h4.25v4.25H6.5V6.5zm6.75 0H17.5v4.25h-4.25V6.5zM6.5 13.25h4.25V17.5H6.5v-4.25zm6.75 0H17.5V17.5h-4.25v-4.25z"
                />
                <path fill="#217346" d="M8.5 8.5h2.25v2.25H8.5V8.5zm6.75 0h2.25v2.25h-2.25V8.5zM8.5 15.25h2.25v2.25H8.5v-2.25zm6.75 0h2.25v2.25h-2.25v-2.25z" />
              </svg>
            </div>
          </div>
          <span className="tool-icon-3d-label">Excel</span>
        </div>

        <div className="tool-icon-3d" title="React">
          <div className="tool-icon-3d-plate">
            <div className="tool-icon-3d-face tool-icon-3d-face--react">
              <svg viewBox="-11.5 -10.23 23 20.46" width="38" height="34" aria-hidden="true">
                <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
                <g stroke="#61dafb" strokeWidth="1" fill="none">
                  <ellipse rx="11" ry="4.2" />
                  <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                  <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
              </svg>
            </div>
          </div>
          <span className="tool-icon-3d-label">React</span>
        </div>

        <div className="tool-icon-3d" title="Next.js">
          <div className="tool-icon-3d-plate">
            <div className="tool-icon-3d-face tool-icon-3d-face--next">
              <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
                <rect width="24" height="24" rx="4" fill="#000" />
                <path
                  fill="#fff"
                  d="M8 7h2.2v10H8V7zm3.8 0h2.6L11.2 12.3 16 17h-2.7l-3.5-3.9V7z"
                />
              </svg>
            </div>
          </div>
          <span className="tool-icon-3d-label">Next.js</span>
        </div>

        <div className="tool-icon-3d" title="Flutter">
          <div className="tool-icon-3d-plate">
            <div className="tool-icon-3d-face tool-icon-3d-face--flutter">
              <svg viewBox="0 0 128 128" width="34" height="34" aria-hidden="true">
                <path fill="#47C5FB" d="M12.3 41.1L77.9 105.7l18.9-18.9L31.2 22.2z" />
                <path fill="#00569E" d="M81.1 26.3L96.9 42 34.1 104.8 18.3 88.9z" />
                <path fill="#00B5F8" d="M96.9 42l17.6 17.7L59.7 114.5 42 96.9z" />
              </svg>
            </div>
          </div>
          <span className="tool-icon-3d-label">Flutter</span>
        </div>

        <div className="tool-icon-3d" title="Adobe Illustrator">
          <div className="tool-icon-3d-plate">
            <div className="tool-icon-3d-face tool-icon-3d-face--ai-svg">
              <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
                <rect width="24" height="24" rx="3" fill="#330000" />
                <text
                  x="12"
                  y="16"
                  textAnchor="middle"
                  fill="#ff9a00"
                  fontSize="11"
                  fontWeight="800"
                  fontFamily="system-ui, sans-serif"
                >
                  Ai
                </text>
              </svg>
            </div>
          </div>
          <span className="tool-icon-3d-label">Illustrator</span>
        </div>

        <div className="tool-icon-3d" title="Solid Edge">
          <div className="tool-icon-3d-plate">
            <div className="tool-icon-3d-face tool-icon-3d-face--se">
              <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
                <defs>
                  <linearGradient id="sePlate" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1e5f99" />
                    <stop offset="100%" stopColor="#0a2844" />
                  </linearGradient>
                </defs>
                <rect width="24" height="24" rx="4" fill="url(#sePlate)" />
                <text
                  x="12"
                  y="15.5"
                  textAnchor="middle"
                  fill="#e8f4ff"
                  fontSize="9"
                  fontWeight="800"
                  fontFamily="system-ui, sans-serif"
                  letterSpacing="0.02em"
                >
                  SE
                </text>
              </svg>
            </div>
          </div>
          <span className="tool-icon-3d-label">Solid Edge</span>
        </div>
      </div>
      <p className="tool-stack-note">
        Expert AI-led execution across these tools — fast delivery without compromising engineering judgment.
      </p>
    </div>
  );
}
