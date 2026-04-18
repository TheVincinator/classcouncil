from datetime import datetime, timezone
import requests
from flask import Flask, jsonify
from flask_cors import CORS
from icalendar import Calendar
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

def get_event_tags(component):
    """Extract event tags from categories"""
    tags = []
    categories = component.get("categories", [])
    
    # Categories can be a single value or a list
    if not isinstance(categories, list):
        categories = [categories]
    
    for category in categories:
            # Try to get the actual string value
            if hasattr(category, 'to_ical'):
                tag_str = category.to_ical().decode('utf-8')
            else:
                tag_str = str(category)
            
            # Split by comma if multiple tags
            if ',' in tag_str:
                tag_list = [tag.strip() for tag in tag_str.split(',')]
                tags.extend(tag_list)
            else:
                tags.append(tag_str)
    
    # Remove duplicates and return
    return list(set(tags))

@app.route("/api/events/")
def events_api():
    ics_url = "https://cornell.campusgroups.com/ics?group_ids=26888&school=cornell"
    response = requests.get(ics_url)

    print("Response status:", response.status_code)
    print("Response length:", len(response.text))

    cal = Calendar.from_ical(response.text)

    now = datetime.now(timezone.utc)
    print("Current time:", now)

    seen_uids = set()
    upcoming = []
    past = []

    for component in cal.walk():
        if component.name != "VEVENT":
            continue

        print("\n--- Found event:", component.get("summary"))

        uid = str(component.get("uid"))
        if uid in seen_uids:
            print("  -> Duplicate, skipping")
            continue
        seen_uids.add(uid)

        start = component.get("dtstart").dt
        end = component.get("dtend").dt
        print("  Event start:", start)
        print("  Event end:", end)

        if not isinstance(start, datetime):
            start = datetime.combine(start, datetime.min.time(), tzinfo=timezone.utc)
            print("  Converted to datetime:", start)

        event_url = str(component.get("url", ""))
        image_url = get_event_image(event_url)

        event = {
            "title": str(component.get("summary")),
            "start": start.isoformat(),
            "end": end.isoformat(),
            "location": str(component.get("location", "")),
            "description": str(component.get("description", "")),
            "url": event_url,
            "image": image_url,
            "tags": get_event_tags(component)
        }

        if start > now:
            print("  -> Adding to UPCOMING")
            upcoming.append(event)
        else:
            print("  -> Adding to PAST")
            past.append(event)

    manual_past_events = [
        {
            "title": "Class of 2028: Valentine’s Day Candy Grams",
            "start": "2026-02-09T16:30:00Z",
            "end": "2026-02-09T21:30:00Z",
            "location": "Sign in to download the location",
            "description": "Class Councils, Class of 2028, is excited to host a free Valentine’s Day candy gram making event in the WSH Lobby! \n---\nEvent Details: https://cornell.campusgroups.com/rsvp?id=2299037",
            "url": "https://cornell.campusgroups.com/rsvp?id=2299037",
            "image": "https://cornell.campusgroups.com/upload/cornell/2026/r3_image_upload_5159597_IMG_5939_2512242.png",
            "tags": ["CUCC", "Open Event", "Social", "Free", "Community", "Student Programming Council", "Student Life", "DIY"]
        },
        {
            "title": "Cocoa, Cards, and Crafts",
            "start": "2026-02-10T22:00:00Z",
            "end": "2026-02-10T23:00:00Z",
            "location": "Willard Straight Hall Memorial Room, Ithaca, New York 14853, United States",
            "description": "Stop by Cocoa, Cards, and Crafts for a cozy Valentine’s Day break! Enjoy hot cocoa while making cards and fun crafts to celebrate love, friendship, and self-care.\n---\nEvent Details: https://cornell.campusgroups.com/rsvp?id=2298060",
            "url": "https://cornell.campusgroups.com/rsvp?id=2298060",
            "image": "https://cornell.campusgroups.com/upload/cornell/2026/r3_image_upload_4957651_12_Banner_2218036.png",
            "tags": ["CUCC", "Open Event", "Student Programming Council", "Student Life", "Self-Care", "Mental Health", "Free", "Fun", "Food/Drink"]
        },
        {
            "title": "Carnelian Gala",
            "start": "2026-02-08T00:00:00Z",
            "end": "2026-02-08T02:00:00Z",
            "location": "Sign in to download the location",
            "description": "Step into the spotlight for a night of glitz, glamour, and Hollywood magic ✨ Walk the red carpet, sip on star-studded themed mocktails, enjoy iconic bites, and grab exclusive merch fit for an A-lister. Capture the night at our special photobooth, get a tarot card reading for a touch of mystique, and experience even more surprises worthy of the silver screen. 🎬🍸\n---\nEvent Details: https://cornell.campusgroups.com/rsvp?id=2296427",
            "url": "https://cornell.campusgroups.com/rsvp?id=2296427",
            "image": "https://cornell.campusgroups.com/upload/cornell/2026/r3_image_upload_4153080_Carnelian_Gala_Flyers_2026_760_x_380_px_1200302.png",
            "tags": ["CUCC", "Open Event", "Free", "Fun", "Student Life", "Student Programming Council"]
        },
        {
            "title": "Calm Down With Cookies",
            "start": "2025-12-11T16:00:00Z",
            "end": "2025-12-11T18:00:00Z",
            "location": "Sign in to download the location",
            "description": "Need a breather? Join us for Calm Down with Cookies. Unwind with crafts like aromatherapy, mini self-care kits, and Legos, plus plenty of cookies to sweeten your day!\n---\nEvent Details: https://cornell.campusgroups.com/rsvp?id=2295298",
            "url": "https://cornell.campusgroups.com/rsvp?id=2295298",
            "image": "https://cornell.campusgroups.com/upload/cornell/2025/r3_image_upload_4153080_calmdown_with_cookies_760_x_380_px_111311320.png",
            "tags": ["CUCC", "Open Event", "100 Years of WSH", "Community", "Free", "Food/Drink", "Student Programming Council"]
        },
        {
            "title": "Holiday Paint & Sip",
            "start": "2025-12-04T21:00:00Z",
            "end": "2025-12-04T23:00:00Z",
            "location": "Sign in to download the location",
            "description": "Join the Class of 2028 to paint and de-stress before finals week! Enjoy free hot chocolate and holiday sweets with your friends to end off the semester. We can't wait to see you there! \n---\nEvent Details: https://cornell.campusgroups.com/rsvp?id=2294999",
            "url": "https://cornell.campusgroups.com/rsvp?id=2294999",
            "image": "https://cornell.campusgroups.com/upload/cornell/2025/r3_image_upload_5159597_Brown_and_White_Classy_and_Refined_Community_Events_Thanksgiving_Banner_Landscape_2_118105120.jpeg",
            "tags": ["CUCC", "Open Event", "Student Programming Council", "Community", "Food/Drink", "Free", "Self-Care", "Art"]
        }
    ]

    past.extend(manual_past_events)

    upcoming.sort(key=lambda e: e["start"])
    past.sort(key=lambda e: e["start"], reverse=True)

    # Limit past events to last 10 only
    # past = past[:10]

    print(f"\n=== FINAL COUNTS ===")
    print(f"Upcoming events: {len(upcoming)}")
    print(f"Past events: {len(past)}")

    return jsonify({
        "upcoming": upcoming,
        "past": past
    })

def get_event_image(event_url):
    try:
        page = requests.get(event_url, timeout=5)
        soup = BeautifulSoup(page.text, "html.parser")

        og_image = soup.find("meta", property="og:image")

        if og_image and og_image.get("content"):
            return og_image["content"]

    except Exception:
        return None

    return None

if __name__ == "__main__":
    app.run(debug=True)