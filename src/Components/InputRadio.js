const InputRadio = ({
  name,
  labelName,
  handleInput,
  validation,
  options,
  errorMsg,
}) => {
  const showoptions = options.map((opt, index) => {
    return (
      <div key={index}>
        <label htmlFor={`${name}${index}`}>
          <input
            type="radio"
            id={`${name}${index}`}
            name={name}
            value={opt}
            onChange={(e) => {
              handleInput(e);
            }}
          />
          {opt}
        </label>
      </div>
    );
  });

  return (
    <div className="return-form__label">
      <div className="return-form__name">
        {labelName}: <span className="return-form__star">*</span>
      </div>

      <div
        id="status-wrapper"
        className={
          validation
            ? "return-form__field return-form__require"
            : "return-form__field"
        }
      >
        {showoptions}
      </div>
      {validation ? (
        <p className="return-form__require-info">{errorMsg}</p>
      ) : null}
    </div>
  );
};

export default InputRadio;
