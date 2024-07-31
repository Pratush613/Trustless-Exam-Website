
const QueueData = ({ data }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Queue Data</h2>
      {data && data.length > 0 ? (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default QueueData;
