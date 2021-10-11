const Select = ({
  name,
  value,
  handleInput,
  labelName,
  optionsValue,
  validation,
  errorMsg,
}) => {
  const options = optionsValue.map((finish, index) => {
    return (
      <option key={index} value={finish}>
        {finish}
      </option>
    );
  });

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
      <select
        id={name}
        value={value}
        name={name}
        onChange={(e) => {
          handleInput(e);
        }}
        className="require return-form__field"
      >
        <option value="" defaultValue readOnly>
          Wybierz
        </option>
        {options}
      </select>
      {validation ? (
        <p className="return-form__require-info">{errorMsg}</p>
      ) : null}
    </label>
  );
};

export default Select;
