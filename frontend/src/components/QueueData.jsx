

import React from 'react';

const QueueData = ({ data }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Queue Data</h2>
      {data && data.length > 0 ? (
        <ul className="list-disc list-inside">
          {data.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default QueueData;
