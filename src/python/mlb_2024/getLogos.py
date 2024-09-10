import requests
from bs4 import BeautifulSoup
import os

def ensure_full_url(url):
    if url.startswith('//'):
        return 'https:' + url  # Assuming https is the correct scheme
    return url

def fetch_team_logos(url, save_dir='mlb_team_logos'):
    response = requests.get(url)
    if response.status_code != 200:
        print('Failed to retrieve the page')
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    logo_images = soup.find_all('img', alt=lambda value: value and 'logo' in value)

    if not os.path.exists(save_dir):
        os.makedirs(save_dir)

    for img in logo_images:
        logo_url = ensure_full_url(img['src'])  # Correct the URL if necessary
        alt_text = img['alt']
        team_name = alt_text.replace(' logo', '').replace(" ", "_")  # Clean up team name from alt text
        
        logo_response = requests.get(logo_url)
        if logo_response.status_code == 200:
            file_extension = logo_url.split('.')[-1].split('?')[0]  # Guess file extension from URL
            with open(f'{save_dir}/{team_name}.{file_extension}', 'wb') as file:
                file.write(logo_response.content)
            print(f'Downloaded logo for {team_name}')
        else:
            print(f'Failed to download logo for {team_name}')

if __name__ == '__main__':
    mlb_teams_url = 'https://www.mlb.com/team'
    fetch_team_logos(mlb_teams_url)
