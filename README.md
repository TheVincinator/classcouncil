# Cornell Class Councils Website

The official website for Cornell University Class Councils — fostering class unity, tradition, and leadership.

## Tech Stack

**Frontend:** React, Tailwind CSS, Framer Motion, React Router  
**Backend:** Python, Flask, Gunicorn  
**Deployment:** Vercel (frontend), Render (backend)

## Pages

- **Home** — Hero section, mission statement, and Instagram CTA
- **Events** — Featured events and live upcoming/past events pulled from CampusGroups
- **Leadership Team** — Grid of current team members with optional headshots
- **About Us** — Mission, what we do, and team overview
- **Apply** — Recruitment timeline and application form (togglable)

## Project Structure

```
classcouncil/
├── public/               # Static assets (images, favicon)
├── src/
│   ├── App.js            # Routes
│   ├── Navbar.js         # Navigation with mobile hamburger menu
│   ├── Footer.js         # Social media links
│   ├── ScrollToTop.js    # Scroll to top on route change
│   ├── NotFound.js       # 404 page
│   ├── Home.js
│   ├── Events.js
│   ├── EventCard.js
│   ├── Team.js
│   ├── Aboutus.js
│   └── Join.js
├── backend/
│   ├── app.py            # Flask API
│   └── requirements.txt
└── .env.local            # Local environment variables (not committed)
```

## Local Development

### Prerequisites
- Node.js
- Python 3

### Frontend

```bash
npm install
npm start
```

Runs on `http://localhost:3000`

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Runs on `http://localhost:5000`

### Environment Variables

Create a `.env.local` file in the project root:

```
REACT_APP_API_URL=http://localhost:5000
```

## Deployment

### Frontend — Vercel
1. Import the repo on [vercel.com](https://vercel.com)
2. Add environment variable: `REACT_APP_API_URL=<your-render-url>`
3. Deploy

### Backend — Render
1. Create a new Web Service on [render.com](https://render.com)
2. Set **Root Directory** to `backend`
3. Set **Build Command** to `pip install -r requirements.txt`
4. Set **Start Command** to `gunicorn app:app`
5. Deploy

## Events

Live events are fetched from CampusGroups via their ICS feed. Past events that have aged out of the feed are preserved in `manual_past_events` in `backend/app.py`.

## Recruitment

To open/close the application form, update the flag at the top of `src/Join.js`:

```js
const APPLICATIONS_OPEN = false; // set to true when recruitment opens
```

## Team Photos

To add headshots on the Leadership Team page, add a `photo` filename to the member's entry in `src/Team.js`:

```js
{ name: "Jane Doe", role: "President", photo: "janedoe.png" }
```

Then place the image file in the `public/` folder.
