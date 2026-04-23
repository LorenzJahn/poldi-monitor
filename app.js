const allowedStatuses = [
  "queued",
  "running",
  "completed",
  "failed",
  "cancelled",
  "blocked",
];

const allowedTaskTypes = [
  "research",
  "writing",
  "crm",
  "social_media",
  "airbnb",
  "admin",
  "system",
];

const allowedTriggerSources = ["telegram", "powershell", "internal"];

const allowedReasonCategories = [
  "none",
  "server_crash",
  "api_error",
  "timeout",
  "tool_error",
  "waiting_for_input",
  "dependency_pending",
  "approval_required",
  "external_system_wait",
  "manual_cancel",
];

const now = new Date("2026-04-23T09:30:00Z");

const parentTasks = [
  {
    task_id: "p-1001",
    title: "CRM Leads bereinigen Tirol",
    task_type: "crm",
    status: "running",
    trigger_source: "telegram",
    created_at: "2026-04-23T08:02:00Z",
    queued_at: "2026-04-23T08:03:00Z",
    started_at: "2026-04-23T08:05:00Z",
    finished_at: null,
    last_update_at: "2026-04-23T09:27:00Z",
    model_name: "gpt-5.3-codex",
    total_tokens: 22100,
    estimated_cost: 2.46,
    reason_category: "none",
    reason_short: "",
    result_summary: "Aktive Dublettenbereinigung mit Priorisierung auf Innsbruck/Kitzbühel läuft.",
    substeps: [
      "Kontaktquellen harmonisieren",
      "Duplikate matchen",
      "Entscheidungsliste erzeugen",
    ],
  },
  {
    task_id: "p-1002",
    title: "Mailentwurf an Stütz erstellen",
    task_type: "writing",
    status: "completed",
    trigger_source: "telegram",
    created_at: "2026-04-23T06:45:00Z",
    queued_at: "2026-04-23T06:45:30Z",
    started_at: "2026-04-23T06:47:00Z",
    finished_at: "2026-04-23T06:58:00Z",
    last_update_at: "2026-04-23T06:58:00Z",
    model_name: "gpt-5.3-codex",
    total_tokens: 6900,
    estimated_cost: 0.72,
    reason_category: "none",
    reason_short: "",
    result_summary: "Mailentwurf mit 3 Tonalitätsvarianten und finaler Empfehlung abgeschlossen.",
  },
  {
    task_id: "p-1003",
    title: "Airbnb Preisprüfung Mai",
    task_type: "airbnb",
    status: "failed",
    trigger_source: "powershell",
    created_at: "2026-04-23T05:12:00Z",
    queued_at: "2026-04-23T05:12:20Z",
    started_at: "2026-04-23T05:13:00Z",
    finished_at: "2026-04-23T05:36:00Z",
    last_update_at: "2026-04-23T05:36:00Z",
    model_name: "gpt-5.3-codex",
    total_tokens: 18400,
    estimated_cost: 1.94,
    reason_category: "api_error",
    reason_short: "Preisfeed temporär nicht erreichbar",
    error_message: "HTTP 502 vom Partner-Endpoint bei 3 aufeinanderfolgenden Versuchen.",
    result_summary: "Abbruch nach Retries. Keine finalen Preisempfehlungen gespeichert.",
    substep_count: 9,
  },
  {
    task_id: "p-1004",
    title: "Stakeholder-Recherche SoHO",
    task_type: "research",
    status: "blocked",
    trigger_source: "internal",
    created_at: "2026-04-23T04:50:00Z",
    queued_at: "2026-04-23T04:50:10Z",
    started_at: "2026-04-23T04:52:00Z",
    finished_at: null,
    last_update_at: "2026-04-23T05:05:00Z",
    model_name: "gpt-5.3-codex",
    total_tokens: 8300,
    estimated_cost: 0.87,
    reason_category: "waiting_for_input",
    reason_short: "Freigabe für Zielliste fehlt",
    error_message: "Warten auf bestätigte Zielbranchenpriorisierung.",
    result_summary: "Vorarbeit abgeschlossen, nächste Schritte pausiert bis Input vorliegt.",
  },
  {
    task_id: "p-1005",
    title: "Social Media Wochenplan Q18",
    task_type: "social_media",
    status: "queued",
    trigger_source: "telegram",
    created_at: "2026-04-23T09:10:00Z",
    queued_at: "2026-04-23T09:10:00Z",
    started_at: null,
    finished_at: null,
    last_update_at: "2026-04-23T09:10:00Z",
    model_name: "gpt-5.3-codex",
    total_tokens: 0,
    estimated_cost: null,
    reason_category: "none",
    reason_short: "",
    result_summary: "",
    queue_position: 1,
  },
  {
    task_id: "p-1006",
    title: "Vertragsablagen April strukturieren",
    task_type: "admin",
    status: "queued",
    trigger_source: "internal",
    created_at: "2026-04-23T09:12:00Z",
    queued_at: "2026-04-23T09:12:00Z",
    started_at: null,
    finished_at: null,
    last_update_at: "2026-04-23T09:12:00Z",
    model_name: "gpt-5.3-codex",
    total_tokens: 0,
    estimated_cost: null,
    reason_category: "none",
    reason_short: "",
    result_summary: "",
    queue_position: 2,
  },
];

