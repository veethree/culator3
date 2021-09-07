$(document).ready(function() {
    // Generating keypad
    let layout = [
        ["random average", "history", "CH"],
        ["c", "*", "<"],
        ["7", "8", "9", "/"],
        ["4", "5", "6", "+"],
        ["1", "2", "3", "-"],
        ["0", ".", "="]
    ]
    let button = '<button id="key_ID" type="button" class="btn btn-primary btn-block">TEXT</button>'

    let keypad_html = "<div id='key_pad' class='container'>"
    for (let y=0; y < layout.length; y++) {
        let row = layout[y]
        keypad_html = keypad_html + '<div class="row"><div class="btn-group" role="group aria-label="keypad">'
        for (let x=0; x < row.length; x++) {
            let id = row[x].replace(" ", "_")
            keypad_html = keypad_html + button.replace("TEXT", row[x]).replace("ID", id)
        }
        keypad_html = keypad_html +  '</div></div>'
    }
    keypad_html = keypad_html + "</div>"

    $("#main_container").append(keypad_html)

    // Click events
    $("button").click(function() {
        let key = $(this)
        let screen = $("#screen_text")

        if (key.text() == "c") {
            screen.text("")
        } else if (key.text() == "<") {
            screen.text(screen.text().substring(0, screen.text().length - 1))
        } else if (key.text() == "=") {
            try {
                screen.text(eval(screen.text()))
            } catch {
                screen.text("Nope")
            }
        } else {
            $("#screen_text").text(screen.text() + key.text())
        }
    })
})
