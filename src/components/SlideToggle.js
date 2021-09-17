import "../css/SlideToggle.css";

const SlideToggle = ({ lText, rText, eventHandler }) => {
  return (
    <div className="switch-button-container">
      <span className="switch-title">Image Quality</span>
      <div className="switch-button" data-right-text={rText}>
        <input
          id="High-quality-images"
          className="switch-button-checkbox HD-selector"
          type="checkbox"
          onChange={eventHandler}
        ></input>
        <label className="switch-button-label" htmlFor="">
          <span className="switch-button-label-span">{lText}</span>
        </label>
      </div>
    </div>
  );
};

export default SlideToggle;
