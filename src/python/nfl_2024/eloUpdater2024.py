import math
import pandas as pd

def eloRevert(oldElo):
    return 1505 * (1/3) + oldElo * (2/3)

def eloWinProb(homeElo, awayElo):
    # Calculate the expected outcome for each player
    eloDiff = homeElo - awayElo
    homeProb = 1 / (1 + math.pow(10, -(eloDiff+65) / 400) ) #65 is Home Field Advantage Adjustment
    awayProb = 1 / (1 + math.pow(10, (eloDiff+65) / 400)  )
    return homeProb, awayProb

def update_elo_ratings(homeElo, awayElo, homePointDiff):
    # Calculate the expected win probability for the home team
    K = 20
    expected_win_prob_home, expected_win_prob_away = eloWinProb(homeElo, awayElo)
    # Determine the result based on the point differential
    if homePointDiff > 0:
        result_home = 1
        result_away = 0
    elif homePointDiff < 0:
        result_home = 0
        result_away = 1
    else:
        result_home = 0.5
        result_away = 0.5

    # Margin of Victory Multiplier    
    absolute_point_diff = abs(homePointDiff)
    movMultiplier = math.log(absolute_point_diff + 1) * (2.2 / (absolute_point_diff * 0.001 + 2.2))
    
    # Update Elo ratings
    updated_home_elo = homeElo + K * (result_home - expected_win_prob_home) * movMultiplier 
    updated_away_elo = awayElo + K * (result_away - expected_win_prob_away) * movMultiplier

    return updated_home_elo, updated_away_elo

def update_win_prob_2024(df):
    for index, row in df.iterrows():
        # Check if ElopreH and ElopreA are not None
        if not pd.isnull(row['ElopreH']) and not pd.isnull(row['ElopreA']):
            # Calculate probH and probA using the eloWinProb function
            home_team = row['ElopreH']
            away_team = row['ElopreA']
            expected1, expected2 = eloWinProb(home_team, away_team)

            # Update the DataFrame with the calculated values
            df.at[index, 'probH'] = expected1
            df.at[index, 'probA'] = expected2

    return df

def update_post_elos(df):
    for index, row in df.iterrows():
        # Check if ScoreH is not empty (assuming ScoreH is a numeric column)
        if not pd.isnull(row['ScoreH']) and not pd.isnull(row['probH']):
            # Calculate ElopostH and ElopostA using the update_elo_ratings function
            home_elo_pre = row['ElopreH']
            away_elo_pre = row['ElopreA']
            home_point_diff = row['ScoreH'] - row['ScoreA']
            updated_home_elo, updated_away_elo = update_elo_ratings(home_elo_pre, away_elo_pre, home_point_diff)

            # Update the DataFrame with the calculated values
            df.at[index, 'ElopostH'] = updated_home_elo
            df.at[index, 'ElopostA'] = updated_away_elo
    return df

def transfer_post_to_pre(df, followingWeek):
    # Initialize a dictionary to store the latest team Elo ratings
    team_latest_elo = {}

    # Iterate through the rows of the DataFrame for the current week
    for index, row in df.iterrows():
        if row['Week'] == followingWeek - 2:  # Check if the Week column is equal to the previous week
            home_team = row['Home']
            away_team = row['Away']
            elo_post_h = row['ElopostH']
            elo_post_a = row['ElopostA']

            # Update the latest Elo ratings for home and away teams
            team_latest_elo[home_team] = elo_post_h
            team_latest_elo[away_team] = elo_post_a
        
        if row['Week'] == followingWeek - 1:  # Check if the Week column is equal to the previous week
            home_team = row['Home']
            away_team = row['Away']
            elo_post_h = row['ElopostH']
            elo_post_a = row['ElopostA']

            # Update the latest Elo ratings for home and away teams
            team_latest_elo[home_team] = elo_post_h
            team_latest_elo[away_team] = elo_post_a

    # Iterate through the rows of the DataFrame for the following week
    for index, row in df.iterrows():
        if row['Week'] == followingWeek:
            home_team = row['Home']
            away_team = row['Away']

            # Get the latest Elo rating for the home team
            df.at[index, 'ElopreH'] = team_latest_elo.get(home_team)

            # Get the latest Elo rating for the away team
            df.at[index, 'ElopreA'] = team_latest_elo.get(away_team)

    return df

def update_home_elo_spread(df):
    for index, row in df.iterrows():
        if not pd.isnull(row['ElopreH']):
            home_team = row['ElopreH']
            away_team = row['ElopreA']
            df.at[index, 'eloSpread'] = -(home_team - away_team + 65) / 25
    return df

def eloInit2024(df):
    elo_ratings = {'Rams': 1528.0089550979, 'Bills': 1680.7919693311, 'Dolphins': 1560.089544108, 'Patriots': 1357.7385330304, 'Bengals': 1584.3388714443, 'Steelers': 1548.1857372633, 'Falcons': 1404.7919853796, 'Saints': 1528.5292762906, 'Jets': 1428.2743951101, 'Ravens': 1698.5040729807, 'Panthers': 1275.9073386976, 'Browns': 1503.2941240452, 'Commanders': 1325.9133347224, 'Jaguars': 1483.8722050635, 'Lions': 1609.9090225553, 'Eagles': 1538.2708488579, 'Bears': 1445.5945198394, '49ers': 1717.4603613807, 'Texans': 1495.2849973243, 'Colts': 1449.1248490966, 'Vikings': 1478.8709878307, 'Packers': 1586.9817579459, 'Cardinals': 1364.7391170102, 'Chiefs': 1713.1392142694, 'Titans': 1399.182359068, 'Giants': 1436.4663792418, 'Chargers': 1414.1927719305, 'Raiders': 1495.4198402115, 'Cowboys': 1617.3456146225, 'Buccaneers': 1535.036434977, 'Seahawks': 1499.5585111418, 'Broncos': 1455.1239691316}

    # Update ElopreH and ElopreA columns only for week 1 games
    for index, row in df.iterrows():
        if row["Week"] == 1:
            home_team = row["Home"]
            away_team = row["Away"]
            if home_team in elo_ratings:
                df.at[index, "ElopreH"] = elo_ratings[home_team]
            if away_team in elo_ratings:
                df.at[index, "ElopreA"] = elo_ratings[away_team]
        else:
            df.at[index, "ElopreH"] = None
            df.at[index, "ElopreA"] = None
    
    return df
