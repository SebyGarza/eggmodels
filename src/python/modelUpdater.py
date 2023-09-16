from eloUpdater import *
from scrapeFR import *

nflModel = scheduleScraper()

nflModel = eloInit(nflModel)

# Add winProb
for index, row in nflModel.iterrows():
    # Check if ElopreH is not empty (assuming ElopreH is a numeric column)
    if not pd.isnull(row['ElopreH']):
        # Calculate probH and probA using the eloWinProb function
        home_team = row['ElopreH']
        away_team = row['ElopreA']
        expected1, expected2 = eloWinProb(home_team, away_team)  # Replace with your eloWinProb function

        # Update the DataFrame with the calculated values
        nflModel.at[index, 'probH'] = expected1
        nflModel.at[index, 'probA'] = expected2

# Add PostElo
for index, row in nflModel.iterrows():
    # Check if ScoreH is not empty (assuming ScoreH is a numeric column)
    if not pd.isnull(row['ScoreH']) and not pd.isnull(row['probH']):
        # Calculate ElopostH and ElopostA using the update_elo_ratings function
        home_elo_pre = row['ElopreH']
        away_elo_pre = row['ElopreA']
        home_point_diff = row['ScoreH'] - row['ScoreA']
        updated_home_elo, updated_away_elo = update_elo_ratings(home_elo_pre, away_elo_pre, home_point_diff)

        # Update the DataFrame with the calculated values
        nflModel.at[index, 'ElopostH'] = updated_home_elo
        nflModel.at[index, 'ElopostA'] = updated_away_elo

#Transfer Post to Pre Elo
# Initialize an empty dictionary to store team Elo ratings
team_elo_ratings = {}

## Initialize an empty dictionary to store team Elo ratings
team_elo_ratings = {}

# Iterate through the rows of the DataFrame
for index, row in nflModel.iterrows():
    if row['Week'] == "1":  # Check if the Week column is equal to 1
        home_team = row['Home']
        away_team = row['Away']
        elo_post_h = row['ElopostH']
        elo_post_a = row['ElopostA']
        
        # Update or add home team Elo rating to the dictionary
        if home_team in team_elo_ratings:
            team_elo_ratings[home_team].append(elo_post_h)
        else:
            team_elo_ratings[home_team] = [elo_post_h]
        
        # Update or add away team Elo rating to the dictionary
        if away_team in team_elo_ratings:
            team_elo_ratings[away_team].append(elo_post_a)
        else:
            team_elo_ratings[away_team] = [elo_post_a]

# At this point, team_elo_ratings contains Elo ratings for each team where Week is equal to 1

# Assume you have already populated the team_elo_ratings dictionary as described earlier

# Iterate through the rows of the DataFrame for week "2"
for index, row in nflModel.iterrows():
    if row['Week'] == "2":
        home_team = row['Home']
        away_team = row['Away']
        
        # Check if the teams exist in the Elo ratings dictionary
        if home_team in team_elo_ratings:
            nflModel.at[index, 'ElopreH'] = team_elo_ratings[home_team][-1]  # Use the latest Elo rating
        if away_team in team_elo_ratings:
            nflModel.at[index, 'ElopreA'] = team_elo_ratings[away_team][-1]  # Use the latest Elo rating

# Add winProb
for index, row in nflModel.iterrows():
    # Check if ElopreH is not empty (assuming ElopreH is a numeric column)
    if not pd.isnull(row['ElopreH']):
        # Calculate probH and probA using the eloWinProb function
        home_team = row['ElopreH']
        away_team = row['ElopreA']
        expected1, expected2 = eloWinProb(home_team, away_team)  # Replace with your eloWinProb function

        # Update the DataFrame with the calculated values
        nflModel.at[index, 'probH'] = expected1
        nflModel.at[index, 'probA'] = expected2

for index, row in nflModel.iterrows():
    if not pd.isnull(row['ElopreH']):
        home_team = row['ElopreH']
        away_team = row['ElopreA']
        print(home_team)
        print(away_team)
        nflModel.at[index, 'eloSpread'] = -(home_team - away_team + 65) / 25

# Convert the DataFrame to JSON
json_data = nflModel.to_json(orient='records')

# Save the JSON data to a file
json_file = 'nflModel.json'  # Replace with the desired output file name
with open(json_file, 'w') as file:
    file.write(json_data)

print(nflModel.head(33))