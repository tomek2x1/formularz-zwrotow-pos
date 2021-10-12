import React, { useState, useEffect } from "react";

import "./App.css";

import Input from "./Components/Input";
import InputRadio from "./Components/InputRadio";
import Select from "./Components/Select";
import TextArea from "./Components/TextArea";
import AddRemoveButtons from "./Components/AddRemoveButtons";
import Agreement from "./Components/Agreement";
import FormFooter from "./Components/FormFooter";

const App = () => {
  const [state, setState] = useState({
    worker: "",
    placeBuy: "",
    docNumber: "",
    reason: "",
    anotherReason: "",
    status: "",
    name: "",
    email: "",
    phone: "",
    accountNumber: "",
    packageComplete: "",
    missElement: "",
    description: "",
    serialNumber: "",
    price: "",
    cashback: "",
    firstPay: "",
    products: [],
    agreement: false,
    allegroBtn: "",
  });

  const [badValidate, setBadValidate] = useState({
    worker: "",
    placeBuy: "",
    docNumber: "",
    reason: "",
    anotherReason: "",
    status: "",
    name: "",
    email: "",
    phone: "",
    accountNumber: "",
    packageComplete: "",
    missElement: "",
    description: "",
    serialNumber: "",
    price: "",
    cashback: "",
    firstPay: "",
    products: [],
    agreement: false,
    allegroBtn: "",
  });

  const [showForm, setShowForm] = useState(true);

  const [showSpinner, setShowSpinner] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [showError, setShowError] = useState(false);

  const [taskNumber, setTaskNumber] = useState("");

  const [showButtonsError, setShowButtonsError] = useState(false);

  const [switchValidation, setSwitchValidation] = useState(false);

  useEffect(() => {
    addProductForm();
  }, []);

  const validateForm = () => {
    setSwitchValidation(true);

    const validate = {
      worker: "",
      placeBuy: "",
      docNumber: "",
      reason: "",
      anotherReason: "",
      status: "",
      name: "",
      email: "",
      phone: "",
      accountNumber: "",
      packageComplete: "",
      missElement: "",
      description: "",
      serialNumber: "",
      price: "",
      cashback: "",
      firstPay: "",
      productsInfo: "",
      products: [],
      agreement: false,
    };

    if (state.worker === "") validate.worker = true;

    if (state.placeBuy === "") validate.placeBuy = true;

    if(state.placeBuy === "Allegro (handto / SMA-Dimplex)" && state.allegroBtn === ""){
      validate.allegroBtn = true;
    } else {
      validate.allegroBtn = ""
    }

    if (state.docNumber === "") validate.docNumber = true;

    if (state.products.length === 0) {
      setShowButtonsError(true);
      validate.productsInfo = true;
    }

    state.products.forEach((product, index) => {
      const localValidateObj = {
        id: index,
        producer: false,
        typeProduct: false,
        quantity: 1,
      };
      if (product.producer === "") localValidateObj.producer = true;
      if (product.typeProduct === "") localValidateObj.typeProduct = true;
      if (product.quantity === "") localValidateObj.quantity = true;
      validate.products.push(localValidateObj);
    });

    if (state.reason === "") validate.reason = true;

    if (state.status === "") validate.status = true;

    if (
      state.status ===
      "Produkt przekazany do weryfikacji do Działu Obsługi Zwrotów i Reklamacji"
    ) {
      if (state.name === "") validate.name = true;

      if (state.email === "") validate.email = true;

      const regExEmail =
        /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
      if (!regExEmail.test(state.email)) validate.email = true;

      if (state.phone === "") validate.phone = true;

      const regExPhoneNumber = /^[0-9\+]{8,13}$/;
      if (!regExPhoneNumber.test(state.phone)) validate.phone = true;

      if (state.accountNumber === "") validate.accountNumber = true;

      const regExAccountNumber = /^[0-9]{26}$/;
      if (!regExAccountNumber.test(state.accountNumber))
        validate.accountNumber = true;

      if (state.packageComplete === "") validate.packageComplete = true;

      if (state.packageComplete === "Nie kompletny") {
        if (state.missElement === "") validate.missElement = true;
      }

      if (state.description === "") validate.description = true;

      if (state.serialNumber === "") validate.serialNumber = true;
    }

    if (state.status === "Zwrot zaakceptowany") {
      if (state.price === "") validate.price = true;

      if (state.cashback === "") validate.cashback = true;

      if (state.cashback === "Przelew bankowy") {
        if (state.firstPay === "") validate.firstPay = true;

        if (state.firstPay === "Inna") {
          if (state.name === "") validate.name = true;

          if (state.accountNumber === "") validate.accountNumber = true;

          const regExAccountNumber = /^[0-9]{26}$/;
          if (!regExAccountNumber.test(state.accountNumber))
            validate.accountNumber = true;
        }
      }
    }

    if (state.agreement === false) validate.agreement = true;
    setBadValidate({ ...badValidate, ...validate });
    if (
      !validate.worker &&
      !validate.placeBuy &&
      !validate.docNumber &&
      !validate.reason &&
      !validate.status &&
      !validate.agreement
    ) {
      const productObjValidated = state.products.map((prod) => {
        if (prod.producer && prod.typeProduct && prod.quantity) {
          return "okValue";
        } else return "badValue";
      });
      if (productObjValidated.includes("badValue")) {
        return;
      } else {
        if (
          state.status ===
          "Produkt przekazany do weryfikacji do Działu Obsługi Zwrotów i Reklamacji"
        ) {
          if (
            !validate.name &&
            !validate.email &&
            !validate.phone &&
            !validate.accountNumber &&
            !validate.packageComplete
          ) {
            if (state.packageComplete === "Nie kompletny") {
              if (state.missElement) {
                sendForm(state);
              }
            } else if (state.packageComplete === "Kompletny") {
              sendForm(state);
            }
          }
        } else if (state.status === "Zwrot zaakceptowany") {
          if (!validate.price && !validate.cashback) {
            if (state.cashback === "Przelew bankowy") {
              if (state.firstPay === "Przelew bankowy") {
                sendForm(state);
              } else if (state.firstPay === "Inna") {
                if (!validate.price && !validate.cashback) {
                  sendForm(state);
                }
              }
            } else {
              sendForm(state);
            }
          }
        }
      }
    } else {
      console.log("walidacja niepoprawna");
    }
  };

  const placeBuy = [
    "Sklep internetowy (www.emultimax.pl)",
    "Allegro (handto / SMA-Dimplex)",
    "Salon Sprzedaży Warszawa",
    "Salon Sprzedaży Kraków",
    "Salon Sprzedaży Rzeszów",
    "Salon Sprzedaży Zamość",
    "Punkt Sprzedaży Gdańsk",
    "Punkt Sprzedaży Poznań",
    "Telefonicznie"
  ];

  const statusOptions = [
    "Produkt przekazany do weryfikacji do Działu Obsługi Zwrotów i Reklamacji",
    "Zwrot zaakceptowany",
  ];

  const allegroOptions = [
    `klient kliknął w Allegro "Zwróć towar"`,
    `klient obiecał, że po powrocie do domu kliknie w Allegro "Zwróć towar"`,
    `klient zdecydowanie odmówił kliknięcia w Allegro "Zwróć towar"`,
  ];

  const packageCompleteOptions = ["Kompletny", "Nie kompletny"];

  const cashbackOptions = ["Gotówka", "Przelew bankowy"];

  const firstPayOptions = ["Przelew bankowy", "Inna"];

  const reason = [
    "Produkt nie spełnia moich oczekiwań",
    "Produkt niezgodny z zamówieniem",
    "Produkt niezgodny z opisem na stronie",
    "Inny powód",
    "Nie chcę podawać przyczyny",
  ];

  const producer = [
    "Blaupunkt", 
    "Climative", 
    "Danfoss", 
    "Devi", 
    "Digitime", 
    "Dimplex", 
    "Ebeco", 
    "Eberle", 
    "Emko", 
    "Esco", 
    "Nexans", 
    "Rotenso", 
    "Sonniger", 
    "Thermoval", 
    "Vaco", 
    "Warmtec",
    "Inny",
  ];

  const handleCheckbox = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
    setBadValidate({ ...badValidate, [e.target.name]: false });
  };

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setBadValidate({ ...badValidate, [e.target.name]: false });
  };

  const handleProducerInput = (e, id) => {
    const arr = state.products.filter((product) => product.id === id)[0];
    arr[e.target.name] = e.target.value;
    const newProductArr = [...state.products];
    newProductArr[id] = arr;
    setState({ ...state, products: [...newProductArr] });
    setBadValidate({ ...badValidate, products: [...newProductArr] });
  };

  const addProductForm = () => {
    const newProduct = {
      id: state.products.length,
      producer: "",
      typeProduct: "",
      quantity: 1,
    };
    setState({
      ...state,
      products: [...state.products, newProduct],
    });
    setShowButtonsError(false);
  };

  const removeProductForm = () => {
    const oldProductList = state.products;
    oldProductList.pop();
    setState({
      ...state,
      products: [...oldProductList],
    });
  };

  const showProducts = state.products.map((showProduct, index) => {
    return (
      <div key={index} className="return-form__product-box">
        <Select
          value={showProduct.producer}
          name={"producer"}
          id={`producer${index}`}
          labelName="Producent"
          optionsValue={producer}
          handleInput={(e) => {
            handleProducerInput(e, showProduct.id);
          }}
          validation={
            switchValidation && showProduct.producer == "" ? true : false
          }
          errorMsg={"Podaj nazwę producenta"}
        />
        <Input
          value={showProduct.typeProduct}
          name={"typeProduct"}
          id={`typeProduct${index}`}
          labelName="Nazwa produktu"
          handleInput={(e) => {
            handleProducerInput(e, showProduct.id);
          }}
          type={"text"}
          validation={
            switchValidation && showProduct.typeProduct == "" ? true : false
          }
          errorMsg={"Podaj nazwę produktu"}
        />

        <Input
          value={showProduct.quantity}
          name={"quantity"}
          id={`quantity${index}`}
          labelName="Ilość sztuk"
          handleInput={(e) => {
            handleProducerInput(e, showProduct.id);
          }}
          type={"number"}
          minValue={1}
          validation={
            switchValidation && showProduct.quantity == "" ? true : false
          }
          errorMsg={"Podaj ilość"}
        />
      </div>
    );
  });

  const sendForm = (obj) => {
    const products = obj.products.map((product, index) => {
      return `
      <h5>Produkt ${index + 1}</h5>
      <b>Producent:</b> ${product.producer} <br/>
      <b>Nazwa produktu:</b> ${product.typeProduct} <br/>
      <b>Ilość:</b> ${product.quantity} <br/>
      <br/>
        `;
    });

    setShowForm(false);
    setShowSpinner(true);

    if (!obj.email) obj.email = "klient@wp.pl";

    const url = "https://newaccount1632792215290.freshdesk.com/api/v2/tickets";
    const body = {
      subject: "Formularz zwrotu (stacjonarny)",
      description: `
      <h4>Formularz zwrotu (stacjonarny):</h4>
      <b>Osoba przyjmująca zwrot:</b> ${obj.worker} <br/>
      <b>Miejsce zakupu:</b> ${obj.placeBuy} <br/>
      ${
        obj.placeBuy === "Allegro (handto / SMA-Dimplex)"
          ? `<b>CZy klient kliknął w Allegro "Zwróć towar":</b> ${obj.allegroBtn} <br/>`
          : ""
      }
      <b>Numer zamówienia lub numer faktury:</b> ${obj.docNumber} <br/>
      <br/>
      ${products}
      <b>Powód odstąpienia:</b> ${obj.reason} <br/>
      <br/>
      ${
        obj.anotherReason
          ? `<b>Dlaczego odstępuję:</b> ${obj.anotherReason} <br/>`
          : ""
      }
      <b>Status:</b> ${obj.status} <br/>
      ${
        obj.status ===
        "Produkt przekazany do weryfikacji do Działu Obsługi Zwrotów i Reklamacji"
          ? `
          <br/>
          <b>Imię i nazwisko lub nazwa firmy:</b> ${obj.name} <br/>
          <b>Adres e-mail:</b> ${obj.email} <br/>
          <b>Telefon:</b> ${obj.phone} <br/>
          <b>Numer rachunku bankowego:</b> ${obj.accountNumber} <br/>
          <br/>
          <b>Skład zestawu:</b> ${obj.packageComplete} <br/>
            ${
              obj.packageComplete === "Nie kompletny"
                ? `<b>Brakujące elementy zestawu:</b> ${obj.missElement} <br/>`
                : ""
            }
          <b>Opis stanu urządzenia:</b> ${obj.description} <br/>
          <b>Numer seryjny / fabryczny:</b> ${obj.serialNumber} <br/>
          `
          : ""
      }
      ${
        obj.status === "Zwrot zaakceptowany"
          ? `
          <b>Kwota zwrotu:</b> ${obj.price} <br/>
          <b>Forma zwrotu należności:</b> ${obj.cashback} <br/>
            ${
              obj.cashback === "Przelew bankowy"
                ? `<b>Wcześniejsza forma płatności:</b> ${obj.firstPay} <br/>`
                : ""
            }
            ${
              obj.firstPay === "Inna"
                ? `
                <b>Imię i nazwisko lub nazwa firmy:</b> ${obj.name} <br/>
                <b>Numer rachunku bankowego:</b> ${obj.accountNumber} <br/>
                `
                : ""
            }
          `
          : ""
      }

      <br/>

      `,
      email: obj.email,
      phone: obj.phone,
      priority: 1,
      status: 2,
    };

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "VHE3djNOUEFwUWFSNXhscG80Zg==",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then(function (data) {
        if (data.id) {
          setShowSpinner(false);
          setShowSuccess(true);
          setTaskNumber(data.id);
        } else {
          setShowSpinner(false);
          setShowError(true);
        }
      })
      .catch(function (error) {
        setShowSpinner(false);
        setShowError(true);
        console.log(error);
      });
  };

  return (
    <div className="return">
      {showForm ? (
        <div id="return-form" className="return-form">
          <h2 className="return-form__title">Formularz zwrotu (stacjonarny)</h2>

          <Input
            value={state.worker}
            name={"worker"}
            labelName="Osoba przyjmująca zwrot"
            handleInput={handleInput}
            type={"text"}
            validation={badValidate.worker}
            errorMsg={"Podaj dane osoby przyjmującej zwrot"}
          />

          <Select
            value={state.placeBuy}
            name={"placeBuy"}
            labelName="Miejsce zakupu"
            optionsValue={placeBuy}
            handleInput={handleInput}
            validation={badValidate.placeBuy}
            errorMsg={"Wybierz miejsca zakupu"}
          />

          {state.placeBuy === `Allegro (handto / SMA-Dimplex)` ? (
            <>
              <div className="return-form__info-warning">
                Informacja dla klienta: Jeżeli dokonał/a Pani/Pan zakupu za pośrednictwem serwisu Allegro proszę zalogować się do swojego konta i w zakładce "Moje Zakupy" &gt; SZCZEGÓŁY ZAKUPU kliknąć "Zwróć towar"
              </div>
              <InputRadio
                value={state.allegroBtn}
                name={"allegroBtn"}
                labelName={`Czy klient klinkął w Allegro "Zwróć towar"?`}
                handleInput={handleInput}
                validation={badValidate.allegroBtn}
                options={allegroOptions}
                errorMsg={`Zaznacz czy klient klinkął "Zwróć towar"`}
              />
            </>
          ) : null}

          <Input
            value={state.docNumber}
            name={"docNumber"}
            labelName="Numer zamówienia lub numer faktury"
            handleInput={handleInput}
            type={"text"}
            validation={badValidate.docNumber}
            errorMsg={"Podaj numer zamówienia lub faktury"}
          />

          {showProducts}
          <AddRemoveButtons
            addProductForm={addProductForm}
            removeProductForm={removeProductForm}
            validation={showButtonsError}
            productlist={state.products.length}
          />

          <Select
            value={state.reason}
            name={"reason"}
            labelName="Powód odstąpienia"
            optionsValue={reason}
            handleInput={handleInput}
            validation={badValidate.reason}
            errorMsg={"Wybierz powód odstąpienia"}
          />

          {state.reason === "Inny powód" ? (
            <Input
              value={state.anotherReason}
              name={"anotherReason"}
              labelName="Podaj powód"
              handleInput={handleInput}
              type={"text"}
              validation={false}
              errorMsg={""}
            />
          ) : null}

          <InputRadio
            value={state.status}
            name={"status"}
            labelName="Status zwrotu"
            handleInput={handleInput}
            validation={badValidate.status}
            options={statusOptions}
            errorMsg={"Wybierz status"}
          />

          {state.status ===
          "Produkt przekazany do weryfikacji do Działu Obsługi Zwrotów i Reklamacji" ? (
            <>
              <Input
                value={state.name}
                name={"name"}
                labelName="Imię i nazwisko lub nazwa firmy"
                handleInput={handleInput}
                type={"text"}
                validation={badValidate.name}
                errorMsg={"Podaj dane zwracającego lub nazwę firmy"}
              />

              <Input
                value={state.email}
                name={"email"}
                labelName="Adres e-mail"
                handleInput={handleInput}
                type={"text"}
                validation={badValidate.email}
                errorMsg={"Podaj adres email"}
              />

              <Input
                value={state.phone}
                name={"phone"}
                labelName="Telefon"
                handleInput={handleInput}
                type={"number"}
                validation={badValidate.phone}
                errorMsg={"Podaj telefon kontaktowy"}
              />

              <Input
                value={state.accountNumber}
                name={"accountNumber"}
                labelName="Numer rachunku bankowego"
                handleInput={handleInput}
                type={"number"}
                validation={badValidate.accountNumber}
                errorMsg={"Podaj numer bankowy"}
              />

              <InputRadio
                value={state.packageComplete}
                name={"packageComplete"}
                labelName="Skład zestawu"
                handleInput={handleInput}
                validation={badValidate.packageComplete}
                options={packageCompleteOptions}
                errorMsg={"Wybierz skład zestawu"}
              />
              {state.packageComplete === "Nie kompletny" ? (
                <Input
                  value={state.missElement}
                  name={"missElement"}
                  labelName="Brakujące elementy zestawu"
                  handleInput={handleInput}
                  type={"text"}
                  validation={badValidate.missElement}
                  errorMsg={"Podaj brakujące elementy"}
                />
              ) : null}

              <TextArea
                value={state.description}
                name={"description"}
                labelName="Opis stanu urządzenia"
                handleInput={handleInput}
                validation={badValidate.description}
                errorMsg={"Podaj opis stanu urządzenia"}
              />

              <Input
                value={state.serialNumber}
                name={"serialNumber"}
                labelName="Numer seryjny / fabryczny"
                handleInput={handleInput}
                type={"text"}
                validation={badValidate.serialNumber}
                errorMsg={"Podaj numer seryjny / fabryczny"}
              />
            </>
          ) : null}

          {state.status === "Zwrot zaakceptowany" ? (
            <>
              <Input
                value={state.price}
                name={"price"}
                labelName="Kwota zwrotu"
                handleInput={handleInput}
                type={"number"}
                validation={badValidate.price}
                errorMsg={"Podaj kwotę zwrotu"}
              />

              <InputRadio
                value={state.cashback}
                name={"cashback"}
                labelName="Forma zwrotu należności"
                handleInput={handleInput}
                validation={badValidate.cashback}
                options={cashbackOptions}
                errorMsg={"Podaj formę zwrotu"}
              />

              {state.cashback === "Przelew bankowy" ? (
                <>
                  <InputRadio
                    value={state.firstPay}
                    name={"firstPay"}
                    labelName="Wcześniejsza metoda płatności"
                    handleInput={handleInput}
                    validation={badValidate.firstPay}
                    options={firstPayOptions}
                    errorMsg={"Podaj wcześniejszą metodę płatności"}
                  />

                  {state.firstPay === "Przelew bankowy" ? (
                    <div className="return-form__info-warning">
                      Zwrot pieniędzy zostanie przelany na konto z którego
                      dokonano wpaty za towar
                    </div>
                  ) : null}

                  {state.firstPay === "Inna" ? (
                    <>
                      <Input
                        value={state.name}
                        name={"name"}
                        labelName="Imię i nazwisko lub nazwa firmy"
                        handleInput={handleInput}
                        type={"text"}
                        validation={badValidate.name}
                        errorMsg={"Podaj dane zwracającego lub nazwę firmy"}
                      />

                      <Input
                        value={state.accountNumber}
                        name={"accountNumber"}
                        labelName="Numer rachunku bankowego"
                        handleInput={handleInput}
                        type={"number"}
                        validation={badValidate.accountNumber}
                        errorMsg={"Podaj numer bankowy"}
                      />
                    </>
                  ) : null}
                </>
              ) : null}
            </>
          ) : null}

          <Agreement
            value={state.agreement}
            name={"agreement"}
            handleCheckbox={handleCheckbox}
            validation={badValidate.agreement}
          />
          <div className="return-form__btn-wrapper">
            <button
              className="return-form__btn"
              onClick={(e) => {
                validateForm(e);
              }}
            >
              Wyślij formularz
            </button>
          </div>
          <FormFooter />
        </div>
      ) : null}
      {showSpinner ? (
        <div id="return-spinner" className="return-spinner">
          <div className="return-spinner__container">
            <div className="return-spinner__wrapper">
              <div className="return-spinner-circle1 return-spinner-circle"></div>
              <div className="return-spinner-circle2 return-spinner-circle"></div>
              <div className="return-spinner-circle3 return-spinner-circle"></div>
              <div className="return-spinner-circle4 return-spinner-circle"></div>
              <div className="return-spinner-circle5 return-spinner-circle"></div>
              <div className="return-spinner-circle6 return-spinner-circle"></div>
              <div className="return-spinner-circle7 return-spinner-circle"></div>
              <div className="return-spinner-circle8 return-spinner-circle"></div>
              <div className="return-spinner-circle9 return-spinner-circle"></div>
              <div className="return-spinner-circle10 return-spinner-circle"></div>
              <div className="return-spinner-circle11 return-spinner-circle"></div>
              <div className="return-spinner-circle12 return-spinner-circle"></div>
            </div>
          </div>
        </div>
      ) : null}
      {showSuccess ? (
        <div id="return-message" className="return-message">
          <div className="return-message__container">
            <h2 className="return-message__success">
              Formularz został wysłany poprawnie
            </h2>
            <h3 className="return-message__id">
              Numer Twojego zgłoszenia:
              <strong>{taskNumber}</strong>
            </h3>
            <p className="return-message__remember">
              * Pamiętaj, aby spakować wszystkie elementy zestawu oraz oznaczyć
              paczkę numerem zgłoszenia.
            </p>
          </div>
        </div>
      ) : null}
      {showError ? (
        <div id="return-error" className="return-message return-error">
          <div className="return-message__container">
            <h2 className="return-message__error">
              Podczas wysyłania formularza wystąpił błąd. Spróbuj później.
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
