const FormFooter = () => {
    return (
        <div className="return-form__footer">
            <div>Klauzula informacyjna RODO:</div>
            <div>
                Administratorem Państwa danych osobowych jest P.W. MULTIMAX Damian Chwiejczak, ul. Peowiaków 9, 22-400 Zamość. Dane osobowe będą przetwarzane do celów związanych z reklamacją lub zwrotem towaru.{" "}
                <a  className="return-form__footer-rodo" href="https://www.emultimax.pl/instrukcje/Polityka_cookies_emultimax_pl.pdf" target="_blank">Zobacz szczegóły</a>
            </div>
        </div>
    );
};

export default FormFooter;