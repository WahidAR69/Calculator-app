let items = document.querySelectorAll(".items");
let operationDisplay = document.querySelector("#save-operation");
let output = document.querySelector("#calculation-output");



/**
 * Created an Object to access all the buttons with the class items.
 * This will also change the value of item para to the id from the items class.
*/
let itemObject = {};
items.forEach(item => {
	itemObject[item.id] = item;
});


/**
 * Below I have created 4 variables each of them hold a different task, I will be using them afterwards.
 * 
 * @numbers numbers The variable numbers is used to add event listener all of the number part
 * of the calculator and actually the number array is the name of the id numbers
 * for all of the numbers and the point in the items class elements.
 * @operators this array is used to access all of the operations from the items class. 
 * @keyboardKeys this object is used to convert all of the numbers and operations that I
 * click on my keyboard to the id name of the that number or operator. 
 * @saveOperate this object is used to convert the id name of the items class element to the keyboard 
 * value of it. I then will use it to show the output.
 * 
 */
let numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'point'];
let operators = ['clear-entry', 'clear-all', 'clear-last-number', 'divide', 'multiply', 'add', 'subtract', 'equal', 'change-sign'];
let keyboardKeys = {
	'1': 'one',
	'2': 'two',
	'3': 'three',
	'4': 'four',
	'5': 'five',
	'6': 'six',
	'7': 'seven',
	'8': 'eight',
	'9': 'nine',
	'0': 'zero',
	'point': 'point',
	'/': 'divide',
	'-': 'subtract',
	'+': 'add',
	'*': 'multiply',
	'.': 'point',
	'Backspace': 'clear-last-number',
	'Delete': 'clear-all',
	'Enter': 'equal'
};
let saveOperate = {
	'divide': '/',
	'multiply': '*',
	'add': '+',
	'subtract': '-',
	'equal': '='
}


/**
*  Opeartions objects is storing functions of all the operations
*  that we could do in our calculator.
*/
let operations = {
	add: (a, b) => a + b,
	divide: (a, b) => b === 0 ? 'Error: Division by zero' : a / b,
	subtract: (a, b) => a - b,
	multiply: (a, b) => a * b
};

/**
 * This function is used to add comma after each three digit in our output. 
 * it will add comma until we reach to the decimal point, and it will not 
 * continue to add commas after the decimal point. 
 * @param {*} value is used to check which value it should add a comma, the first or the second.
 * 
 */
let addComma = (value) => {
    var parts = value.split(".");
    var str = parts[0].replace(/\,/g, '');
    var reversedStr = str.split('').reverse().join('');
    var formattedStr = '';
    for (var i = 0; i < reversedStr.length; i++) {
        if (i > 0 && i % 3 === 0) {
            formattedStr += ',';
        }
        formattedStr += reversedStr[i];
    }
    parts[0] = formattedStr.split('').reverse().join('');
    output.innerText = parts.join(".");
}

/**
 * The Event listener below is used to add functionality to the 
 * keyboard keys, in here we have used the keyboard keys object to
 * change the value of the key to the id of the items class and then
 * I click that item. which will then it will activate the click event listener on itemObject[number]
 * that will be defined afterwards.
 */
window.addEventListener('keydown', function(event) {
	let key = keyboardKeys[event.key];
	if (key) {
		let button = itemObject[key];
		if (button) {
			button.click();
		}
	}
});


/**
 * This 5 variables stores different values.
 * @a this is used for the first value of the operation
 * @b this is used for the second value of the operation
 * that will be activated after clicking an operator.
 * @operation this will then check if an operation is clicked.
 * if not it the calculator will detect that the output is the value of 'a'.
 * also it is used to reset the values after an operation is done. and it 
 * will make the calculator ready for the next operation.
 * @point it will be used to add only one decimal point to our calculator 
 * at a time. no matter how much time we click the decimal point.  
 * @firstTimeClick this is used to update the value of 'b' to the value clicked
 * when we first click on a number. without this we have to click backspace one time
 * before updating the value. 
 * @calculationDone will check if we are done with a calculation or not. if we have
 * already clicked on equal then it will be true. and also it would make us able to 
 * do several calculations. 
 */
let a = "";
let b = "";
let operation = null;
let point = false;
let firstTimeClick = true;
let calculationDone = false;


/**
 * In here I am accessing all of the numbers array items, and it will add
 * click event listener to them. and this will make me able to save much lines of code.
 * and it will also store the values of the 'a' variable and the 'b' variable in it. which 
 * we will be using then to do different tasks. here if opeartion variable is true, it knows 
 * the value that is being clicked, it is the second value, else it will be the first value.
 * it will also allows us to write 16 characters in out output, the reason I have include < 20,
 * is because of the commas that I will add between them. each time we click a button it will add 
 * the value beside the pervious value, the reason for this is because the values are not converted
 * to integers yet, they are strings. 
 */
