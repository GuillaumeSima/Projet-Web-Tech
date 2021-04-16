const textElement = document.getElementById('text')
const locationElement = document.getElementById('location')
const optionElement = document.getElementById('option-buttons')
const objectElement = document.getElementById('menu-objects')
var btn = document.querySelector('.button-objects');
var nav = document.querySelector('.nav');
var solde = document.getElementById('solde');
//compass
var north = document.getElementById("north")
north.onclick = selectCompass;
var south = document.getElementById("south");
south.onclick = selectCompass;
var east = document.getElementById("east");
east.onclick = selectCompass;
var west = document.getElementById("west");
west.onclick = selectCompass;
var looper;
var degrees = 0;
var end = 0;


//timer
var timerDiv = document.querySelector('.timer')
const startingHours = 2;
const stopGame = 5;
let time = 0;

var state = {}
//var soldeWallet;



function startGame() {

    state = { orange: false, flyer: false, bag: false, pass: false, talk: false, talkEnd: false, talkEnd2: false, soldeWallet: 10, daughter:false}
    //timer starting
    time = startingHours * 3600;
    // north.onclick(selectCompass);


    //display the first text 
    showTextNode(1)
}

//function that displays text and options 
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    if (state.talk) {


        if (state.talkEnd) {

            if (state.talkEnd2) {
                textElement.innerText = textNode.text + textNode.dialog + textNode.dialogEnd + textNode.dialogEnd2
            } else {
                textElement.innerText = textNode.text + textNode.dialog + textNode.dialogEnd
            }
        }
        else {
            textElement.innerText = textNode.text + textNode.dialog
        }
    }

    else {
        textElement.innerText = textNode.text
        //turn compass
        end = textNode.north
        rotateAnimation("img1", 20);
    }
    //display location
    locationElement.innerText = textNode.location



    //display compass neighbors 
    var neighbors = textNode.neighbors;

    //console.table(neighbors); 
    for (let i in neighbors) {


        if (i == "north") {
            if (neighbors[i] == false) {
               north.style.visibility='hidden';
            }
            else{
                north.style.visibility='visible';
                 north.innerText = neighbors[i];
            }
           
        } else if (i == "south") {
            if (neighbors[i] == false) {
                south.style.visibility='hidden';
             }
             else{
                 south.style.visibility='visible';
                  south.innerText = neighbors[i];
             }
          
        } else if (i == "east") {
            if (neighbors[i] == false) {
                east.style.visibility='hidden';
             }
             else{
                 east.style.visibility='visible';
                  east.innerText = neighbors[i];
             }
           
        } else if (i == "west") {
            if (neighbors[i] == false) {
                west.style.visibility='hidden';
             }
             else{
                 west.style.visibility='visible';
                  west.innerText = neighbors[i];
             }
          
        }



    }
    /* if (neighbors[0]=="north"){
         console.log("here0"); 
         Object.values(neighbors); 
     }
 */



    //increase time
    time = time + textNode.time
    //remove all options 
    while (optionElement.firstChild) {
        optionElement.removeChild(optionElement.firstChild)
    }
    //remove all objects 
    while (objectElement.firstChild) {
        objectElement.removeChild(objectElement.firstChild)
    }
    textNode.options.forEach(option => {
        //console.log(option.requiredState(state))
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionElement.appendChild(button)


        }

    });

    for (let i in state) {

        if (state[i]) {
            if (i == "orange" || i == "flyer" || i == "bag" || i == "pass") {
                console.log(i)
                let attribut = document.createElement('a')
                let newContent = document.createTextNode(i)
                attribut.appendChild(newContent)
                objectElement.appendChild(attribut)
            }


        }
    }

    //soldeWallet++; 
    document.getElementById("solde").innerHTML = state.soldeWallet;
    //soldeWallet=solde
    console.log(state)




}

function showOption(option) {


    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    //edit var state
    state = Object.assign(state, option.setState)
    //edit var stateDialog
    // stateDialog = Object.assign(stateDialog, option.setStateDialog)
    console.log(solde)

    if (option.buy) {
        state.soldeWallet -= option.buy;
    }

    showTextNode(nextTextNodeId)
}


