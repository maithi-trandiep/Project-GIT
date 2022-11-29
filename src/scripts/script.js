const switchModeBtn = document.querySelector("#switch-mode-btn");
const keys = document.querySelectorAll(".keys input");
const resultInput = document.querySelector("#result-input");
const refreshBtn = document.querySelector("#btn-refresh");
const calculatorIcon = document.querySelector("#calculator-icon");
const calculatorBody = document.querySelector("#calculator");
const backgroundWindow = document.querySelector(".window");
const closeWindowButton = document.querySelector(".fa-xmark");
const reduceWindowButton = document.querySelector(".fa-minus");
const reduceFullScreenButton = document.querySelector(".fa-square");
const leftMenuBtns = document.querySelector('#left-menu-btns');
const paramsIcon = document.querySelector("#params-icon");
const paramsBody = document.querySelector("#params");
const calculatorIconSmall = document.querySelector("#calculator-icon-small");
const paramsIconSmall = document.querySelector("#params-icon-small");


const operationsKeys = ["+", '-', "/", '*', "="];
const numbersKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
let operationPartOne = 0;
let operationPartTwo = 0;
let output = 0;
let operator = undefined;
let nbOperators = 0;
let resultOfOperation = 0;
resultInput.value = 0;

// if page fully loaded
window.addEventListener('load', () => {

    //* at load, check the cookie variable to set the theme
    if(getCookie("theme")){
        const themeCookie = getCookie("theme");
        if (themeCookie[1] == undefined || themeCookie == "light") {
            setTheme("light"); //par défaut, c'est à light
        } else if (themeCookie[1] == "dark") {
            setTheme("dark");
        }
    }

    //* calculator code
    //*at click on element
    if (keys) {
        keys.forEach(key => {
            key.addEventListener('click', function () {
                const keyValue = key.value;

                if (numbersKeys.includes(keyValue)) {     //si chiffre 
                    if (output == 0) {
                        output = keyValue;
                        operationPartOne = keyValue;
                    } else {
                        if (nbOperators == 0) {               //si pas d'operateur, on continue de remplir
                            output += keyValue;
                            operationPartOne += keyValue;
                        } else {                               //le cas ou on a déjà un operateur
                            if (operationPartTwo == 0) {
                                const outputLength = output.length;
                                if (output.charAt(outputLength - 1) == 0) {
                                    operationPartTwo = keyValue;
                                    output[outputLength - 1] = keyValue;
                                } else {
                                    operationPartTwo += keyValue;
                                    output += keyValue;
                                }
                            } else {
                                operationPartTwo += keyValue;
                                output += keyValue;
                            }
                        }
                    }
                } else if (operationsKeys.includes(keyValue)) {
                    if (nbOperators == 0) {
                        if (keyValue != "=") {
                            operator = keyValue;
                            nbOperators++;
                            output += operator;
                        }
                    } else {
                        const outputLength = output.length;
                        if (!operationsKeys.includes(output[outputLength - 1])) {
                            switch (operator) {
                                case '+':
                                    resultOfOperation = parseFloat(operationPartOne) + parseFloat(operationPartTwo);
                                    break;
                                case '-':
                                    resultOfOperation = parseFloat(operationPartOne) - parseFloat(operationPartTwo);
                                    break;
                                case '/':
                                    resultOfOperation = parseFloat(operationPartOne) / parseFloat(operationPartTwo);
                                    break;
                                case '*':
                                    resultOfOperation = parseFloat(operationPartOne) * parseFloat(operationPartTwo);
                                    break;
                            }
                            operationPartOne = resultOfOperation;
                            operationPartTwo = 0;
                            if (keyValue == "=") {
                                output = operationPartOne;
                                nbOperators = 0;
                            } else {
                                operator = keyValue;
                                output = operationPartOne + keyValue;
                            }
                        }
                    }
                }
                resultInput.value = output;
            })
        })
    }

    //*at click on calculator, display modal
    calculatorIcon.addEventListener('click', function () {
        calculatorBody.style.display = "block";
        backgroundWindow.style.display = "block";
    });

    //* at click on params, display 
    paramsIcon.addEventListener('click', function () {
        paramsBody.style.display = "block";
        backgroundWindow.style.display = "block";
    });

    //* refresh button
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function () {
            operationPartOne = 0;
            operationPartTwo = 0;
            output = 0;
            operator = undefined;
            nbOperators = 0;
            resultOfOperation = 0;
            resultInput.value = 0;
        });
    }

    //* switch theme btn
    if (switchModeBtn) {
        let nbClickMode = 0;
        switchModeBtn.addEventListener('click', function () {
            if (nbClickMode % 2 == 0) {
                setTheme("dark");
            } else {
                setTheme("light");
            }
            nbClickMode++
        });
    }

    //* close window and app at clic on x
    if (closeWindowButton) {
        closeWindowButton.addEventListener('click', function () {

            backgroundWindow.style.display = "none";

            if (calculatorBody.style.display == "block") {
                if (confirm("êtes-vous sûre de vouloir fermer la fenêtre?")) {
                    calculatorIconSmall.style.display = "none";
                    calculatorBody.style.display = "none";
                }
            }

            if (paramsBody.style.display == "block") {
                paramsBody.style.display = "none";
                paramsIconSmall.style.display = "none";
            }
        });
    }

    //* reduce window and app at clic on -
    if (reduceWindowButton) {
        reduceWindowButton.addEventListener('click', function () {

            backgroundWindow.style.display = "none";

            if (calculatorBody.style.display == "block") {
                calculatorBody.style.display = "none";
                calculatorIconSmall.style.display = "block";
            }

            if (paramsBody.style.display == "block") {
                paramsBody.style.display = "none";
                paramsIconSmall.style.display = "block";
            }
        });
    }

    //* at click on small icon of calc, display
    calculatorIconSmall.addEventListener('click', function () {
        if (calculatorBody.style.display == "none") {
            backgroundWindow.style.display = "block";
            calculatorBody.style.display = "block";
        }
    })

    //* at click on small icon of calc, display
    paramsIconSmall.addEventListener('click', function () {
        if (paramsBody.style.display == "none") {
            backgroundWindow.style.display = "block";
            paramsBody.style.display = "block";
        }
    })

    //* function to create and set cookies
    function setCookie(cookiName, cookieValue, expireDate) {
        const d = new Date();
        d.setTime(d.getTime() + (expireDate * 24 * 60 * 60 * 1000));
        let expiresAt = "expires=" + d.toUTCString();
        document.cookie = cookiName + "=" + cookieValue + ";" + expiresAt + ";path=/";
    }

    //* function that returns a cookie and it value
    function getCookie(cookiName) {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim().split('=');
            if (cookiName == cookie[0]) {
                return cookie;
            }
        }
    }

    //* set the theme 
    function setTheme(theme) {
        if (theme == "dark") { //dark mode
            document.body.style.backgroundImage = "url('../src/assets/dark_mode.jpg')";
            switchModeBtn.style.filter = "invert(100%)";
            setCookie("theme", "dark", 30)
        } else if (theme == "light") {        //light mode
            document.body.style.backgroundImage = "url('../src/assets/light_background_3.jpg')";
            switchModeBtn.style.filter = "invert(0%)";
            setCookie("theme", "light", 30)
        }
    }
})