validateTasks(parentTasks);

const state = {
  selectedTaskId: null,
};

const app = document.getElementById("app");
render();

function validateTasks(tasks) {
  tasks.forEach((task) => {
    if (!allowedStatuses.includes(task.status)) {
      throw new Error(`Ungültiger status in Mockdaten: ${task.status}`);
    }
    if (!allowedTaskTypes.includes(task.task_type)) {
      throw new Error(`Ungültiger task_type in Mockdaten: ${task.task_type}`);
    }
    if (!allowedTriggerSources.includes(task.trigger_source)) {
      throw new Error(`Ungültige trigger_source in Mockdaten: ${task.trigger_source}`);
    }
    if (!allowedReasonCategories.includes(task.reason_category)) {
      throw new Error(`Ungültige reason_category in Mockdaten: ${task.reason_category}`);
    }
  });
}

function render() {
  const activeTask = parentTasks.find((task) => task.status === "running") || null;
  const recentTasks = [...parentTasks]
    .filter((task) => ["completed", "failed", "blocked", "cancelled"].includes(task.status))
    .sort((a, b) => getStatusTime(b) - getStatusTime(a));
  const queuedTasks = [...parentTasks]
    .filter((task) => task.status === "queued")
    .sort((a, b) => new Date(a.queued_at) - new Date(b.queued_at));

  const exceptions = recentTasks.filter(
    (task) => ["failed", "blocked"].includes(task.status) || (task.estimated_cost || 0) > 2.5
  );

  const metrics = buildMetrics(parentTasks);
  const selectedTask = parentTasks.find((task) => task.task_id === state.selectedTaskId) || null;

  app.innerHTML = `
    ${AppShell({
      activeTask,
      recentTasks,
      queuedTasks,
      exceptions,
      metrics,
      selectedTask,
    })}
  `;

  bindInteractions();
}

function AppShell({ activeTask, recentTasks, queuedTasks, exceptions, metrics, selectedTask }) {
  return `
    ${HeaderStatus(parentTasks)}
    <main class="layout-grid">
      <section class="main-column">
        ${ActiveTaskCard(activeTask)}
        ${RecentTasksList(recentTasks)}
        ${QueueList(queuedTasks)}
      </section>
      <aside class="side-column">
        ${MetricsPanel(metrics)}
        ${ExceptionsPanel(exceptions)}
      </aside>
    </main>
    ${TaskDetailPanel(selectedTask)}
  `;
}

function HeaderStatus(tasks) {
  const hasRunning = tasks.some((task) => task.status === "running");
  const hasBlocked = tasks.some((task) => task.status === "blocked");
  const hasFailed = tasks.some((task) => task.status === "failed");
  const overall = hasFailed ? "failed" : hasBlocked ? "blocked" : hasRunning ? "running" : "idle";

  return `
    <header class="header-status panel">
      <div>
        <h1>Poldi</h1>
        <p class="muted">Operatorisches Kontrollfenster</p>
      </div>
      <div class="header-state-wrap">
        <span class="dot online" aria-hidden="true"></span>
        <span class="status-label">Online</span>
        <span class="overall-state state-${overall}">${overall}</span>
      </div>
    </header>
  `;
}

function ActiveTaskCard(task) {
  if (!task) {
    return `
      <section class="panel block">
        <div class="block-head"><h2>Aktuell in Bearbeitung</h2></div>
        <p class="empty">Derzeit keine aktive Aufgabe.</p>
      </section>
    `;
  }

  return `
    <section class="panel block clickable task-row" data-task-id="${task.task_id}">
      <div class="block-head">
        <h2>Aktuell in Bearbeitung</h2>
        <span class="pill">${task.task_type}</span>
      </div>
      <h3>${task.title}</h3>
      <div class="meta-grid">
        <div><span class="muted">Läuft seit</span><strong>${formatDateTime(task.started_at)}</strong></div>
        <div><span class="muted">Aktuelle Dauer</span><strong>${formatDuration(new Date(task.started_at), now)}</strong></div>
        <div><span class="muted">Letzter Heartbeat</span><strong>${formatRelative(task.last_update_at)}</strong></div>
      </div>
    </section>
  `;
}

