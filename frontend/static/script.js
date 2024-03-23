window.Ambar = (function() {
const { h, text } = UI;
const pageSize = 10;
const maxCountdown = 5;

async function sidebar(active, nav) {
    let allowed = ["credit_card", "shipping", "none"];
    if (!allowed.includes(active)) {
        throw new Error(
            "Invalid highlighted section: '" +
            highlighted +
            "'. Expected one of: " +
            allowed.join(", ")
        );
    }

    function view(state) {
      return [
        h("a", { href : "/"}, [
          h("img", { "src": "/img/logo.png", "alt" : "Ambar Logo", class : "logo" }, [])
        ]),
        h("hr", { style: "color: transparent" }, []),
        h("ul", { class : "nav nav-pills flex-column mb-auto" }, [
          h("li", {}, [
            h("a", { "href": "/credit_card/", "class":  `nav-link link-dark ${active == "credit_card" ? "active bg-dark" : ""}` }, [
              h("i", { "class": "bi bi-credit-card-fill me-2" }, []),
              text("Credit Card Application")
            ])
          ]),
          h("li", {}, [
            h("a", { "href": "/shipping/", "class":  `nav-link link-dark ${active == "shipping" ? "active bg-dark" : ""}` }, [
              h("i", { "class": "bi bi-box-fill me-2" }, []),
              text("Shipping Application")
            ])
          ]),
        ]),
      ]
    }

    function update(state, msg) {
      return state;
    }

    UI.init(nav, {}, update, view);
}

async function getDomain(file) {
    const response = await fetch(file);
    return await response.text();
}

function getPage(events, page) {
    let start = page * pageSize;
    return events.slice(start, start + pageSize);
}

async function fetchEvents(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching events:', error);
    }
  return [];
}

function viewTitle({ title, refreshing, countdown, autoRefresh, autoRefreshOn, currentPage }) {
  let r = h("div", { "class" : "d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" }, [
    h("h3", {}, [text(title)]),
    h("span", {}, [
      h("div", { "class" : "btn-group me-2" },
        [ h("button", { class : "btn btn-sm btn-outline-secondary", onClick: { refresh: true } }, [
          refreshing
            ? h("div", { class:"spinner-border spinner-border-sm", role: "status" }, [])
            : (autoRefresh && autoRefreshOn)
            ? text(`Refresh (${countdown})`)
            : text(`Refresh`)
          ])
        ].concat(
          autoRefresh
          ? [ h("button", {
              class : `btn btn-sm btn-outline-primary ${autoRefreshOn ? "active" : ""}`,
              onClick : { setAutoRefreshOn: true, value: !autoRefreshOn } },
              [ text("Auto refresh") ]
            ) ]
          : [ h("button", { class : "btn btn-sm btn-outline-secondary", onClick: { prevPage: true } }, [text("Newer")]),
              h("button", { class : "btn btn-sm btn-outline-secondary", onClick: { nextPage: true } }, [text("Older")]),
            ]
        ))
    ])
  ]);
  return r;
}

function viewTable(events) {
  let fields = Object.keys(events[0]);
  return h("div", { class: "table-responsive small" }, [
    h("table", { class: "table table-striped table-sm" }, [
      h("thead", {}, [
        h("tr", {},
          fields.map(field => h("th", { scope: "col" }, [text(field)]))
        ),
      ]),
      h("tbody", {}, events.map(el =>
        h("tr", {}, fields.map(field =>
          h("td", {}, [
            h("div", {}, [text(el[field])])
          ])
        ))
      ))
    ])
  ]);
}

function viewNoResults(title) {
  return h("div", { class: "pt-3 pb-2 mb-3 border-bottom" }, [
    h("h3", {}, [text(title)]),
    h("p", {}, [text("There are no results for this section. Deploy an update to see results.")])
  ]);
}

function view({ title, refreshing, countdown, currentPage, events, autoRefresh, autoRefreshOn }) {
  return events.length == 0 ? [viewNoResults(title)] : [
    viewTitle({ title, refreshing, countdown, autoRefresh, autoRefreshOn, currentPage }),
    viewTable(getPage(events, currentPage)),
  ]
}

function setPage(state, number) {
  let maxPage = Math.ceil(state.events.length / pageSize) - 1;
  let minPage = 0;
  let n = Math.max(minPage, Math.min(maxPage, number));
  state.currentPage = n;
  return state;
}

function update(state, msg, enqueue) {
  if (msg.nextPage) {
    state = setPage(state, state.currentPage + 1);
  } else if (msg.prevPage) {
    state = setPage(state, state.currentPage - 1);
  } else if (msg.refresh) {
    if (!state.refreshing && state.url) {
      state.refreshing = true;
      state.countdown = maxCountdown;

      const fetchAndUpdate = async () => {
        let fetched = await fetchEvents(state.url);
        enqueue({ refreshContent: fetched });
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(fetchAndUpdate);
      } else {
        setTimeout(fetchAndUpdate, 100);
      }
    }
  } else if (msg.refreshContent) {
      let fetched = msg.refreshContent;
      let boundary = fetched.findIndex(e => JSON.stringify(e) == JSON.stringify(state.events[0]));
      let newEvents = fetched.slice(0, boundary)
      state.events = newEvents.concat(state.events);
      state.refreshing = false;
      state.currentPage = 0;
  } else if (msg.countdownTick) {
    if (!state.refreshing && state.autoRefreshOn) {
      state.countdown = Math.max(0, state.countdown - 1);
      if (state.countdown == 0) {
        enqueue({ refresh: true });
      }
    }
  } else if (msg.setUrl) {
    state.url = msg.setUrl;
  } else if (msg.setAutoRefreshOn) {
    state.autoRefreshOn = msg.value;
  }
  return state;
}

async function createInteractiveTable(title, root, url_suffix, autoRefresh) {
    let initialState = {
      title,
      url: null,
      autoRefresh,
      autoRefreshOn: true,
      countdown: maxCountdown,
      currentPage: 0,
      events : [],
      refreshing: false,
    };

    let ui = UI.init(root, initialState, update, view);

    function refresh()  { ui.enqueue({ refresh: true }); }
    function nextPage() { ui.enqueue({ nextPage : true }); }
    function prevPage() { ui.enqueue({ prevPage : true }); }

    let url = "https://" + (await getDomain('/domains/be-domain.txt')) + url_suffix;
    ui.enqueue({ setUrl: url });
    refresh();

    if (autoRefresh) {
      setInterval(() => ui.enqueue({ countdownTick: true }), 1000);
    }
}

async function updateGithubInstructionsLink() {
    let repo_base_url = await getDomain('/domains/repo-base-url.txt');
    document.getElementById('link-to-gh-instructions').href = `${repo_base_url}?tab=readme-ov-file#5-deploy-a-shipping-application`;
}

return { createInteractiveTable, sidebar, updateGithubInstructionsLink };
})();
