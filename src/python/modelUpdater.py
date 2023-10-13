from eloUpdater import *
from scrapeFR import *
import os

nflModel = scheduleScraper()
nflModel = eloInit(nflModel)
nflModel = update_win_prob(nflModel)

currentWeek = 6
for i in range(1, currentWeek):
    nflModel = update_post_elos(nflModel)
    nflModel = transfer_post_to_pre(nflModel, i + 1)
    nflModel = update_win_prob(nflModel)
    
nflModel = update_home_elo_spread(nflModel)

directory_path = "/Users/sebygarza/portfolio/eggmodels/src/python"

# Convert the DataFrame to JSON
json_data = nflModel.to_json(orient='records')

file_path = os.path.join(directory_path, 'nflModel.json')

# Save the JSON data to a file
with open(file_path, 'w') as file:
    file.write(json_data)