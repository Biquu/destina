'use client';

import { useState } from 'react';

export default function Predict() {
  const [formData, setFormData] = useState({
    Gender: '',
    Age: '',
    'Reading Books': '',
    'Archival Research': '',
    'Listening Music': '',
    'Visiting Museums': '',
    'Interest in Software and Computers': '',
    'Interest in Dancing': '',
    'Watching Sports': '',
    'Following Science Symposiums': '',
    'Interest in Science': '',
    'Interest in Space Science': '',
    'Interest in Technology': '',
    'Questioning Life': '',
    'Thinking about Social Issues': '',
    Cooking: '',
    'Interest in Literature': '',
    'Thinking about General Problems': '',
    Traveling: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    for (let key in formData) {
      if (formData[key] === '') {
        setError(`Please fill in the ${key} field.`);
        return;
      }
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        console.error('Error details:', errorData.details);
        return;
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Interest Predictor</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type={key === 'Age' ? 'number' : 'text'}
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" disabled={loading}>Predict</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && (
        <div style={{ color: 'red' }}>
          <p>Error: {error}</p>
        </div>
      )}
      {prediction && (
        <div>
          <h2>Predicted Interests</h2>
          <p>{prediction.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
