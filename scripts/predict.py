import sys
import json
import joblib
import numpy as np
import pandas as pd
import os

def main():
    try:
        # Load input data from a file
        with open(sys.argv[1], 'r') as f:
            input_data = json.load(f)
        
        print("Input Data:", input_data, file=sys.stderr)  # Hata ayıklama için stderr'e yazın

        # Get the directory of the current script
        script_dir = os.path.dirname(__file__)

        # Load model, encoders, and feature names
        model_path = os.path.join(script_dir, '..', 'public', 'models', 'interest_predictor_model2.joblib')
        encoder_path = os.path.join(script_dir, '..', 'public', 'models', 'label_encoders2.joblib')
        feature_names_path = os.path.join(script_dir, '..', 'public', 'models', 'feature_names2.joblib')

        model = joblib.load(model_path)
        label_encoders = joblib.load(encoder_path)
        feature_names = joblib.load(feature_names_path)

        # Process input data
        features = np.array([
            input_data['Gender'],
            input_data['Age'],
            input_data['Reading Books'],
            input_data['Archival Research'],
            input_data['Listening Music'],
            input_data['Visiting Museums'],
            input_data['Interest in Software and Computers'],
            input_data['Interest in Dancing'],
            input_data['Watching Sports'],
            input_data['Following Science Symposiums'],
            input_data['Interest in Science'],
            input_data['Interest in Space Science'],
            input_data['Interest in Technology'],
            input_data['Questioning Life'],
            input_data['Thinking about Social Issues'],
            input_data['Cooking'],
            input_data['Interest in Literature'],
            input_data['Thinking about General Problems'],
            input_data['Traveling']
        ]).reshape(1, -1)

        # Encode input data
        for column in feature_names:
            if column in label_encoders:
                features[0][feature_names.index(column)] = label_encoders[column].transform([features[0][feature_names.index(column)]])[0]

        # Convert features to a DataFrame with the correct column names
        features_df = pd.DataFrame(features, columns=feature_names)

        # Predict interests
        prediction = model.predict(features_df)

        # If-else statements to convert numerical predictions to categorical values
        def decode_interest(value):
            if value == 0:
                return "Bilim"
            elif value == 1:
                return "Edebiyat"
            elif value == 2:
                return "Felsefe"
            elif value == 3:
                return "Gastronomi"
            elif value == 4:
                return "Psikoloji"
            elif value == 5:
                return "Sanat"
            elif value == 6:
                return "Seyahat"
            elif value == 7:
                return "Sosyoloji"
            elif value == 8:
                return "Spor"
            elif value == 9:
                return "Tarih"
            elif value == 10:
                return "Teknoloji"
            else:
                return "Unknown"

        interest1_prediction = decode_interest(int(prediction[0][0]))
        interest2_prediction = decode_interest(int(prediction[0][1]))
        interest3_prediction = decode_interest(int(prediction[0][2]))

        decoded_prediction = [
            interest1_prediction,
            interest2_prediction,
            interest3_prediction
        ]

        # Print the decoded predictions
        print("Decoded Prediction:", decoded_prediction, file=sys.stderr)  # Hata ayıklama için stderr'e yazın
        print(json.dumps(decoded_prediction))  # stdout'a JSON yazın

    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
