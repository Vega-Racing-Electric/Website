
---

# Vega Racing Electric

The official web platform for **Vega Racing Electric**, showcasing our team's engineering achievements, research, and sponsor network.

## Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js
* **Styling:** CSS3

---

##  Project Structure

```text
vega-racing-website/
├── public/                 # Static assets and User side errors
│   ├── index.html          # For the scenario where there are browser problems
│   ├── robots.txt          # To avoid spam bots
│   ├── images/             # General UI images
│   └── videos/             # Site background/promotional videos
└── src/
    ├── components/         # Reusable UI elements like web pages and Buttons, Cards, Navbars, Footer, etc
    │   └── pages/          # Full page layouts (Home, Team, Sponsors, Research, Achievements, Contact)                   
    ├── images/             # Internal images and style files
    ├── App.js
    ├── App.css
    ├── Index.css
    ├── Test_files
    └── index.js            

```

---

## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

* **Node.js** (LTS version recommended)
* **npm** (comes with Node.js)

### Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/vega-racing-electric.git
cd vega-racing-electric
```
2. **Install dependencies**
```bash
npm install

```
3. **Start the development server**
```bash
set NODE_OPTIONS=--openssl-legacy-provider && npm start

```
