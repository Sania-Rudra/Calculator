class Calculator{
    constructor(prevOperTextElm, currOperTextElm){
        this.prevOperTextElm=prevOperTextElm;
        this.currOperTextElm=currOperTextElm;
        this.clear()
    }
    clear(){
        this.currOperand=''
        this.prevOperand=''
        this.oprtn=undefined
    }
    delete(){
        this.currOperand=this.currOperand.toString().slice(0,-1)
    }
    append(num){
        if(num=='.'&&this.currOperand.includes('.'))return
        this.currOperand=this.currOperand.toString()+ num.toString()
    }
    chooseOperation(oprtn){
        if(this.currOperand=='')return
        if(this.prevOperand!=''){
            this.compute()
        }
        this.oprtn = oprtn
        this.prevOperand = this.currOperand
        this.currOperand = ''

    }
    compute(){
        let computation
        const prev=parseFloat(this.prevOperand)
        const curr=parseFloat(this.currOperand)
        if(isNaN(prev)||isNaN(curr))return
        switch(this.oprtn){
            case '+':
            computation=prev+curr
            break;
            case '-':
            computation=prev-curr
            break;
            case '*':
            computation=prev*curr
            break;
            case '÷':
            computation=prev/curr
            break;
            default:
                return

        }
        this.currOperand=computation
        this.oprtn=undefined
        this.prevOperand=''
    }
    getDisplayNum(num){
        const floatNum=parseFloat(num)
        if(isNaN(floatNum))return ''
        return num.toLocaleString('en')
    }
    update(){
        this.currOperTextElm.innerText=this.currOperand
        if(this.oprtn!=null){
            this.prevOperTextElm.innerText = `${this.getDisplayNum(this.prevOperand)} ${this.oprtn}`

        }
        else {
            this.prevOperTextElm.innerText = ''
        }
    }
}

const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')
const equalButton=document.querySelector('[data-equals]')
const deleteButton=document.querySelector('[data-delete]')
const allClearButton=document.querySelector('[data-all-clear]')
const prevOperTextElm=document.querySelector('[data-prev-operand]')
const currOperTextElm=document.querySelector('[data-curr-operand]')
const calculator=new Calculator(prevOperTextElm,  currOperTextElm)

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.append(button.innerText)
        calculator.update()
    })
})


operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.update()
    })
})
equalButton.addEventListener('click',button=>{
    calculator.compute()
    calculator.update()
})
allClearButton.addEventListener('click',button=>{
    calculator.clear()
    calculator.update()
})
deleteButton.addEventListener('click',button=>{
    calculator.delete()
    calculator.update()
})