numbers.forEach(number => {
	itemObject[number].addEventListener('click', function() {
		if (operation) {
			if (firstTimeClick) {
				b = this.innerText;
				output.innerText = b || 0;
				firstTimeClick = false;
			} else if (output.innerText.length < 20) {
				if(itemObject[number].innerText === '.') {
					if (!point) {
						point = true;
						b += this.innerText;
						addComma(b);
					}
				} else {
					point = false;
					b += this.innerText;
					addComma(b);
				}
			}	
		} else {
			if (output.innerText.length < 20) {
				if(itemObject[number].innerText === '.') {
					if (!point) {
						point = true;
						a += this.innerText;
						addComma(a);
					}
				} else {
					if (output.innerText === '0') {
						a = this.innerText;
						output.innerText = a;
					} else {
							point = false;
							a += this.innerText;
							addComma(a);
					}
				}				
			}
		}
	});
});


/**
 * This is the most important part of our code. Just like we were accessing numbers using the numbers 
 * array we are accessing the operators using the operators array, and we itterate through each element 
 * of that array and I will add a click event listener to it. I have used a switch because having several cases. 
 * and for each case, I have added the functionality, and I have taken everything into account to make it functional 
 * like a real calculator. 
 */
operators.forEach(operate => {
	calculationDone = false;
	itemObject[operate].addEventListener('click', function() {
		switch(operate) {
			case 'divide':
			case 'multiply':
			case 'subtract':
			case 'add':
				// The below is checking if we have added any number before clicking an operation.
				if (a) {
					operation = operations[operate];
					operationDisplay.innerText = `${a} ${saveOperate[operate]}`;
				} else {
					output.innerText = 'Please Enter a Number'
				}
				break;
			case 'equal':
				//here will give us the output of the operation. and update the values
				// also make them ready for the other operation.
				if (a && b && operation) {
					output.innerText = operation(parseFloat(a), parseFloat(b));
					operationDisplay.innerText += ` ${b} ${saveOperate[operate]}`
					a = output.innerText;
					b = "";
					operation = null;
					calculationDone = true;
				}
				break;
			//This will only clear the last entry that was added in our output.
			// if the entry is the value of 'b', it will clear it but still 
			// will store 'a' in the calculator. 
			case 'clear-entry':
				if (operation) {
					b = "";
				} else {
					a = "";
				}
				output.innerText = 0;
				point = false;
				break;
			//this will clear everything.
			case 'clear-all':
				operationDisplay.innerText = "";
				a = "";
				b = "";
				operation = null;
				output.innerText = 0;
				point = false;
				break;

			
			// This is the most complicated part, and that is because I had to do a lot in it.
			case 'clear-last-number':
				//if the calculation is done, then it will empty the operation display part.
				if (calculationDone) {
					operationDisplay.innerText = "";
					break
				// if there is division by zero error, it will make the output as zero instantly.
				} else if(output.innerText === 'Error: Division by zero') {
					a = "";
					b = "";
					operation = null;
					output.innerText = 0;
				// if there is only one digit in calculating, it will make it zero instead of nothing.
				} else if (output.innerText.length === 1) {
					output.innerText = 0;
				} else {
					// if there is not decimal point in our output. it will 
					// remove the last digit and add comma to our output.
					if (!output.innerText.includes(".")) {
						point = false;
						if (operation) {
							b = b.slice(0, -1);
							addComma(b);
						} else {
							a = a.slice(0, -1);
							addComma(a);
						}
					} else {
						// if there is a decimal point in our output, it will check if 
						// it is the first character after decimal point, if the condition is true,
						// then it will remove the decimal point along the number. 
						var str = operation ? b : a;
						if (str.includes(".")) {
							var parts = str.split(".");
							if (parts[1].length === 1) {
								str = parts[0]; // remove the decimal point and the digit after it
							} else {
								str = str.slice(0, -1); // remove the last digit
							}
						} else {
							str = str.slice(0, -1); // remove the last digit
						}
						output.innerText = str || 0;
						if (operation) {
							b = str;
							addComma(b);
						} else {
							a = str;
							addComma(a);
						}
					}								
				}
				break;
			// The below is used to change the sign of our output number. 
			// if it is positive, it will make it negative and vice versa. 
			case 'change-sign':
				if (output.innerText === '0') {
					if (operation) {
						b = 0;
						output.innerText = b;
					} else {
						a = 0;
						output.innerText = a;
					} 
				}
				if (operation) {
					b = (parseFloat(b) * -1).toString();
					output.innerText = b;
				} else {
					a = (parseFloat(a) * -1).toString();
					output.innerText = a;
				} 
				break;
		}
	});
});
