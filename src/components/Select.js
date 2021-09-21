import "../css/select.css";

const Select = ({ onChange, values }) => {
  return (
    <div className="images-selecter--container">
      <select
        className="images-selecter--select"
        onChange={(e) => onChange(e.target.value)}
        defaultValue={values[0].value}
      >
        {values.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