function selectCompass() {

    state.talk=false;
    state.talkEnd=false;
    state.talkEnd2=false;
    const textNode = textNodes.find(textNode => textNode.location === this.innerHTML)
    showTextNode(textNode.id)
    //alert("Button clicked, id " + this.id + ", text" + this.innerHTML);
}

const textNodes = [
    {
        id: 1,
        location: 'Latona fountain',
        neighbors: { north:'Star Grove', south:'Queen s Grove', east: 'Ice cream seller', west: 'Flyer' },
        north: 20,
        time: 0,
        text: 'After a morning visit inside the Palace, you and your daughter want to visit the gardens in the afternoon.\nA blazing sun dominates this afternoon.\n\nHowever, you decide to split up to meet again later.\n\nWhile your daughter is going to see a water fountain show at the Apollo s fountain, you choose to buy yourself an ice cream.\n\n',
        dialog: "",
        options: [
            {
                text: 'Go to the ice cream seller',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        location: 'Ice cream seller',
        neighbors: { north: false, south: 'Queen s Grove', east: 'Orangery', west: 'Latona fountain' },
        north: 50,
        time: 500,
        text: 'question 2.',
        dialog: "",
        options: [
            {
                text: 'Buy',
                requiredState: (currentState) => (currentState.soldeWallet > 2),
                buy: 3,
                nextText: 3
            },
            {
                text: 'Do not buy',

                nextText: 3
            }
        ]
    },
    {
        id: 3,
        location: 'Orangery',
        neighbors: { north: false, south: false, east: false, west: 'Ice cream seller' },
        north: 340,
        time: 500,
        text: 'Intrigued by trees in the Orangery garden, you approach them.\n\nA castle gardener is in the process of caring for trees.',
        dialog: '\n\n>Talk to him\n\n-Hello, I would like to know what these trees are called ?\n-They are orange trees. Have you never seen an orange tree before ?\n-No, it does not grow orange in Scotland.\n-Um ok, take an orange, it is really good and sweet',
        dialogEnd: '\n\n>Take orange\n\n-Thank you so much, I will eat it later.',
        options: [
            {
                text: 'Talk to him',

                requiredState: (currentState) => (currentState.talk == false),
                setState: { talk: true },
                nextText: 3
            },
            {
                text: 'Do not talk',

                requiredState: (currentState) => (currentState.talk == false),
                nextText: 4
            },
            {
                text: 'Take orange',

                requiredState: (currentState) => (currentState.talk && currentState.talkEnd == false && currentState.orange==false),
                setState: { talkEnd: true, orange: true },

                nextText: 3
            },
            {
                text: 'Do not take',

                requiredState: (currentState) => (currentState.talk && currentState.talkEnd == false && currentState.orange==false),
                setState: { talk: false, talkEnd: false },
                nextText: 4
            },
            {
                text: 'Next',

                requiredState: (currentState) => (currentState.talkEnd),
                setState: { talk: false, talkEnd: false },
                nextText: 4
            }

        ],
    },

    {
        id: 4,
        location: 'Flyer',
        neighbors: { north: false, south: false, east: 'Latona fountain', west: 'Apollo s fountain' },
        north: 30,
        time: 500,
        text: 'On the way to join your daughter, you see a castle flyer on the ground, including the program of shows.',
        dialog: '',
        options: [
            {
                text: 'Pick up',
                requiredState: (currentState) => (currentState.flyer==false),
                setState: { flyer: true },
                nextText: 5
            },
            {
                text: 'Do not Pick up',
                requiredState: (currentState) => (currentState.flyer==false),
                nextText: 5
            }

        ]
    },



    {
        id: 5,
        location: 'Apollo s fountain',
        neighbors: { north: 'Star Grove', south: false, east: 'Flyer', west: 'Obelisk Grove' },
        north: 68,
        time: 500,
        text: 'Arriving at the Apollo s fountain, your daughter is gone.\nYou can interact with another visitor.',
        dialog: '\n\n>Talk to him\n\n-Hello, the show is over? I am looking for my daughter.\n-Yes,  the show is over. Your daughter probably went to the next show. But I do not have the program. You must look in the castle flyer.\n-Thanks you',
        options: [
            {
                text: 'Talk to him',

                requiredState: (currentState) => (currentState.talk == false),
                setState: { talk: true },
                nextText: 5
            },
            {
                text: 'Follow indication',

                requiredState: (currentState) => (currentState.talk),
                setState: { talk: false, talkEnd: false },
                nextText: 6
            }

        ],
    },


    {
        id: 6,
        location: 'Obelisk Grove',
        neighbors: { north: false, south: 'Apollo s fountain', east: 'Star Grove', west: false },
        north: 337,
        time: 500,
        text: 'You arrived too late at the show.\nHowever, you recognize your daughter s bag.\nInside there is her ID.',
        dialog: '\n\nNext to the bag, there is a photographer.',
        dialogEnd: '\n\n>Talk to him\n\n-Good afternoon, I am looking for my daughter. Have you seen a little girl ?\nMaybe, have you got a photo ?',
        dialogEnd2: '\n\n>Show ID\n\nI recognize her, she went to the Star Grove.',
        options: [
            {
                text: 'Pick up the bag',

                requiredState: (currentState) => (currentState.talk == false && currentState.bag==false),
                setState: { bag: true, talk: true },

                nextText: 6
            },
            {
                text: 'Do not pick up',

                requiredState: (currentState) => (currentState.talk == false && currentState.bag==false),
                setState: { talk: true },
                nextText: 6
            },
            {
                text: 'Talk to him',

                requiredState: (currentState) => (currentState.talk && currentState.talkEnd == false),
                setState: { talkEnd: true },
                nextText: 6
            },
            {
                text: 'Do not talk',

                requiredState: (currentState) => (currentState.talk && currentState.talkEnd == false),
                setState: { talk: false, talkEnd: false, talkEnd2: false },
                nextText: 6
            },
            {
                text: 'Show ID',

                requiredState: (currentState) => (currentState.bag && currentState.talk && currentState.talkEnd && currentState.talkEnd2 == false),

                setState: { talkEnd2: true },
                nextText: 6
            },
            {
                text: 'Go to the Star Grove',

                requiredState: (currentState) => (currentState.talkEnd2),
                setState: { talk: false, talkEnd: false, talkEnd2: false },
                nextText: 7
            }

        ],
    },

    {
        id: 7,
        location: 'Star Grove',
        neighbors: { north: 'Grove of the Three fountains', south: 'Apollo s fountain', east:'Latona fountain', west: 'Obelisk Grove' },
        north: 10,
        time: 500,
        text: 'You are now in the front of the entrance to the Star Grove.\nYou see a poster where it is written:\n\n< It is a paying grove,\nIt is $10 to visit.\nIt is free for children.\nFor foreigners, discounts at the Queen s Grove.>',
        dialog: '',
        options: [
            {
                text: 'Buy ticket',
                buy: 10,
                requiredState: (currentState) => (currentState.pass == false && currentState.soldeWallet >= 10),
                nextText: 9
            },
            {
                text: 'Show your pass',
                requiredState: (currentState) => (currentState.pass),
                nextText: 9
            },
            {
                text: 'Go to the Queen s Grove',
                nextText: 8
            }

        ]
    },

    {
        id: 8,
        location: 'Queen s Grove',
        neighbors: { north: 'Latona fountain', south: false, east: 'Ice cream seller', west: 'Mirror Pool' },
        north: 320,
        time: 500,
        text: 'On the side of the grove, there is a hut that sells passes to visit all the groves.\n\nSeller says, <for foreign visitors pass at $3 for the Star Groves, and the Grove of the Three fountains.>',
        dialog: '',
        options: [
            {
                text: 'Buy pass',
                requiredState: (currentState) => (currentState.soldeWallet >= 3 && currentState.pass == false),
                setState: { pass: true },
                buy: 3,
                nextText: 7
            },
            {
                text: 'Do not buy',

                nextText: 7
            },

        ]
    },

    {
        id: 9,
        location: 'Grove of the Three fountains',
        neighbors: { north: false, south: 'Star Grove', east: false, west: false },
        north: 30,
        time: 500,
        text: 'After you have looked for your daughter in the Star Groves, you found your daughter in the next grove, Grove of the Three fountains.\n\nBut she will be unable to move to reach the exit because she has sunstroke.\n\nTo save her you have to give her some sweet things. ',
        dialog: '\n\n>Give her the orange\n\nYour daughter regained her strength. You can join the exit with her before the gardens close.\nThe exit from the gardens is at the Mirror Pool.',
        options: [
            {
                text: 'Give her the orange',

                requiredState: (currentState) => (currentState.orange && currentState.talk == false),

                setState: { talk: true, daughter:true},

                nextText: 9
            },
            {
                text: 'Go to the Mirror Pool',
                requiredState: (currentState) => (currentState.talk),
                setState: { talk: false },
                nextText: 10
            }


        ]
    },

    {
        id: 10,
        location: 'Mirror Pool',
        neighbors: { north:false, south:false, east: 'Queen s Grove', west: false },
        north: 340,
        time: 500,
        text: 'This is the exit from the gardens.\n\nDo you want to go out ?',
        dialog: '',
        options: [
            {
                text: 'Exit',

                nextText: 14
            }


        ]
    },



    {
        id: 14,
        location:'end',
        //time: 0,
        neighbors: { north: false, south: false, east: false, west: false },
        north: 0,
        text: 'question 14.\n\n END GAME',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }

        ]
    }

]


