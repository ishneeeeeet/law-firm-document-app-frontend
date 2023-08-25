
function App() {
  const handleSubmit = () => {};

  return (
    <>
      <h1>Sale File</h1>
      <form onSubmit={handleSubmit}>
      <input type="file" className="file-input file-input-bordered w-full max-w-xs" />

      </form>
    </>
  );
}

export default App;
