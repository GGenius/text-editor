let text_field = document.createElement("div")
text_field.style.border = "1px solid #000"

text_field.style.width = "500px"
text_field.style.height = "500px"

document.body.appendChild(text_field)

const Field = new TextField(text_field)
