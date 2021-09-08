
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

    // rounding
    sum = 0
    for (let i=0; i<items; i++) {
        list[i] = Math.floor(list[i])
        sum += list[i]
    }
    
    // One final test, if theres a remainder, It gets added to a random item
    if (sum != total) {
        list[0] += (total - sum)
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
        let button = '<button id="key_ID" type="button" class="btn btn-primary btn-block btn-lg border border-dark">TEXT</button>'

        let keypad_html = "<div id='key_pad' class='container d-block bg-dark'>"
        let row_id = 0
        for (let y=0; y < layout.length; y++) {
            let row = layout[y]
            keypad_html = keypad_html + '<div class="row"><div id="row_' + row_id + '" class="btn-group" role="group aria-label="keypad">'
            for (let x=0; x < row.length; x++) {
                let id = row[x].replace(" ", "_")
                keypad_html = keypad_html + button.replace("TEXT", row[x]).replace("ID", id)
            }
            row_id += 1
            keypad_html = keypad_html +  '</div></div>'
        }
        keypad_html = keypad_html + "</div>"

        $("#main_container").append(keypad_html)
        $("#row_0 > button").addClass("p-0")
    }
}

$(document).ready(function() {
    // RNDAVG GLOBALS
    let random_average = false
    let total = 0
    let items = 0

    generate_key_pad()

    // Disabling some buttons
    //$("#key_random_average").attr("disabled", true)
    $("#key_history").attr("disabled", true)
    $("#key_CH").attr("disabled", true)

    // Click events
    $("#list").click(function() {
        $("#key_pad").removeClass("d-none")
        $("#screen").removeClass("d-none")
        $("li").remove()
    })

    $("button").click(function() {
        let key = $(this)
        let screen = $("#screen_text")
        let comment = $("#screen_comment")

        if (key.text() == "c") {
            screen.text("")
        } else if (key.text() == "<") {
            screen.text(screen.text().substring(0, screen.text().length - 1))
        } else if (key.text() == "=") {
            if (random_average) {
                if (screen.text().length > 0) {
                    random_average = false
                    items = screen.text()
                    screen.text("")
                    $("#key_pad").addClass("d-none")
                    $("#screen").addClass("d-none")
                    let item = rndAvg(total, items, 40)
                    item.forEach(function(item) {
                        $("#list").append('<li class="list-group-item bg-dark text-light border-light">' + item + '</li>')
                    })
                }
            } else {
                try {
                    screen.text(eval(screen.text()))
                } catch {
                    screen.text("Invalid input.")
                }
            }
        } else if (key.text() == "random average") {
            if(screen.text().length > 0) {
                comment.text("Enter items:")
                total = screen.text() 
                screen.text("")
                random_average = true
            } else {
                comment.text("Enter a total value first!")
            }
        } else {
            $("#screen_text").text(screen.text() + key.text())
            comment.text("")
        }
    })
})



