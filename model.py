import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib

# Load the data
temperature_data = pd.read_csv('data/temperature_data.csv')
land_use_data = pd.read_csv('data/land_use_data.csv')
energy_data = pd.read_csv('data/energy_consumption_data.csv')

# Merge the datasets
temperature_data['date'] = pd.to_datetime(temperature_data['date'])
energy_data['date'] = pd.to_datetime(energy_data['date'])
merged_data = pd.merge(temperature_data, energy_data, on=['date', 'city'])
merged_data['year'] = merged_data['date'].dt.year
merged_data = pd.merge(merged_data, land_use_data, on=['city', 'year'])

# Prepare the features
features = ['hour', 'total_consumption', 'cooling_specific', 'built_up_area', 'green_space']
target = 'temperature'

X = merged_data[features]
y = merged_data[target]

# Encode categorical variables
le = LabelEncoder()
X['city'] = le.fit_transform(merged_data['city'])

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'temperature_model.joblib')
joblib.dump(le, 'city_encoder.joblib')

print("Model trained and saved as temperature_model.joblib")
print("City encoder saved as city_encoder.joblib")

