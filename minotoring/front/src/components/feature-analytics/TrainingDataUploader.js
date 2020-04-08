import React, { useState } from 'react';
import { buildFilePostFetcher } from '../../utils/data-managers/DataFetcher';

const errorCallback = (setError, updateTrainingData) => response => {
  if (response.status === 400) {
    setError(response.statusText);
  }
  if (response.status === 200) {
    setError();
    updateTrainingData(true);
  }
};

export default function TrainingDataUploader(props) {
  const { updateTrainingData } = props;
  const [error, setError] = useState();

  const sendTrainingData = ({ file }) => {
    const data = new FormData();
    data.append('training_data', file);
    const { fetchData } = buildFilePostFetcher(
      'training-data',
      errorCallback(setError, updateTrainingData),
      data
    );
    fetchData();
  };

  return (
    <div className="training-data-uploader">
      <p>
        You have no training data. Upload training data so you can compare them
        with prediction data.
      </p>
      <label htmlFor="input-file" className="input-label">
        Upload your pickled training data
        <input
          type="file"
          id="input-file"
          onChange={e => {
            sendTrainingData({ file: e.target.files[0] });
          }}
        />
      </label>
      <p className="error-text">{error}</p>
    </div>
  );
}
