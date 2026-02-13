
---

# Vega Racing Electric

The official website for **Vega Racing Electric**, showcasing our team's engineering achievements, research, and sponsor network.

## Tech Stack

* **Frontend:** React.js
* **Client Side mail service:** EmailJS
* **Styling:** CSS3
* **Package Manager:** Yarn

---

##  Directory Structure

```text
vega-racing-website/
├── .env                    # to store YOUR keys.
├── .gitignore              # to make sure stuff not required is not tracked by git.
├── README.md               # You are reading this right now.
├── package.json            # Yarn stuff that remembers all the dependencies to be installed.
├── yarn.lock               # Yarn stuff
├── public/                 # Static assets and User side errors
│   ├── index.html          # For the scenario where there are browser problems
│   ├── robots.txt          # To avoid spam bots
│   ├── images/             # General UI images
│   └── videos/             # Site background/promotional videos
└── src/                    # Source code for the website. The backbone.
    ├── components/         # Reusable UI elements like web pages and Buttons, Cards, Navbars, Footer, etc
    │   └── pages/          # Full page layouts (Home, Team, Sponsors, Research, Achievements, Contact)                   
    ├── images/             # Internal images and style files
    ├── App.js              # Brings all the pages together
    ├── App.css             # Aesthetic changes
    ├── Index.css
    ├── Test_files
    └── index.js            

```

---

## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

* **Node.js** (LTS version recommended)
* **yarn** (if you have node, you have npm, run: "npm install --global yarn")

### Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/vega-racing-electric.git
cd vega-racing-electric
```
2. **Install dependencies**
```bash
yarn install

```
3. Configure Environment Variables
Create a file named ```.env``` in the root directory, same level as package.json, Add the following keys to it
```
REACT_APP_SERVICE_ID=service...
REACT_APP_TEMPLATE_ID=template...
REACT_APP_CONFIRMATION_TEMPLATE_ID=template...
REACT_APP_USER_ID=...
```
4. **Start the development server**
- For Mac/Linux/PowerShell
```bash
export NODE_OPTIONS=--openssl-legacy-provider && yarn start
```
- For windows CMD
```bash
set NODE_OPTIONS=--openssl-legacy-provider && yarn start

```
## Heads Up
The keys to run the contact us form in the contact us page are stored in github secret. To try them on your own device, use your own keys, DO NOT PUSH THOSE KEYS INTO THE REPO. Contact the heads for access of the VRE mail id (vegaracingelectric@pes.edu) to work on the keys, eg., updating the mail template. 