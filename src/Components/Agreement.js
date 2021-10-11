const Agreement = ({ name, value, handleCheckbox, validation }) => {
  return (
    <div className="return-form__agreement-wrapper">
      <label
        htmlFor="userAgreement"
        className={
          validation
            ? "return-form__label return-form__agreement return-form__require"
            : "return-form__label return-form__agreement"
        }
      >
        <input
          type="checkbox"
          id="userAgreement"
          name={name}
          className="require"
          value={value}
          onChange={(e) => {
            handleCheckbox(e);
          }}
        />
        <div className="return-form__agreement-text">
          <div>
            Wyrażam zgodę na przetwarzanie moich danych osobowych przez P.W.
            MULTIMAX Damian Chwiejczak, ul. Peowiaków 9, 22-400 Zamość,
            przetwarzanych do celów związanych z reklamacją lub zwrotem towaru.{" "}
            <span className="return-form__star">*</span>
          </div>
        </div>
      </label>
      {validation ? (
        <p className="return-form__require-info">Zgoda jest wymagana</p>
      ) : null}
    </div>
  );
};

export default Agreement;
