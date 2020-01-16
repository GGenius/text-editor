function TextField (Field)
{
    let style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = '.cursor { user-select: none; }'
    document.querySelector('head').appendChild(style)

    Field.style.cssText += "\
    word-wrap: break-word;\
    -moz-hyphens: auto;\
    -webkit-hyphens: auto;\
    -ms-hyphens: auto;\
    "
    
    this.fontSize = window.getComputedStyle(Field).fontSize

    this.isKeyDown = false
    
    this.selection = window.getSelection()
    this.endOffset
    this.startOffset

    this.space_char = String.fromCharCode(160)
    this.tab_chars = this.space_char.repeat(4)
    this.enter_char = "\n"

    this.text = ''
    this.html = ''

    this.beforeText = ''
    this.afterText = ''

    this.rows = [""]
    this.currentRowInd = 0
    this.currentRow

    this.showCursor = true
    this.cursorPos = 0
    this.cursor = "<span class='cursor'>_</span>"
    this.emptyCursor = this.space_char.repeat(2)

    this.cursorIntervalFunc = () => {
        if (this.isKeyDown) return

        this.showCursor = !this.showCursor
        Field.innerText = this.text

        if (this.showCursor) Field.innerHTML = this.beforeText + this.cursor + this.afterText
        else Field.innerHTML = this.beforeText + this.emptyCursor + this.afterText
    }
    this.cursorInterval// = setInterval(this.cursorIntervalFunc, 500)
    window.onkeydown = (e) => {        
        let char = e.key
        let charCode = char.length === 1 ? char.charCodeAt(0) : 0
        let code = e.keyCode

        this.isKeyDown = true
        this.showCursor = false



        console.log(char, charCode, code)
        switch (char) {
            case "Backspace":
                if (!this.selection.rangeCount || (this.startOffset === this.endOffset))
                {
                    this.beforeText = this.beforeText.substr(0, this.beforeText.length - 1) 
                    this.text = this.beforeText + this.afterText
        
                    this.cursorPos -= 1
                }
                else
                {
                    this.text = this.text.substring(0, this.startOffset) + this.text.substring(this.endOffset, this.text.length)
                    
                    if (this.cursorPos > this.startOffset)
                    {
                        let length = this.endOffset - this.startOffset
                        
                        this.cursorPos -= length
                    }

                    this.beforeText = this.text.substr(0, this.cursorPos)
                    this.afterText = this.text.substr(this.cursorPos, this.text.length - this.cursorPos)

                    this.startOffset = this.endOffset
                }
                
                Field.innerHTML = this.beforeText + this.cursor + this.afterText
            break

            case "Delete":
                this.afterText = this.afterText.substr(1, this.afterText.length - 1) 
                this.text = this.beforeText + this.afterText
            break

            case " ":
                this.beforeText += this.space_char
                this.text = this.beforeText + this.afterText

                this.cursorPos += this.space_char.length
            break

            case "Enter":
                this.beforeText += this.enter_char
                this.text = this.beforeText + this.afterText

                this.cursorPos += 1
            break

            case "Tab":
                e.preventDefault()
                this.beforeText += this.tab_chars
                this.text = this.beforeText + this.afterText
                
                this.cursorPos += this.tab_chars.length
            break

            case "ArrowLeft":
                if (this.cursorPos > 0)
                this.cursorPos--

                this.beforeText = this.text.substr(0, this.cursorPos)
                this.afterText = this.text.substr(this.cursorPos, this.text.length - this.cursorPos)
            break

            case "ArrowRight":
                if (this.cursorPos < this.text.length)
                this.cursorPos++

                this.beforeText = this.text.substr(0, this.cursorPos)
                this.afterText = this.text.substr(this.cursorPos, this.text.length - this.cursorPos)
            break

            default:
                if (charCode)
                    {
                        this.beforeText += char
                        this.text = this.beforeText + this.afterText
                        
                        this.cursorPos += char.length
                    }
        }

        this.beforeText = this.text.substr(0, this.cursorPos)
        this.afterText = this.text.substr(this.cursorPos, this.text.length - this.cursorPos)

        Field.innerHTML = this.beforeText + this.cursor + this.afterText



        // console.log(this.rows)
    }

    window.onkeyup = e => {
        this.isKeyDown = false
    }

    Field.onmouseup = e => {
        let range = this.selection.getRangeAt(0)
        
        this.beforeText = this.text.substr(0, this.cursorPos)
        this.afterText = this.text.substr(this.cursorPos, this.text.length - this.cursorPos)
        
        this.endOffset = range.endOffset
        this.startOffset = range.startOffset
        
        this.cursorPos = this.startOffset
        // let rng = this.selection.getRangeAt(0)
        // this.selection.removeAllRanges()
        
        // Field.innerHTML = this.beforeText + this.cursor + this.afterText
        // this.selection.addRange(rng)

        console.log(this.cursorPos, this.text.substr(this.cursorPos, 1))
    }
        
}
