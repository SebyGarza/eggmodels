import requests
from bs4 import BeautifulSoup
import json

# URL of the NFL 2023 schedule page
url = "https://www.pro-football-reference.com/years/2023/games.htm"

# Send an HTTP GET request to the URL
response = requests.get(url)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Parse the HTML content of the page using BeautifulSoup
    soup = BeautifulSoup(response.text, "html.parser")

    # Find all HTML tables on the page
    tables = soup.find_all("table")

    # Loop through the tables and look for one that resembles the schedule table
    schedule_table = None
    for table in tables:
        # Check if the table contains rows with at least 3 columns (typical for a schedule table)
        rows = table.find_all("tr")
        if any(len(row.find_all(["th", "td"])) >= 3 for row in rows):
            schedule_table = table
            break

    # If the schedule table is found, collect specific columns (week, day, date, time, team names)
    if schedule_table is not None:
        schedule_data = []
        rows = schedule_table.find_all("tr")
        for row in rows:
            columns = row.find_all(["th", "td"])
            if len(columns) >= 7:  # Ensure there are enough columns for the data you need
                week = columns[0].text.strip()
                day = columns[1].text.strip()
                date = columns[2].text.strip()
                time = columns[3].text.strip()
                team_names1 = columns[4].text.strip()
                team_names2 = columns[6].text.strip()
                game_data = {
                    "Week": week,
                    "Day": day,
                    "Date": date,
                    "Time": time,
                    "TeamNames1": team_names1,
                    "TeamNames2": team_names2,
                }
                schedule_data.append(game_data)

        # Serialize the collected data as a JSON file
        with open("nfl_schedule.json", "w") as json_file:
            json.dump(schedule_data, json_file, indent=2)

        print("JSON file saved successfully.")
    else:
        print("Schedule table not found on the page.")
else:
    print("Failed to retrieve the webpage.")