function RecentTasksList(tasks) {
  return `
    <section class="panel block">
      <div class="block-head"><h2>Letzte Aufgaben</h2></div>
      <div class="task-list">
        ${tasks
          .map(
            (task) => `
          <article class="task-row clickable" data-task-id="${task.task_id}">
            <div class="task-main">
              <h3>${task.title}</h3>
              <div class="meta-inline">
                <span class="pill">${task.task_type}</span>
                <span class="status-chip state-${task.status}">${task.status}</span>
                <span>${statusTimeLabel(task)}</span>
                <span>Dauer ${taskDurationLabel(task)}</span>
                ${task.estimated_cost ? `<span>Kosten ~${formatCost(task.estimated_cost)}</span>` : ""}
              </div>
              ${["failed", "blocked"].includes(task.status) ? `<p class="hint">${task.reason_short || "Problem erkannt"}</p>` : ""}
            </div>
            <span class="chevron">›</span>
          </article>
        `
          )
          .join("")}
      </div>
    </section>
  `;
}

function QueueList(tasks) {
  return `
    <section class="panel block">
      <div class="block-head"><h2>Warteschlange</h2></div>
      <div class="task-list compact">
        ${
          tasks.length
            ? tasks
                .map(
                  (task) => `
            <article class="task-row clickable" data-task-id="${task.task_id}">
              <div class="task-main">
                <h3>${task.title}</h3>
                <div class="meta-inline">
                  <span class="pill">${task.task_type}</span>
                  <span>Wartet seit ${formatRelative(task.queued_at)}</span>
                  ${task.queue_position ? `<span>Position ${task.queue_position}</span>` : ""}
                </div>
              </div>
              <span class="chevron">›</span>
            </article>
          `
                )
                .join("")
            : '<p class="empty">Keine wartenden Aufgaben.</p>'
        }
      </div>
    </section>
  `;
}

function MetricsPanel(metrics) {
  return `
    <section class="panel block">
      <div class="block-head"><h2>Kennzahlen</h2></div>
      <div class="metrics-grid">
        <div><span class="muted">Kosten heute</span><strong>${formatCost(metrics.costToday)}</strong></div>
        <div><span class="muted">Kosten 7 Tage</span><strong>${formatCost(metrics.cost7d)}</strong></div>
        <div><span class="muted">Kosten 30 Tage</span><strong>${formatCost(metrics.cost30d)}</strong></div>
        <div><span class="muted">Tasks heute</span><strong>${metrics.tasksToday}</strong></div>
        <div><span class="muted">Tokens heute</span><strong>${metrics.tokensToday.toLocaleString("de-DE")}</strong></div>
      </div>
    </section>
  `;
}

function ExceptionsPanel(tasks) {
  if (!tasks.length) {
    return "";
  }

  return `
    <section class="panel block">
      <div class="block-head"><h2>Auffälligkeiten</h2></div>
      <div class="task-list compact">
        ${tasks
          .map(
            (task) => `
          <article class="task-row clickable" data-task-id="${task.task_id}">
            <div class="task-main">
              <h3>${task.title}</h3>
              <div class="meta-inline">
                <span class="status-chip state-${task.status}">${task.status}</span>
                <span>${task.reason_short || "Ungewöhnlicher Verlauf"}</span>
                <span>${formatDateTime(getStatusTime(task))}</span>
                ${task.estimated_cost ? `<span>${formatCost(task.estimated_cost)}</span>` : ""}
              </div>
            </div>
            <span class="chevron">›</span>
          </article>
        `
          )
          .join("")}
      </div>
    </section>
  `;
}