btn.onclick = function () {
    nav.classList.toggle('nav_open');
}

var displaysTimer = function () {
    let hours = Math.floor(time / 3600)
    let minutes = Math.floor(time / 60 % 60)
    let seconds = time % 60;

    //need two number else add a 0 before
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    //display in Div 
    timerDiv.textContent = hours + ":" + minutes + ":" + seconds + "PM";
    //launch displaysTimer every 500ms, every half secondes
    setTimeout(displaysTimer, 500);

    if (time >= stopGame * 3600) {
        showTextNode(14)
    }
    else {
        time++;
    }

}







function rotateAnimation(el, speed) {
    var elem = document.getElementById(el);

    /*if(navigator.userAgent.match("Chrome")){
        elem.style.WebkitTransform = "rotate("+degrees+"deg)";
    } else if(navigator.userAgent.match("Firefox")){
        elem.style.MozTransform = "rotate("+degrees+"deg)";
    } else if(navigator.userAgent.match("MSIE")){
        elem.style.msTransform = "rotate("+degrees+"deg)";
    } else if(navigator.userAgent.match("Opera")){
        elem.style.OTransform = "rotate("+degrees+"deg)";
    } else {
        
    }
    */
    looper = setTimeout('rotateAnimation(\'' + el + '\',' + speed + ')', speed);

    elem.style.transform = "rotate(" + degrees + "deg)";
    north.style.transform = " rotate(" + degrees + "deg) translateY(-110px) rotate(" + -degrees + "deg)";
    south.style.transform = "rotate(" + (degrees + 180) + "deg) translateY(-110px) rotate(" + (-degrees - 180) + "deg)";
    east.style.transform = " rotate(" + (degrees + 90) + "deg) translateY(-110px) rotate(" + (-degrees - 90) + "deg)";
    west.style.transform = "rotate(" + (degrees - 90) + "deg) translateY(-110px) rotate(" + (-degrees + 90) + "deg)";


    degrees++;

    if (degrees > 359) {
        degrees = 0;

    }
    if (end == degrees) {

        clearInterval(looper)
    }




    document.getElementById("status").innerHTML = "rotate(" + degrees + "deg)";
}




displaysTimer();
startGame()