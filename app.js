const allowedStatuses = ["queued", "running", "completed", "failed", "cancelled", "blocked"];

const allowedTaskTypes = ["planning", "frontend", "repo", "deployment", "observability", "review", "coordination", "system"];

const allowedTriggerSources = ["telegram", "powershell", "internal", "schedule"];

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
    task_id: "p-2101",
    title: "Frontend-Prototyp erstellen",
    task_type: "frontend",
    status: "running",
    trigger_source: "internal",
    created_at: "2026-04-23T07:58:00Z",
    queued_at: "2026-04-23T08:00:00Z",
    started_at: "2026-04-23T08:05:00Z",
    finished_at: null,
    last_update_at: "2026-04-23T09:27:00Z",
    model_name: "gpt-5.3-codex",
    total_tokens: 18750,
    estimated_cost: 1.96,
    reason_category: "none",
    reason_short: "",
    result_summary: "Main-Layout, Task-Karten und Detailpanel sind implementiert; Feinschliff der Zeitdarstellung läuft.",
    substeps: [
      "Task-Karten semantisch strukturieren",
      "Statusfarben harmonisieren",
      "Detailpanel-Inhalte priorisieren",
    ],
  },
  {
    task_id: "p-2102",
    title: "UI-Briefing V1 finalisieren",
    task_type: "planning",
    status: "completed",
    trigger_source: "telegram",
    created_at: "2026-04-23T06:21:00Z",
    queued_at: "2026-04-23T06:22:00Z",
    started_at: "2026-04-23T06:24:00Z",
    finished_at: "2026-04-23T06:58:00Z",
    last_update_at: "2026-04-23T06:58:00Z",
    model_name: "gpt-5.3-codex",
    total_tokens: 7420,
    estimated_cost: 0.79,
    reason_category: "none",
    reason_short: "",
    result_summary: "Briefing mit finalen UI-Prinzipien, Scope und Übergabe an Frontend umgesetzt.",
  },
  {
    task_id: "p-2103",
    title: "Repository einrichten",
    task_type: "repo",
    status: "completed",
    trigger_source: "powershell",
    created_at: "2026-04-23T05:50:00Z",
    queued_at: "2026-04-23T05:50:20Z",
    started_at: "2026-04-23T05:52:00Z",
    finished_at: "2026-04-23T06:10:00Z",
    last_update_at: "2026-04-23T06:10:00Z",
    model_name: "gpt-5.3-codex",
    total_tokens: 3880,
    estimated_cost: 0.42,
    reason_category: "none",
    reason_short: "",
    result_summary: "Repo-Struktur, Basisdateien und Branch-Konventionen bereitgestellt.",
  },
  {
    task_id: "p-2104",
    title: "GitHub Pages aktivieren",
    task_type: "deployment",
    status: "failed",
    trigger_source: "internal",
    created_at: "2026-04-23T07:02:00Z",
    queued_at: "2026-04-23T07:03:00Z",
    started_at: "2026-04-23T07:04:00Z",
    finished_at: "2026-04-23T07:14:00Z",
    last_update_at: "2026-04-23T07:14:00Z",
    model_name: "gpt-5.3-codex",
    total_tokens: 5010,
    estimated_cost: 0.53,
    reason_category: "external_system_wait",
    reason_short: "GitHub API nicht erreichbar",
    error_message: "Repository Settings Endpoint lieferte mehrfach HTTP 503.",
    operational_effect: "Kein Live-Preview-Link verfügbar; Review der neuen Oberfläche ist verzögert.",
    recovery_hint: "Task kann später erneut gestartet werden, sobald GitHub stabil antwortet.",
    result_summary: "Aktivierung wurde nicht übernommen, Deployment bleibt deaktiviert.",
  },
  {
    task_id: "p-2105",
    title: "Logging-Spec vorbereiten",
    task_type: "observability",
    status: "blocked",
    trigger_source: "internal",
    created_at: "2026-04-23T08:33:00Z",
    queued_at: "2026-04-23T08:34:00Z",
    started_at: "2026-04-23T08:36:00Z",
    finished_at: null,
    last_update_at: "2026-04-23T08:52:00Z",
    model_name: "gpt-5.3-codex",
    total_tokens: 2950,
    estimated_cost: 0.31,
    reason_category: "dependency_pending",
    reason_short: "Event-Feldliste noch offen",
    error_message: "Namensschema für Trace- und Session-IDs fehlt.",
    operational_effect: "Logevents sind aktuell nicht konsistent vergleichbar; spätere Fehleranalyse wird erschwert.",
    recovery_hint: "Task kann fortgesetzt werden, sobald das Feldschema freigegeben ist.",
    result_summary: "Strukturrahmen steht, finale Spezifikation wartet auf Definitionsfreigabe.",
  },
  {
    task_id: "p-2106",
    title: "PR prüfen und mergen",
    task_type: "review",
    status: "queued",
    trigger_source: "schedule",
    created_at: "2026-04-23T09:11:00Z",
    queued_at: "2026-04-23T09:11:00Z",
    started_at: null,
    finished_at: null,
    last_update_at: "2026-04-23T09:11:00Z",
    model_name: "gpt-5.3-codex",
    total_tokens: 0,
    estimated_cost: null,
    reason_category: "none",
    reason_short: "",
    result_summary: "",
    queue_position: 1,
  },
  {
    task_id: "p-2107",
    title: "Review der Oberfläche",
    task_type: "review",
    status: "queued",
    trigger_source: "telegram",
    created_at: "2026-04-23T09:14:00Z",
    queued_at: "2026-04-23T09:14:00Z",
    started_at: null,
    finished_at: null,
    last_update_at: "2026-04-23T09:14:00Z",
    model_name: "gpt-5.3-codex",
    total_tokens: 0,
    estimated_cost: null,
    reason_category: "none",
    reason_short: "",
    result_summary: "",
    queue_position: 2,
  },
  {
    task_id: "p-2108",
    title: "Rebriefing für nächste Iteration",
    task_type: "coordination",
    status: "queued",
    trigger_source: "internal",
    created_at: "2026-04-23T09:20:00Z",
    queued_at: "2026-04-23T09:20:00Z",
    started_at: null,
    finished_at: null,
    last_update_at: "2026-04-23T09:20:00Z",
    model_name: "gpt-5.3-codex",
    total_tokens: 0,
    estimated_cost: null,
    reason_category: "none",
    reason_short: "",
    result_summary: "",
    queue_position: 3,
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
    if (!allowedStatuses.includes(task.status)) throw new Error(`Ungültiger status in Mockdaten: ${task.status}`);
    if (!allowedTaskTypes.includes(task.task_type)) throw new Error(`Ungültiger task_type in Mockdaten: ${task.task_type}`);
    if (!allowedTriggerSources.includes(task.trigger_source)) throw new Error(`Ungültige trigger_source in Mockdaten: ${task.trigger_source}`);
    if (!allowedReasonCategories.includes(task.reason_category)) throw new Error(`Ungültige reason_category in Mockdaten: ${task.reason_category}`);
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

  const alerts = buildOperationalAlerts(parentTasks);
  const metrics = buildMetrics(parentTasks);
  const selectedTask = parentTasks.find((task) => task.task_id === state.selectedTaskId) || null;

  app.innerHTML = `${AppShell({ activeTask, recentTasks, queuedTasks, alerts, metrics, selectedTask })}`;
  bindInteractions();
}

