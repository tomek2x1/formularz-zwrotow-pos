const AddRemoveButtons = ({ addProductForm, removeProductForm, validation, productlist }) => {
    return (
        <>
            <div className={validation ? `return-form__buttons-wrapper return-form__buttons-wrapper-warning` : `return-form__buttons-wrapper`}>
                <div className="return-form__btn-wrapper">
                <button
                    className="return-form__btn return-form__btn--small return-form__btn--add"
                    onClick={addProductForm}
                >
                    Dodaj pozycję
                </button>
                <button
                    className="return-form__btn return-form__btn--small return-form__btn--remove"
                    onClick={removeProductForm}
                    disabled={productlist === 0 ? true : null}
                >
                    Usuń pozycję
                </button>
                </div>
                </div>
                {validation ? (
                <p className="return-form__require-info">Dodaj reklamowany produkt</p>
            ) : null}
        </>
    );
  };
  
  export default AddRemoveButtons;
  