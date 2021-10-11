const Input = ({
  name,
  value,
  labelName,
  handleInput,
  type,
  minValue,
  validation,
  maxDate,
  errorMsg,
}) => {
  return (
    <label
      htmlFor={name}
      className={
        validation
          ? "return-form__label return-form__require"
          : "return-form__label"
      }
    >
      <div className="return-form__name">
        {labelName}: <span className="return-form__star">*</span>
      </div>
      <input
        type={type}
        id={name}
        value={value}
        name={name}
        onChange={(e) => {
          handleInput(e);
        }}
        className="require return-form__field"
      />
      {validation ? (
        <p className="return-form__require-info">{errorMsg}</p>
      ) : null}
    </label>
  );
};

export default Input;