function AppShell({ activeTask, recentTasks, queuedTasks, alerts, metrics, selectedTask }) {
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
        ${AlertsPanel(alerts)}
      </aside>
    </main>
    ${TaskDetailPanel(selectedTask)}
  `;
}

function HeaderStatus(tasks) {
  const systemConnectivity = "online";
  const openProblems = tasks.filter((task) => ["failed", "blocked"].includes(task.status)).length;
  const hasRunning = tasks.some((task) => task.status === "running");
  const processState = openProblems > 0 ? "blocked" : hasRunning ? "running" : "idle";

  return `
    <header class="header-status panel">
      <div>
        <h1>Poldi</h1>
        <p class="muted">Operatorisches Kontrollfenster</p>
      </div>
      <div class="header-state-wrap">
        <span class="dot ${systemConnectivity}" aria-hidden="true"></span>
        <span class="status-label">${systemConnectivity}</span>
        <span class="overall-state state-${processState}">${processState}</span>
        ${openProblems ? `<span class="problem-badge">${openProblems} offene Probleme</span>` : ""}
      </div>
    </header>
  `;
}

function ActiveTaskCard(task) {
  if (!task) {
    return `<section class="panel block"><div class="block-head"><h2>Aktuell in Bearbeitung</h2></div><p class="empty">Derzeit keine aktive Aufgabe.</p></section>`;
  }

  return `
    <section class="panel block clickable task-row" data-task-id="${task.task_id}">
      <div class="block-head">
        <h2>Aktuell in Bearbeitung</h2>
        <span class="pill">${task.task_type}</span>
      </div>
      <h3>${task.title}</h3>
      <div class="meta-grid">
        <div><span class="muted">Status</span><strong>läuft seit ${formatTime(task.started_at)}</strong></div>
        <div><span class="muted">Aktuelle Dauer</span><strong>${formatDuration(new Date(task.started_at), now)}</strong></div>
        <div><span class="muted">Letztes Update</span><strong>${formatRelative(task.last_update_at)}</strong></div>
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
              </div>
              ${["failed", "blocked"].includes(task.status) ? `<p class="hint">${task.operational_effect || task.reason_short || "Problem erkannt"}</p>` : ""}
            </div>
            <span class="chevron">›</span>
          </article>`
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
                  <span>wartet seit ${formatRelative(task.queued_at)}</span>
                  ${task.queue_position ? `<span>Position ${task.queue_position}</span>` : ""}
                </div>
              </div>
              <span class="chevron">›</span>
            </article>`
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
        <div><span class="muted">Tasks heute</span><strong>${metrics.tasksToday}</strong></div>
        <div><span class="muted">Wartende Tasks</span><strong>${metrics.waitingTasks}</strong></div>
      </div>
    </section>
  `;
}

function AlertsPanel(alerts) {
  if (!alerts.length) return "";

  return `
    <section class="panel block">
      <div class="block-head"><h2>Auffälligkeiten</h2></div>
      <div class="task-list compact">
        ${alerts
          .map(
            (alert) => `
          <article class="task-row clickable" data-task-id="${alert.task_id}">
            <div class="task-main">
              <h3>${alert.title}</h3>
              <div class="meta-inline">
                <span class="status-chip state-${alert.status}">${alert.status}</span>
                <span>${alert.operator_note}</span>
              </div>
            </div>
            <span class="chevron">›</span>
          </article>`
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
                <span class="status-chip state-${task.status}">${task.status}</span>
                <span>Trigger: ${task.trigger_source}</span>
              </div>
            </header>

            <section class="detail-group">
              <h3>Ergebnis</h3>
              <p>${task.result_summary || "Noch kein Ergebnis."}</p>
            </section>

            ${
              task.reason_category !== "none"
                ? `<section class="detail-group warning">
                    <h3>Problemkontext</h3>
                    <ul>
                      <li>Technischer Hinweis: ${task.reason_short || "—"}</li>
                      <li>Fehlerbild: ${task.error_message || "—"}</li>
                      <li>Operativer Effekt: ${task.operational_effect || "—"}</li>
                      <li>Nächster Schritt: ${task.recovery_hint || "Task kann später erneut gestartet werden."}</li>
                    </ul>
                  </section>`
                : ""
            }

            <section class="detail-group">
              <h3>Dauerwerte</h3>
              <ul>
                <li>Wartezeit: ${calcWaitDuration(task)}</li>
                <li>Laufzeit: ${calcRunDuration(task)}</li>
                <li>Gesamtdauer: ${calcTotalDuration(task)}</li>
              </ul>
            </section>

            <section class="detail-group">
              <h3>Modell / Tokens / Kosten</h3>
              <ul>
                <li>Modell: ${task.model_name}</li>
                <li>Total Tokens: ${task.total_tokens.toLocaleString("de-DE")}</li>
                <li>Geschätzte Kosten: ${task.estimated_cost ? formatCost(task.estimated_cost) : "—"}</li>
              </ul>
            </section>

            <section class="detail-group">
              <h3>Exakte Zeitstempel</h3>
              <ul>
                <li>Erstellt: ${formatDateTime(task.created_at)}</li>
                <li>In Queue: ${formatDateTime(task.queued_at)}</li>
                <li>Gestartet: ${formatDateTime(task.started_at)}</li>
                <li>Beendet: ${formatDateTime(task.finished_at)}</li>
                <li>Letztes Update: ${formatDateTime(task.last_update_at)}</li>
              </ul>
            </section>

            ${
              task.substeps?.length
                ? `<section class="detail-group"><h3>Substeps (optional)</h3><ul>${task.substeps.map((item) => `<li>${item}</li>`).join("")}</ul></section>`
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
  const costToday = tasks.reduce((sum, task) => sum + (task.estimated_cost || 0), 0);
  return {
    costToday,
    tasksToday: tasks.filter((task) => task.created_at?.startsWith("2026-04-23")).length,
    waitingTasks: tasks.filter((task) => task.status === "queued").length,
  };
}

function buildOperationalAlerts(tasks) {
  return tasks
    .filter((task) => ["failed", "blocked"].includes(task.status))
    .map((task) => ({
      task_id: task.task_id,
      title: task.title,
      status: task.status,
      operator_note: task.operational_effect || task.reason_short || "Operatives Risiko erkannt",
    }));
}

function statusTimeLabel(task) {
  switch (task.status) {
    case "queued":
      return `wartet seit ${formatRelative(task.queued_at)}`;
    case "running":
      return `läuft seit ${formatTime(task.started_at)}`;
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
  return date.toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "medium", timeZone: "UTC" }) + " UTC";
}

function formatTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  return date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

function formatRelative(value) {
  if (!value) return "—";
  const date = new Date(value);
  const mins = Math.max(1, Math.floor((now - date) / 60000));
  if (mins < 60) return `vor ${mins} Min.`;
  const hours = Math.floor(mins / 60);
  const rest = mins % 60;
  return rest ? `vor ${hours} h ${rest} Min.` : `vor ${hours} h`;
}

function formatDuration(start, end) {
  const totalMins = Math.max(0, Math.floor((end - start) / 60000));
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  return `${h} h ${m} Min.`;
}

function formatCost(value) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
}
