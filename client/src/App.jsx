import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("Error fetching message:", error);
        setMessage("Failed to connect to backend");
      });
  }, []);

  return (
    <div>
      <h1>AI Resume Analyzer</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;