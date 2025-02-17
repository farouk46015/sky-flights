export function Loader({ text = 'Loading...' }) {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="spinner-wrapper">
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
        <h3 className="loading-text">{text}</h3>
      </div>
    </div>
  );
}

export default Loader;
