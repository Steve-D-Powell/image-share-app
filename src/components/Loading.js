import "../css/loader.css";

const Loading = ({ isLoading, homeLoading }) => {
  const classCheck = homeLoading !== undefined ? "home" : "";
  return (
    <div className={`gallery-loading-container ${classCheck}`}>
      <div className="overlay">
        <span className="loader">
          <span className="loader__rocket">
            <svg width="164" height="164">
              <circle
                className="loader__circle"
                cx="78"
                cy="82"
                r="77"
                transform="rotate(-90, 80, 80)"
              />
            </svg>
            <i className="loader__icon">
              <svg className="loader__svg">
                <polygon points="21 26.24 15.15 21.04 15.15 6.22 10.51 0 5.86 6.22 5.86 17.46 5.85 21.04 0 26.24 0 36 5.86 30.79 5.86 32.39 10.51 32.39 15.15 32.39 15.15 30.8 21 36 21 26.24" />
              </svg>
            </i>
          </span>
        </span>
        <span className="loading-text">LOADING</span>
      </div>
    </div>
  );
};

export default Loading;
