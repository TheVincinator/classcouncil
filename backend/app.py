from datetime import datetime, timezone, date as date_type
import requests
from flask import Flask, jsonify
from flask_cors import CORS
from icalendar import Calendar
from bs4 import BeautifulSoup
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)


def make_aware(dt):
    """Ensure a datetime is timezone-aware (UTC). Handles date, naive datetime, and aware datetime."""
    if isinstance(dt, date_type) and not isinstance(dt, datetime):
        return datetime(dt.year, dt.month, dt.day, tzinfo=timezone.utc)
    if isinstance(dt, datetime):
        if dt.tzinfo is None:
            return dt.replace(tzinfo=timezone.utc)
        return dt
    return dt


def get_event_tags(component):
    tags = []
    categories = component.get("categories", [])
    if not isinstance(categories, list):
        categories = [categories]
    for category in categories:
        if hasattr(category, 'to_ical'):
            tag_str = category.to_ical().decode('utf-8')
        else:
            tag_str = str(category)
        if ',' in tag_str:
            tags.extend([t.strip() for t in tag_str.split(',')])
        else:
            tags.append(tag_str)
    return list(set(tags))


def get_event_image(event_url):
    if not event_url:
        return None
    try:
        page = requests.get(event_url, timeout=3)
        soup = BeautifulSoup(page.text, "html.parser")
        og_image = soup.find("meta", property="og:image")
        if og_image and og_image.get("content"):
            return og_image["content"]
    except Exception:
        return None
    return None


manual_past_events = [
    {
        "title": "Class of 2028: Valentine's Day Candy Grams",
        "start": "2026-02-09T16:30:00+00:00",
        "end": "2026-02-09T21:30:00+00:00",
        "location": "Sign in to download the location",
        "description": "Class Councils, Class of 2028, is excited to host a free Valentine's Day candy gram making event in the WSH Lobby! \n---\nEvent Details: https://cornell.campusgroups.com/rsvp?id=2299037",
        "url": "https://cornell.campusgroups.com/rsvp?id=2299037",
        "image": "https://cornell.campusgroups.com/upload/cornell/2026/r3_image_upload_5159597_IMG_5939_2512242.png",
        "tags": ["CUCC", "Open Event", "Social", "Free", "Community", "Student Programming Council", "Student Life", "DIY"]
    },
    {
        "title": "Cocoa, Cards, and Crafts",
        "start": "2026-02-10T22:00:00+00:00",
        "end": "2026-02-10T23:00:00+00:00",
        "location": "Willard Straight Hall Memorial Room, Ithaca, New York 14853, United States",
        "description": "Stop by Cocoa, Cards, and Crafts for a cozy Valentine's Day break! Enjoy hot cocoa while making cards and fun crafts to celebrate love, friendship, and self-care.\n---\nEvent Details: https://cornell.campusgroups.com/rsvp?id=2298060",
        "url": "https://cornell.campusgroups.com/rsvp?id=2298060",
        "image": "https://cornell.campusgroups.com/upload/cornell/2026/r3_image_upload_4957651_12_Banner_2218036.png",
        "tags": ["CUCC", "Open Event", "Student Programming Council", "Student Life", "Self-Care", "Mental Health", "Free", "Fun", "Food/Drink"]
    },
    {
        "title": "Carnelian Gala",
        "start": "2026-02-08T00:00:00+00:00",
        "end": "2026-02-08T02:00:00+00:00",
        "location": "Sign in to download the location",
        "description": "Step into the spotlight for a night of glitz, glamour, and Hollywood magic ✨\n---\nEvent Details: https://cornell.campusgroups.com/rsvp?id=2296427",
        "url": "https://cornell.campusgroups.com/rsvp?id=2296427",
        "image": "https://cornell.campusgroups.com/upload/cornell/2026/r3_image_upload_4153080_Carnelian_Gala_Flyers_2026_760_x_380_px_1200302.png",
        "tags": ["CUCC", "Open Event", "Free", "Fun", "Student Life", "Student Programming Council"]
    },
    {
        "title": "Calm Down With Cookies",
        "start": "2025-12-11T16:00:00+00:00",
        "end": "2025-12-11T18:00:00+00:00",
        "location": "Sign in to download the location",
        "description": "Need a breather? Join us for Calm Down with Cookies.\n---\nEvent Details: https://cornell.campusgroups.com/rsvp?id=2295298",
        "url": "https://cornell.campusgroups.com/rsvp?id=2295298",
        "image": "https://cornell.campusgroups.com/upload/cornell/2025/r3_image_upload_4153080_calmdown_with_cookies_760_x_380_px_111311320.png",
        "tags": ["CUCC", "Open Event", "100 Years of WSH", "Community", "Free", "Food/Drink", "Student Programming Council"]
    },
    {
        "title": "Holiday Paint & Sip",
        "start": "2025-12-04T21:00:00+00:00",
        "end": "2025-12-04T23:00:00+00:00",
        "location": "Sign in to download the location",
        "description": "Join the Class of 2028 to paint and de-stress before finals week!\n---\nEvent Details: https://cornell.campusgroups.com/rsvp?id=2294999",
        "url": "https://cornell.campusgroups.com/rsvp?id=2294999",
        "image": "https://cornell.campusgroups.com/upload/cornell/2025/r3_image_upload_5159597_Brown_and_White_Classy_and_Refined_Community_Events_Thanksgiving_Banner_Landscape_2_118105120.jpeg",
        "tags": ["CUCC", "Open Event", "Student Programming Council", "Community", "Food/Drink", "Free", "Self-Care", "Art"]
    }
]


@app.route("/api/events/")
def events_api():
    # Fetch ICS with timeout and error handling
    try:
        response = requests.get(
            "https://cornell.campusgroups.com/ics?group_ids=26888&school=cornell",
            timeout=10
        )
        response.raise_for_status()
        cal = Calendar.from_ical(response.text)
    except Exception as e:
        print("Failed to fetch ICS:", e)
        # Fall back to manual events only
        past = sorted(manual_past_events, key=lambda e: e["start"], reverse=True)
        return jsonify({"upcoming": [], "past": past})

    now = datetime.now(timezone.utc)
    seen_uids = set()
    ics_titles = set()
    upcoming = []
    past = []

    for component in cal.walk():
        if component.name != "VEVENT":
            continue

        uid = str(component.get("uid"))
        if uid in seen_uids:
            continue
        seen_uids.add(uid)

        if not component.get("dtstart") or not component.get("dtend"):
            continue

        start = make_aware(component.get("dtstart").dt)
        end = make_aware(component.get("dtend").dt)
        title = str(component.get("summary"))
        ics_titles.add(title.lower())

        event_url = str(component.get("url", ""))

        event = {
            "title": title,
            "start": start.isoformat(),
            "end": end.isoformat(),
            "location": str(component.get("location", "")),
            "description": str(component.get("description", "")),
            "url": event_url,
            "image": get_event_image(event_url),
            "tags": get_event_tags(component)
        }

        if start > now:
            upcoming.append(event)
        else:
            past.append(event)

    # Add manual past events, skipping any whose title appears in the ICS feed
    for event in manual_past_events:
        if not any(event["title"].lower() in ics_title for ics_title in ics_titles):
            past.append(event)

    def parse_start(e):
        return datetime.fromisoformat(e["start"])

    upcoming.sort(key=parse_start)
    past.sort(key=parse_start, reverse=True)

    print(f"Upcoming: {len(upcoming)}, Past: {len(past)}")

    return jsonify({"upcoming": upcoming, "past": past})


if __name__ == "__main__":
    app.run(debug=True)
