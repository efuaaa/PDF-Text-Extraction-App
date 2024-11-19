import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState<File | null | undefined>(null);

  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      console.error('No file selected');
      return;
    }

    const url = 'http://localhost:3000/uploadFile'; // Verify this URL
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios
      .post(url, formData, config)
      .then((response) => {
        console.log('File uploaded successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  }

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleChange} />
          <button type="submit">Upload</button>
        </form>
      </div>

      <div>
        <h1>FastAPI + React</h1>
        <p>{data}</p>
      </div>
    </>
  );
}

export default App;
