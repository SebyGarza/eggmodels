from eloUpdater import *
from scrapeFR import *

nflModel = scheduleScraper()
nflModel = eloInit(nflModel)
nflModel = update_win_prob(nflModel)
nflModel = update_post_elos(nflModel)
nflModel = transfer_post_to_pre(nflModel, 2)
nflModel = update_win_prob(nflModel)
nflModel = update_home_elo_spread(nflModel)


# Convert the DataFrame to JSON
json_data = nflModel.to_json(orient='records')

# Save the JSON data to a file
json_file = 'nflModel.json'  # Replace with the desired output file name
with open(json_file, 'w') as file:
    file.write(json_data)

print(nflModel)