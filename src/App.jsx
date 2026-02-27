import React, { useEffect, useMemo, useState } from "react";

const NAV = [
  { id: "home", label: "Home" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "architecture", label: "Architecture" },
  { id: "ai", label: "AI Models" },
  { id: "results", label: "Results" },
  { id: "ui", label: "UI Screens" },
  { id: "tech", label: "Tech Stack" },
  { id: "team", label: "Team" },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
      {children}
    </span>
  );
}

function Card({ className, children }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-soft",
        className
      )}
    >
      {children}
    </div>
  );
}

function Section({ id, eyebrow, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mb-10">
          {eyebrow ? (
            <div className="mb-3">
              <Badge>{eyebrow}</Badge>
            </div>
          ) : null}
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function Stat({ label, value, hint }) {
  return (
    <Card className="p-5">
      <div className="text-xs font-semibold text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-extrabold text-slate-900">{value}</div>
      {hint ? <div className="mt-2 text-sm text-slate-600">{hint}</div> : null}
    </Card>
  );
}

function ImageFrame({ src, alt, caption }) {
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-soft">
        <img
          src={src}
          alt={alt}
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-xs text-slate-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function SimpleChart({ title, subtitle }) {
  // Lightweight “fake chart” (looks professional even without a chart lib)
  const points = useMemo(() => {
    const arr = [];
    let y = 60;
    for (let i = 0; i < 24; i++) {
      y += (Math.random() - 0.45) * 10;
      y = Math.max(20, Math.min(90, y));
      arr.push({ x: i, y });
    }
    return arr;
  }, []);

  const path = useMemo(() => {
    const w = 560;
    const h = 180;
    const pad = 12;
    const scaleX = (x) => pad + (x / 23) * (w - pad * 2);
    const scaleY = (y) => pad + (1 - y / 100) * (h - pad * 2);

    return points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${scaleX(p.x)} ${scaleY(p.y)}`)
      .join(" ");
  }, [points]);

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-slate-900">{title}</div>
          <div className="mt-1 text-xs text-slate-500">{subtitle}</div>
        </div>
        <Badge>Live Preview</Badge>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <svg viewBox="0 0 560 180" className="h-44 w-full">
          <path d={path} fill="none" strokeWidth="3" stroke="currentColor" className="text-blue-600" />
          <path
            d={`${path} L 548 168 L 12 168 Z`}
            fill="currentColor"
            className="text-blue-600/10"
          />
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3 text-xs text-slate-600">
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
          Update: <span className="font-semibold text-slate-800">10 sec</span>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
          Mode: <span className="font-semibold text-slate-800">Realtime</span>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
          Latency: <span className="font-semibold text-slate-800">&lt; 150ms</span>
        </div>
      </div>
    </Card>
  );
}

function Navbar({ active }) {
  return (
    <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#home" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white shadow-soft">
            AS
          </div>
          <div className="leading-tight">
            <div className="text-sm font-extrabold text-slate-900">AquaSmart</div>
            <div className="text-[11px] text-slate-500">AIoT Aquaculture Framework</div>
          </div>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={cn(
                "rounded-xl px-3 py-2 text-xs font-semibold transition",
                active === n.id
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              )}
            >
              {n.label}
            </a>
          ))}
        </div>

        <a
          href="#results"
          className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white shadow-soft hover:bg-blue-700"
        >
          View Results
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handler = () => {
      const ids = NAV.map((n) => n.id);
      const offsets = ids.map((id) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Number.POSITIVE_INFINITY };
        const rect = el.getBoundingClientRect();
        return { id, top: Math.abs(rect.top - 110) };
      });
      offsets.sort((a, b) => a.top - b.top);
      if (offsets[0]?.id) setActive(offsets[0].id);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar active={active} />

      {/* HERO */}
      <section id="home" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-12 md:px-6 md:pb-16 md:pt-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge>ESP32-CAM Edge</Badge>
                <Badge>Dual Backend: Node.js + Flask</Badge>
                <Badge>Supabase Realtime</Badge>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                AquaSmart: Intelligent AIoT Framework for Prawn Aquaculture
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                Real-time water telemetry, 24-hour forecasting using LSTM, disease diagnosis using MobileNetV2,
                and AI-driven closed-loop automation to protect pond ecosystems and reduce mortality risk.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#architecture"
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-soft hover:bg-black"
                >
                  Explore Architecture
                </a>
                <a
                  href="#ui"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-soft hover:bg-slate-50"
                >
                  View UI Screens
                </a>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
                  <div className="text-xs font-semibold text-slate-500">Sampling</div>
                  <div className="mt-1 text-lg font-extrabold">10 sec</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
                  <div className="text-xs font-semibold text-slate-500">Automation</div>
                  <div className="mt-1 text-lg font-extrabold">Closed-loop</div>
                </div>
              </div>
            </div>

            <Card className="p-4 md:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-extrabold">System Overview</div>
                  <div className="mt-1 text-xs text-slate-500">
                    Replace image with your final architecture figure.
                  </div>
                </div>
                <Badge>Figure 3.1</Badge>
              </div>

              {/* Put your generated figure here */}
              <div className="mt-4">
                <ImageFrame
                  src="/assets/figure-3-1.png"
                  alt="Multi-tier system architecture"
                  caption="Figure 3.1: Multi-Tier System Architecture (Edge → Cloud → Automation)"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                  Edge: ESP32-CAM + Sensors
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                  Bridge: ngrok TCP/HTTP
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                  Node.js: Orchestrator + Soft Sensors
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                  Flask: AI Engine (LSTM + CNN)
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <Section
        id="problem"
        eyebrow="Context"
        title="Why Sri Lankan Prawn Farms Need Predictive Intelligence"
        subtitle="Traditional pond management is manual and reactive. Rapid spikes in DO, pH, and ammonia happen between checks, while disease diagnosis can take days—creating high mortality risk."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="p-5">
            <div className="text-sm font-extrabold">Manual Monitoring Gaps</div>
            <p className="mt-2 text-sm text-slate-600">
              Once/twice daily checks create blind spots where lethal shifts occur unnoticed.
            </p>
          </Card>
          <Card className="p-5">
            <div className="text-sm font-extrabold">Delayed Disease Diagnosis</div>
            <p className="mt-2 text-sm text-slate-600">
              WSSV and Black Gill can spread fast; lab confirmation takes time.
            </p>
          </Card>
          <Card className="p-5">
            <div className="text-sm font-extrabold">No Automation</div>
            <p className="mt-2 text-sm text-slate-600">
              Many systems only alert—AquaSmart triggers aeration/pumps to stabilize conditions.
            </p>
          </Card>
        </div>
      </Section>

      {/* SOLUTION */}
      <Section
        id="solution"
        eyebrow="Proposed Solution"
        title="AquaSmart Modules"
        subtitle="A decentralized AIoT ecosystem: edge data acquisition + cloud reasoning + real-time dashboard + closed-loop automation."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="p-5">
            <div className="text-sm font-extrabold">Realtime Telemetry</div>
            <p className="mt-2 text-sm text-slate-600">
              6-parameter monitoring (physical + soft-sensors) streamed to dashboard in near real-time.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>pH</Badge><Badge>Temperature</Badge><Badge>Turbidity</Badge>
              <Badge>Water Level</Badge><Badge>DO (Soft)</Badge><Badge>NH₃ (Soft)</Badge>
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-extrabold">Prediction + Diagnosis</div>
            <p className="mt-2 text-sm text-slate-600">
              LSTM forecasts 24-hour trends; MobileNetV2 detects Healthy / WSSV / Black Gill from images.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs">
                LSTM Forecasting
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs">
                MobileNetV2 CNN
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs">
                Risk Levels (H/M/L)
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs">
                PDF Diagnostic Reports
              </div>
            </div>
          </Card>

          <Card className="p-5 md:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-extrabold">Closed-Loop Automation</div>
                <p className="mt-2 text-sm text-slate-600">
                  Node.js evaluates risk → sends trigger command → ESP32 relay activates aerators/pumps → restores safe state.
                </p>
              </div>
              <Badge>Fail-safe + Manual Override</Badge>
            </div>
          </Card>
        </div>
      </Section>

      {/* ARCHITECTURE */}
      <Section
        id="architecture"
        eyebrow="System Design"
        title="Multi-Tier Architecture & Dual Backend Orchestration"
        subtitle="Edge acquisition happens at ESP32-CAM; ngrok tunnel bridges to local servers; Node.js manages traffic + soft-sensors + persistence; Flask runs AI inference; automation commands return to the edge."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold">Figure 3.1</div>
                <div className="mt-1 text-xs text-slate-500">Multi-tier system architecture (with automation loop)</div>
              </div>
              <Badge>Core Diagram</Badge>
            </div>
            <div className="mt-4">
              <ImageFrame
                src="/assets/figure-3-1.png"
                alt="Architecture"
                caption="Edge → Tunnel → Dual Backend → Supabase → UI → Automation"
              />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold">Figure 4.1</div>
                <div className="mt-1 text-xs text-slate-500">Hardware schematic & pin mapping</div>
              </div>
              <Badge>Hardware</Badge>
            </div>
            <div className="mt-4">
              <ImageFrame
                src="/assets/figure-4-1.png"
                alt="Hardware schematic"
                caption="ESP32-CAM GPIO 32/4/12/13 → sensors + relay module"
              />
            </div>
          </Card>
        </div>
      </Section>

      {/* AI MODELS */}
      <Section
        id="ai"
        eyebrow="AI Layer"
        title="LSTM Forecasting + MobileNetV2 Disease Classification"
        subtitle="LSTM uses a 10-step look-back window to forecast 24-hour trends. MobileNetV2 provides lightweight, high-accuracy diagnosis suitable for real-time operations."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Stat
            label="LSTM Dataset"
            value="17,000+ points"
            hint="Hybrid telemetry + validated historical data"
          />
          <Stat
            label="24-hour Forecast"
            value="~98% accuracy"
            hint="High-fidelity time-series forecasting"
          />
          <Stat
            label="CNN Validation"
            value="~97.8%"
            hint="Healthy / WSSV / Black Gill"
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold">Figure 3.2</div>
                <div className="mt-1 text-xs text-slate-500">LSTM logical structure (layers + dropout + look-back)</div>
              </div>
              <Badge>Model Diagram</Badge>
            </div>
            <div className="mt-4">
              <ImageFrame
                src="/assets/figure-3-2.png"
                alt="LSTM structure"
                caption="10-step look-back → LSTM layers → dropout → output forecast"
              />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold">Figure 4.2</div>
                <div className="mt-1 text-xs text-slate-500">Supabase PostgreSQL ERD (Sensor_Logs, Automation_Logs)</div>
              </div>
              <Badge>Database</Badge>
            </div>
            <div className="mt-4">
              <ImageFrame
                src="/assets/figure-4-2.png"
                alt="ERD"
                caption="High-frequency logs + diagnosis metadata + automation auditing"
              />
            </div>
          </Card>
        </div>
      </Section>

      {/* RESULTS */}
      <Section
        id="results"
        eyebrow="Evaluation"
        title="Results & Performance Summary"
        subtitle="This section presents training performance, classification effectiveness, and end-to-end responsiveness. Replace placeholders with your actual graphs and confusion matrices when ready."
      >
        <div className="grid gap-5 md:grid-cols-4">
          <Stat label="Realtime Latency" value="~750ms" hint="Edge ↔ Backend ↔ Trigger" />
          <Stat label="UI Update" value="10 sec" hint="Supabase realtime subscriptions" />
          <Stat label="Danger Recall" value="1.00" hint="Strong capture of critical states" />
          <Stat label="Weighted Accuracy" value="~98%" hint="Overall classification strength" />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold">Figure 5.1</div>
                <div className="mt-1 text-xs text-slate-500">Water quality training curves (Accuracy & Loss)</div>
              </div>
              <Badge>Training</Badge>
            </div>
            <div className="mt-4">
              <ImageFrame
                src="/assets/figure-5-1.png"
                alt="Training curves"
                caption="Google Colab training curves for LSTM forecasting"
              />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold">Figure 5.2</div>
                <div className="mt-1 text-xs text-slate-500">Water quality confusion matrix</div>
              </div>
              <Badge>Confusion Matrix</Badge>
            </div>
            <div className="mt-4">
              <ImageFrame
                src="/assets/figure-5-2.png"
                alt="Confusion matrix"
                caption='98% weighted accuracy & strong recall for "Danger" states'
              />
            </div>
          </Card>

          <SimpleChart title="Realtime pH Trend (Demo)" subtitle="Replace with your real chart screenshot if you want." />
          <SimpleChart title="Forecast Window (Demo)" subtitle="UI-based 24-hour predictive analytics preview." />
        </div>
      </Section>

      {/* UI SCREENS */}
      <Section
        id="ui"
        eyebrow="Frontend"
        title="AquaSmart Web Dashboard & Modules"
        subtitle="React.js mobile-first dashboard using realtime subscriptions, risk classification, manual overrides, and diagnostic reporting."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold">Figure 5.4</div>
                <div className="mt-1 text-xs text-slate-500">Dashboard overview (6 parameters + risk)</div>
              </div>
              <Badge>WebSockets</Badge>
            </div>
            <div className="mt-4">
              <ImageFrame
                src="/assets/figure-5-4.png"
                alt="Dashboard"
                caption="Realtime telemetry + risk classification (High/Medium/Low)"
              />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold">Figure 5.5</div>
                <div className="mt-1 text-xs text-slate-500">Predictive analytics interface (24-hour forecast)</div>
              </div>
              <Badge>Forecast</Badge>
            </div>
            <div className="mt-4">
              <ImageFrame
                src="/assets/figure-5-5.png"
                alt="Predictive UI"
                caption="Forecast charts + local biological advisories"
              />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold">Figure 5.6</div>
                <div className="mt-1 text-xs text-slate-500">Live computer vision module (ESP32-CAM)</div>
              </div>
              <Badge>98% Overlay</Badge>
            </div>
            <div className="mt-4">
              <ImageFrame
                src="/assets/figure-5-6.png"
                alt="Vision overlay"
                caption="Real-time detection bounding box + confidence score"
              />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold">Figure 5.7</div>
                <div className="mt-1 text-xs text-slate-500">Disease control & report center</div>
              </div>
              <Badge>PDF Reports</Badge>
            </div>
            <div className="mt-4">
              <ImageFrame
                src="/assets/figure-5-7.png"
                alt="Report center"
                caption="Upload images + generate downloadable diagnostic reports"
              />
            </div>
          </Card>
        </div>
      </Section>

      {/* TECH */}
      <Section
        id="tech"
        eyebrow="Implementation"
        title="Technology Stack"
        subtitle="AquaSmart is built as a modern cloud-connected AIoT platform with real-time streaming, persistence, and efficient deep learning inference."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["ESP32-CAM", "Edge gateway & camera"],
            ["ngrok", "Secure tunnel bridge"],
            ["Node.js", "Orchestrator + soft sensors"],
            ["Flask", "AI inference API"],
            ["Supabase", "PostgreSQL + realtime"],
            ["React", "Mobile-first dashboard"],
            ["LSTM", "24-hour forecasting"],
            ["MobileNetV2", "Disease classification"],
          ].map(([name, desc]) => (
            <Card key={name} className="p-5">
              <div className="text-sm font-extrabold">{name}</div>
              <div className="mt-2 text-sm text-slate-600">{desc}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* TEAM */}
      <Section
        id="team"
        eyebrow="People"
        title="Team & Supervision"
        subtitle="Developed as a final year research project at the Department of ICT, Faculty of Technology, University of Sri Jayewardenepura."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-5">
            <div className="text-sm font-extrabold">Group Members</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Kuruwita K.A.H.R (ICT/21/877)</li>
              <li>Lakshan G.N.R (ICT/21/880)</li>
              <li>Senevirathne D.M.S.N (ICT/21/919)</li>
            </ul>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-extrabold">Supervisor</div>
            <p className="mt-3 text-sm text-slate-600">
              Dr. P.L.M. Prabhani <br />
              Senior Lecturer, Faculty of Technology
            </p>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-extrabold">Project Links</div>
            <p className="mt-3 text-sm text-slate-600">
              Add your GitHub repo + demo URL here.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-black" href="#">
                GitHub Repository
              </a>
              <a className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50" href="#">
                Live Demo / Video
              </a>
            </div>
          </Card>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="text-sm font-extrabold text-slate-900">AquaSmart</div>
              <div className="mt-1 text-xs text-slate-500">
                AIoT • Forecasting • Disease Diagnosis • Closed-loop Automation
              </div>
            </div>
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} Group 16 • University of Sri Jayewardenepura
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}