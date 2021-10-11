const InputFile = ({name, value, handleInput, labelName}) => {

    return (
        <label htmlFor="userFile" className="return-form__label">
          <div className="return-form__name">
          {labelName}: <span className="return-form__star">*</span>
          </div>
          <input type="file" id="userFile" name={name} onChange={e=>{handleInput(e)}} multiple/>
          <p className="return-form__require-info">Wymagane są pliki w formacie: png, jpg, jpeg</p>
        </label>
    )
}

export default InputFile;