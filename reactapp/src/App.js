import React, { useState } from 'react';
import './App.css';

function App() {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [newSchema, setNewSchema] = useState('');
  const [schemasToAdd, setSchemasToAdd] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ]);

  const handleSaveSegment = () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map(schema => ({ [schema.value]: schema.label }))
    };
    console.log(data); // Log data to console
    sendDataToWebhook(data);
  };

  const sendDataToWebhook = (data) => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy
    const webhookUrl = 'https://webhook.site/977e38c8-f23d-4bd8-99fb-460072ad00c2';

    fetch(proxyUrl + webhookUrl, { // Using CORS proxy URL as a prefix
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log('Data sent to server:', data))
    .catch(error => console.error('Error sending data:', error));
  };

  const handleAddNewSchema = () => {
    if (newSchema !== '') {
      const selectedSchema = schemasToAdd.find(schema => schema.value === newSchema);
      setSelectedSchemas(prevState => [...prevState, selectedSchema]);
      setSchemasToAdd(prevState => prevState.filter(schema => schema.value !== newSchema));
      setNewSchema('');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Segment Creator</h1>
      </header>
      <div className="container">
        <div className="form-container">
          <input className="segment-name" type="text" value={segmentName} onChange={e => setSegmentName(e.target.value)} placeholder="Enter segment name" />
          <div className="dropdown-container">
            <select className="schema-dropdown" value={newSchema} onChange={e => setNewSchema(e.target.value)}>
              <option value="">Add schema to segment</option>
              {schemasToAdd.map(schema => (
                <option key={schema.value} value={schema.value}>{schema.label}</option>
              ))}
            </select>
            <button className="add-schema-btn" onClick={handleAddNewSchema}>+ Add new schema</button>
          </div>
          <div className="selected-schemas-container">
            {selectedSchemas.map(schema => (
              <div key={schema.value} className="selected-schema">
                {schema.label}
              </div>
            ))}
          </div>
          <button className="save-btn" onClick={handleSaveSegment}>Save the segment</button>
        </div>
      </div>
    </div>
  );
}

export default App;
