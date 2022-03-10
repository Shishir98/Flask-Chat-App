var user_dict= {} //Have to make this a global variable for print_response() to access it.
var namespace = '/'
var socket = io.connect('http://' + document.domain + ':' + location.port + namespace);

socket.on('connect',
    function()
    {
    socket.emit('socket_connection', "Socket is Connected");
    console.log("Socket Connected")
    });

function user_response()
    {
    /**
        * user_response takes user response using document.getElementById and stores it in user_dict.
        * Parameter: None, takes userinput from forms.
        * Returns: user_dict, emits to front-end
    */

    var message = document.getElementById("message").value;
    var username = document.getElementById("username").value;
    user_dict= {
        User : username,
        response : message
        }; // this could be done in a simpler way by just emit('', {username,message})
    socket.emit('user_response', user_dict);
    }

socket.on('user_response',
    function(print_response)
    {
        /**
        * Print_response gets user_dict from backend and stores its values in variables.
        * Parameter: print_response:dict from backend
        * Returns: Edits textarea with id="chat"
        */

        var user = print_response.User;
        var responses = print_response.response;
        var chat_update= document.getElementById("chat");
        chat_update.append(user +": "+responses + "\n"); //Why append? Why not innerHTML or insertAdjacentHTML?
        console.log(responses);
//      chat_update.innerHTML = user +": "+responses + "\n"
//      chat_update.insertAdjacentHTML =(user +": "+responses);
     }
);



