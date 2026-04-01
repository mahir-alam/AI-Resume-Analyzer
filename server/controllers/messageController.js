// What is a controller?
// A controller contains the business logic of the application.
// It defines what happens when a request is received.
// Separating controllers keeps logic modular, reusable, and easier to maintain.

const getMessage = (req, res) => {
  res.json({
    message: "Hello from backend",
  });
};

export { getMessage };