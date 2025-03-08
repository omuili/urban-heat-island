import sys
import joblib
import numpy as np

# Load the model and encoder
try:
    model = joblib.load('temperature_model.joblib')
    le = joblib.load('city_encoder.joblib')
except Exception as e:
    print(f"Error loading model or encoder: {str(e)}", file=sys.stderr)
    sys.exit(1)

# Get input from command line arguments
try:
    city = sys.argv[1]
    hour = float(sys.argv[2])
    total_consumption = float(sys.argv[3])
    cooling_specific = float(sys.argv[4])
    built_up_area = float(sys.argv[5])
    green_space = float(sys.argv[6])
except IndexError:
    print("Not enough arguments provided", file=sys.stderr)
    sys.exit(1)
except ValueError:
    print("Invalid argument type", file=sys.stderr)
    sys.exit(1)

# Encode the city
try:
    city_encoded = le.transform([city])[0]
except ValueError:
    print(f"Unknown city: {city}", file=sys.stderr)
    sys.exit(1)

# Make prediction
try:
    input_data = np.array([[hour, total_consumption, cooling_specific, built_up_area, green_space, city_encoded]])
    prediction = model.predict(input_data)[0]
    print(prediction)
except Exception as e:
    print(f"Prediction error: {str(e)}", file=sys.stderr)
    sys.exit(1)