function TaskDetailPanel(task) {
  const isOpen = Boolean(task);
  return `
    <section class="task-detail ${isOpen ? "open" : ""}" id="taskDetail" aria-hidden="${!isOpen}">
      <div class="detail-panel panel">
        <button class="close-btn" data-action="close-detail" aria-label="Detailansicht schließen">×</button>
        ${
          task
            ? `
            <header>
              <h2>${task.title}</h2>
              <div class="meta-inline">
                <span class="pill">${task.task_type}</span>
                <span class="status-chip state-${task.status}">${task.status}</span>
                <span>Trigger: ${task.trigger_source}</span>
              </div>
            </header>

            <section class="detail-group">
              <h3>Zeiten</h3>
              <ul>
                <li>Erstellt: ${formatDateTime(task.created_at)}</li>
                <li>In Queue: ${formatDateTime(task.queued_at)}</li>
                <li>Gestartet: ${formatDateTime(task.started_at)}</li>
                <li>Beendet: ${formatDateTime(task.finished_at)}</li>
                <li>Letztes Update: ${formatDateTime(task.last_update_at)}</li>
              </ul>
            </section>

            <section class="detail-group">
              <h3>Dauerwerte</h3>
              <ul>
                <li>Wartezeit: ${calcWaitDuration(task)}</li>
                <li>Laufzeit: ${calcRunDuration(task)}</li>
                <li>Gesamtdauer: ${calcTotalDuration(task)}</li>
              </ul>
            </section>

            <section class="detail-group">
              <h3>Nutzung & Kosten</h3>
              <ul>
                <li>Modell: ${task.model_name}</li>
                <li>Total Tokens: ${task.total_tokens.toLocaleString("de-DE")}</li>
                <li>Geschätzte Kosten: ${task.estimated_cost ? formatCost(task.estimated_cost) : "—"}</li>
              </ul>
            </section>

            <section class="detail-group">
              <h3>Ergebnis</h3>
              <p>${task.result_summary || "Noch kein Ergebnis."}</p>
            </section>

            ${
              task.reason_category !== "none"
                ? `
              <section class="detail-group warning">
                <h3>Problemkontext</h3>
                <ul>
                  <li>Kategorie: ${task.reason_category}</li>
                  <li>Hinweis: ${task.reason_short || "—"}</li>
                  <li>Fehler: ${task.error_message || "—"}</li>
                </ul>
              </section>
            `
                : ""
            }

            ${
              task.substeps?.length
                ? `
              <section class="detail-group">
                <h3>Substeps</h3>
                <ul>${task.substeps.map((item) => `<li>${item}</li>`).join("")}</ul>
              </section>
            `
                : ""
            }
          `
            : ""
        }
      </div>
      <button class="backdrop" data-action="close-detail" aria-label="Schließen"></button>
    </section>
  `;
}

function bindInteractions() {
  document.querySelectorAll("[data-task-id]").forEach((el) => {
    el.addEventListener("click", () => {
      state.selectedTaskId = el.dataset.taskId;
      render();
    });
  });

  document.querySelectorAll('[data-action="close-detail"]').forEach((el) => {
    el.addEventListener("click", () => {
      state.selectedTaskId = null;
      render();
    });
  });
}

function buildMetrics(tasks) {
  const costs = tasks.reduce((sum, task) => sum + (task.estimated_cost || 0), 0);
  const tokens = tasks.reduce((sum, task) => sum + (task.total_tokens || 0), 0);
  const todaysTasks = tasks.filter((task) => task.created_at?.startsWith("2026-04-23")).length;

  return {
    costToday: costs,
    cost7d: costs * 3.1,
    cost30d: costs * 8.9,
    tasksToday: todaysTasks,
    tokensToday: tokens,
  };
}

function statusTimeLabel(task) {
  switch (task.status) {
    case "queued":
      return `wartet seit ${formatRelative(task.queued_at)}`;
    case "running":
      return `läuft seit ${formatRelative(task.started_at)}`;
    case "completed":
      return `abgeschlossen um ${formatTime(task.finished_at)}`;
    case "failed":
      return `fehlgeschlagen um ${formatTime(task.finished_at)}`;
    case "blocked":
      return `blockiert seit ${formatRelative(task.last_update_at)}`;
    case "cancelled":
      return `abgebrochen um ${formatTime(task.finished_at)}`;
    default:
      return "";
  }
}

function taskDurationLabel(task) {
  const start = task.started_at ? new Date(task.started_at) : new Date(task.queued_at);
  const end = task.finished_at ? new Date(task.finished_at) : now;
  return formatDuration(start, end);
}

function calcWaitDuration(task) {
  if (!task.queued_at || !task.started_at) return "—";
  return formatDuration(new Date(task.queued_at), new Date(task.started_at));
}

function calcRunDuration(task) {
  if (!task.started_at) return "—";
  return formatDuration(new Date(task.started_at), task.finished_at ? new Date(task.finished_at) : now);
}

function calcTotalDuration(task) {
  if (!task.queued_at) return "—";
  const end = task.finished_at ? new Date(task.finished_at) : now;
  return formatDuration(new Date(task.queued_at), end);
}

function getStatusTime(task) {
  return new Date(task.finished_at || task.last_update_at || task.started_at || task.queued_at || task.created_at);
}

function formatDateTime(value) {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }) + " UTC";
}

function formatTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  return date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }) + " UTC";
}

function formatRelative(value) {
  if (!value) return "—";
  const date = new Date(value);
  const mins = Math.max(1, Math.floor((now - date) / 60000));
  if (mins < 60) return `vor ${mins} min`;
  const hours = Math.floor(mins / 60);
  const rest = mins % 60;
  return `vor ${hours} h ${rest} min`;
}

function formatDuration(start, end) {
  const totalMins = Math.max(0, Math.floor((end - start) / 60000));
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  return `${h} h ${m} min`;
}

function formatCost(value) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
}
