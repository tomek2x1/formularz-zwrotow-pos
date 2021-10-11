const InputTooltip = ({
  name,
  value,
  labelName,
  handleInput,
  type,
  minValue,
  validation,
}) => {
  return (
    <label
      htmlFor={name}
      className={
        validation
          ? "return-form__label return-form__tooltip return-form__require"
          : "return-form__label return-form__tooltip"
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
        min={minValue != "" ? minValue : null}
      />
      <span className="return-form__tooltiptext">
        Prosimy o przepisanie nazwy produktu z faktury lub maila
        potwierdzającego zamówienie
      </span>
      {validation ? (
        <p className="return-form__require-info">
          Prosimy o podanie nazwy produktu
        </p>
      ) : null}
    </label>
  );
};

export default InputTooltip;
