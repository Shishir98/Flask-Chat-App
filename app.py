from flask import Flask, render_template
from flask_socketio import SocketIO, emit

SERVER_HOST = '0.0.0.0'
PORT = 5000
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app, manage_session=True)


@app.route('/')
def index():
    return render_template('chatapp.html')


@socketio.on('socket_connection', namespace='/')
def test_connection(text):
    """
    # Test SocketIO Connection

    # Parameters : text:str from front-end.

    # Returns : None | Prints : Connection Status
    """

    print(f"================================================= {text} =================================================")


@socketio.on('user_response', namespace='/')
def response_to_front(user_dict):
    """
    # -Stores username and response from user_dict received from front-end.
      -Emits user_dict back to front-end using broadcast.

    # Parameters: user_dict, received from front-end.

    # Returns: user_dict, emits back to front-end.
    """

    username = user_dict["User"]
    response = user_dict["response"]
    print(f"USER INPUT ===========>{username, response}")
    emit('user_response', user_dict, broadcast=True)


if __name__ == '__main__':
    socketio.run(app, SERVER_HOST, PORT)
