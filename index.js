let btns = document.getElementsByClassName('btn')
let scr1 = document.getElementById('scr1')
let scr2 = document.getElementById('scr2')
let calculationStr = '', renderStr = ''

const removeLastOperation = (s) => {
    let arr = s.split(' ')
    let newArr = arr.slice(0, arr.length - 1)
    return newArr.join('')
}
const removeLastChar = (s) => {
    return (s == null || s.length == 0)
        ? null
        : (s.substring(0, s.length - 1));
}
const render = (text, elem) => {
    elem.innerText = text
}
const renderCalculationStr = () => render(renderStr, scr1)
const renderCalculatedStr = (text = '') => render(text, scr2)


const doOperation = (operation) => {
    if (calculationStr.length != 0 || !calculationStr.slice(-1).match(/[0-9]/)) return
    switch (operation) {
        case 'plus':
            renderStr += ' + '
            calculationStr += ' + '
            break
        case 'minus':
            renderStr += '-'
            calculationStr += ' - '
            break
        case 'multiply':
            renderStr += '×'
            calculationStr += ' * '
            break
        case 'divide':
            renderStr += ' ÷ '
            calculationStr += ' / '
            break
        case 'percent':
            calculate()
            renderStr += '%'
            calculationStr += ' /100'
            calculate()
            break
    }
    renderCalculationStr()
}

const handleNumKeyClick = (num) => {
    renderStr += num
    calculationStr += num
    renderCalculationStr()
}

const clear = () => {
    renderStr = removeLastChar(renderStr)
    calculationStr = removeLastOperation(calculationStr)
    renderCalculationStr()
    renderCalculatedStr()
}

const AllClear = () => {
    renderStr = ''
    calculationStr = ''
    renderCalculationStr()
    renderCalculatedStr()
}

const calculate = () => {
    let calculation = eval(calculationStr)
    renderCalculatedStr(calculation)
}


const handleClick = (evt) => {
    let classlistArr = [...evt.target.classList]
    let data = evt.target.dataset
    if (classlistArr.includes('operation')) {
        doOperation(data.operation)
    } else if (classlistArr.includes('num')) {
        handleNumKeyClick(data.num)
    } else if (classlistArr.includes('clear')) {
        clear()
    } else if (classlistArr.includes('AllClear')) {
        AllClear()
    } else if (classlistArr.includes('equal')) {
        calculate()
    }
    console.log(calculationStr, renderStr)
}

for (let btn of btns) {
    btn.addEventListener('click', handleClick)
}
