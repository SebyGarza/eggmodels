import pandas as pd

def save_2024_games_as_json(csv_path, json_path):
    # Load the CSV file into a DataFrame
    df = pd.read_csv(csv_path, low_memory=False)
    
    # Convert the 'date' column to datetime
    df['date'] = pd.to_datetime(df['date'])
    
    # Filter for games that took place in the 2024 season
    df_2024 = df[df['date'].dt.year == 2024]
    
    # Save the filtered DataFrame to a JSON file
    df_2024.to_json(json_path, orient='records', date_format='iso')

csv_path = 'src/python/mlb/csv_json/mlb-elo-latest.csv'
json_path = 'src/python/mlb/csv_json/mlb-elo-2024.json'
save_2024_games_as_json(csv_path, json_path)