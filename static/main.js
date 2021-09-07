
function random(min, max) {
    return Math.random() * (max - min) + min;
  }
  

function rndAvg(total, items, difference) {
    let list = []
    let average = total / items

    //First stage
    let sum = 0
    for (let i=0; i<items; i++) {
        list[i] = Math.floor(average + random(-difference, difference))
        sum += list[i]
    }
    
    // Second stage
    let error = total - sum
    let averageError = error / items
    sum = 0
    for (let i=0; i<items; i++) {
        list[i] += averageError
        sum += list[i]

        error = error - averageError
        if (Math.floor(error) == 0) {
            break
        }
    }

    sum = 0
    // rounding
    for (let i=0; i<items; i++) {
        list[i] = Math.floor(list[i])
        sum += list[i]
    }

    // One final test, if theres a remained, It gets added to a random item
    if (sum != total) {
        let i = random(items)
        list[i] += total - sum
    }

    return list
}

function generate_key_pad() {
    if ($("#key_pad").length < 1) {
        let layout = [
            ["random average", "history", "CH"],
            ["c", "*", "<"],
            ["7", "8", "9", "/"],
            ["4", "5", "6", "+"],
            ["1", "2", "3", "-"],
            ["0", ".", "="]
        ]
        let button = '<button id="key_ID" type="button" class="btn btn-primary btn-block btn-lg border">TEXT</button>'

        let keypad_html = "<div id='key_pad' class='container d-block'>"
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
        console.log("Keypad generated")
    }
}


$(document).ready(function() {
    // RNDAVG GLOBALS
    let random_average = false
    let value = 0
    let items = 0

    //
    let init = true // This is true until the user does something
    generate_key_pad()

    // Disabling some buttons
    //$("#key_random_average").attr("disabled", true)
    $("#key_history").attr("disabled", true)
    $("#key_CH").attr("disabled", true)

    // Click events
    $("button").click(function() {
        let key = $(this)
        let screen = $("#screen_text")
        let comment = $("#screen_comment")
        
        //INIT
        if (init) {
            comment.text("")
            init = false
        }

        if (key.text() == "c") {
            screen.text("")
            $("#tab").remove()
        } else if (key.text() == "<") {
            screen.text(screen.text().substring(0, screen.text().length - 1))
        } else if (key.text() == "=") {
            if (random_average) {
                if (screen.text().length > 0) {
                    let values = rndAvg(value, screen.text(), 40)
                    let str = "<div id='tab_div'><table id='tab' class='table'>"
                    values.forEach(function(v) {
                        str += "<tr><td scope='col'>" + v + "</td></tr>"
                    })

                    str += '</table><button id="back" type="button" class="btn btn-primary btn-block btn-lg border">Back</button></div>'
                    $("#main_container").prepend(str)
                    $("#key_pad").addClass("d-none")
                    screen.text("")
                }
            } else { 
                try {
                    screen.text(eval(screen.text()))
                } catch {
                    screen.text("Invalid input.")
                }
            }
        } else if (key.text() == "random average") {
            if (screen.text().length > 0) {
                random_average = true
                value = screen.text()
                screen.text("")
                comment.text("Items: ")
            } else {
                comment.text("First enter a value!")
            }
        } else {
            $("#screen_text").text(screen.text() + key.text())
            comment.text("")
            
        }
    })

    $("#back").click(function() {
        console.log("back")
    })
})


