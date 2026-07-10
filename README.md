# Arpit Umrao —  Java Backend Developer Portfolio

A component-based, highly responsive, and futuristic developer portfolio designed with a sophisticated light-tech HUD dashboard and an **interactive CLI terminal**. Tailored for enterprise Java backend engineering and student graduation timelines.

🔗 **Live Site:** [[(https://arpitumrao-portfolio.vercel.app/)](https://arpitumrao-portfolio.vercel.app/)]

---

## 🛠️ Tech Stack

*   **Core Languages:** Java (Primary), C, Python, SQL
*   **Web Frameworks:** Spring Boot, Spring Framework, Spring Security, Servlets, JSP
*   **Databases:** MySQL & DBMS Concepts
*   **Data Analysis:** Pandas, NumPy, Matplotlib
*   **Developer Toolset:** IntelliJ IDEA, VS Code, Maven, Git, GitHub, Operating Systems

---

## ⚡ High-Tech Interactive Features

1.  **Cursor Spotlight Borders:** Vercel-style card outlines that dynamically track your mouse cursor and light up the card boundaries with neon gradients.
2.  **Futuristic Nav-Bar Slider:** Glassmorphic floating menu with sliding indicator lines that expand from the center on hover and active page states.
3.  **Active CLI Terminal widget:** Command-line simulator in the Hero section allowing recruiters to scroll to sections, check diagnostics, or load files by typing commands (`about`, `skills`, `projects`, `contact`, `secret`).
4.  **Holographic Glassmorphism:** Glossy blur backdrops, soft neon background orbs, and clean monospace metadata detailing credentials.
5.  **Interactive HackerRank Badges:** Dynamic badge pane that pulls up credential verification records and track metadata on hover.

---

## 📊 Live Platform APIs & Data Sources

The portfolio pulls real-time stats and daily activity maps directly from platforms using the following endpoints:

### 1. LeetCode Statistics
*   **API Provider:** Faisal Shohag's LeetCode API Wrapper
*   **Data Endpoint:** `https://leetcode-api-faisalshohag.vercel.app/arpitumrao`
*   **Attributes Fetched:**
    *   `totalSolved`: Used for solved counters.
    *   `easySolved`, `mediumSolved`, `hardSolved`: Feeds difficulty progression bars.
    *   `ranking`: Real-time global rank.
    *   `contributionPoint`: Total platform interaction points.
    *   `submissionCalendar`: Unix timestamps mapping submissions, parsed to draw the custom SVG daily activity heatmap.

### 2. GitHub Statistics & Languages
*   **Profile API:** `https://api.github.com/users/arpitumrao988`
    *   *Fetches:* Public repository counts, followers, and profile details.
*   **Repositories API:** `https://api.github.com/users/arpitumrao988/repos?per_page=100`
    *   *Fetches:* Repository sizes, stars, and codebases. Used to dynamically calculate language distributions (e.g. Java, JavaScript percentages).
*   **Contributions Heatmap API:** `https://github-contributions-api.jogruber.de/v4/arpitumrao988`
    *   *Fetches:* Daily commit logs. Sums up total annual commits and draws the interactive contribution grid calendar.
*   *Note:* Real-time profiles utilize local fallback offsets to remain operational even when client-side browsers exceed GitHub's hourly rate limits.

### 3. HackerRank Badges & Credentials
*   **Profile Handle:** `https://www.hackerrank.com/profile/arpitumrao_`
*   **Verification:** Interactive badges display star rankings and tracks:
    *   **Problem Solving:** 5 Stars (Gold Badge)
    *   **CPP (C++):** 5 Stars (Gold Badge)
    *   **Java:** 5 Stars (Gold Badge)
    *   **C Language:** 4 Stars (Silver Badge)
    *   **Python:** 1 Star (Bronze Badge)
*   **Certifications:** Includes basic verification cards for Problem Solving (Basic) and Java (Basic).

---

## 🚀 Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/arpitumrao988/arpitumrao-portfolio.git
    cd arpitumrao-portfolio
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create your environment variables:**
    Create a `.env` file in the root directory (see `.env.example`):
    ```env
    VITE_WEB3FORMS_KEY=your_web3forms_key_here
    ```
4.  **Run in development mode:**
    ```bash
    npm run dev
    ```
5.  **Build production package:**
    ```bash
    npm run build
    ```
