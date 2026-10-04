# Orchid Gallery SPA — Lab 02 + Slot 9

## Requirements
- Node 22+ + Vite (latest)

## Install
```bash
npm install
```

## Run (dev server)
```bash
npm run dev
```

## Build (production)
```bash
npm run build
npm run preview
```

## Project Structure
```
orchid-gallery-spa/
├── public/
│   ├── orchids.json           # Static data served via HTTP GET /orchids.json
│   └── images/
│       └── orchid-placeholder.svg
├── src/
│   ├── api/
│   │   ├── apiClient.js                   # Axios instance (comparison)
│   │   ├── orchidService.js               # Fetch + 30s TTL cache
│   │   └── orchidService.axios.example.js # Axios version (for reference)
│   ├── components/
│   │   ├── NavBar.jsx
│   │   ├── Orchids.jsx          # Main page: list + search + filter
│   │   ├── OrchidCard.jsx       # Card per orchid
│   │   ├── OrchidDetailModal.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorMessage.jsx
│   ├── hooks/
│   │   └── useOrchids.js        # Custom hook: loading/error/data + reload
│   ├── shared/
│   │   └── ListOfOrchids.js     # Static JS data (for reference)
│   ├── styles/
│   │   └── app.css
│   ├── App.jsx
│   └── main.jsx
├── README.md
└── package.json
```

## Data Flow
```
App
 -> NavBar
 -> Orchids
      -> useOrchids (hook)
           -> orchidService.getOrchids({ force })
                -> cache check (TTL 30s)
                     -> fetch('/orchids.json')  <- HTTP GET
      -> OrchidCard (renders list)
      -> OrchidDetailModal (shows on click)
      -> LoadingSpinner / ErrorMessage
```

## Cache Policy
- Module-level cache with 30-second TTL
- Normal load: returns cached data if within TTL
- Force reload (Reload button): bypasses cache, always fetches fresh data
- Cache invalidated after TTL expires

## Features
- F01: NavBar with Orchid Gallery brand + Home/Orchids/About links
- F02: Orchid list responsive card grid (1/2/4 columns)
- F03: Orchid detail via Modal on Detail click
- F04: Loading spinner while fetching
- F05: Error alert with Try Again retry button
- F06: Empty state message
- F07: Service layer orchidService.js separating data from UI
- F08: Promise/async-await throughout
- F09: Fetch GET /orchids.json
- F10: Axios awareness via orchidService.axios.example.js
- F11: Module-level cache TTL 30s + force reload
- F13: Search/filter by name, category, Special flag (derived, no extra API calls)

## Evidence
Attach screenshots: list, modal, DevTools Network /orchids.json 200, error state.
