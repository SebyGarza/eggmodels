from eloUpdater2024 import *
from scheduleScraper2024 import *
import os

nflModel = scheduleScraper2024()
nflModel = eloInit2024(nflModel)
nflModel = update_win_prob_2024(nflModel)

currentWeek = 4

for i in range(1, currentWeek):
    nflModel = update_post_elos(nflModel)
    nflModel = transfer_post_to_pre(nflModel, i + 1)
    nflModel = update_win_prob_2024(nflModel)
    
nflModel = update_home_elo_spread(nflModel)

directory_path = "/Users/sebygarza/documents/portfolio/eggmodels/src/python/nfl_2024"

# Convert the DataFrame to JSON
json_data = nflModel.to_json(orient='records')

file_path = os.path.join(directory_path, 'nflModel2024.json')

# Save the JSON data to a file
with open(file_path, 'w') as file:
    file.write(json_data)