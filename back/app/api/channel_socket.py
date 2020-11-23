import functools
from flask import g
from threading import Lock
from flask import Flask, render_template, session, request
from flask_socketio import (
    SocketIO,
    Namespace,
    emit,
    join_room,
    leave_room,
    close_room,
    rooms,
    disconnect,
)

async_mode = None
socketio = SocketIO(cors_allowed_origins="*", async_mode=async_mode)
thread = None
thread_lock = Lock()


# # Check authentication token for every request
# def authenticated_only(f):
#     @functools.wraps(f)
#     def wrapped(*args, **kwargs):
#         if not g.current_user:
#             disconnect()
#         else:
#             return f(*args, **kwargs)

#     return wrapped


# @socketio.on("my event")
# @authenticated_only
# def handle_my_custom_event(data):
#     emit(
#         "my response",
#         {"message": "{0} has joined".format(current_user.name)},
#         broadcast=True,
#     )


def background_thread():
    """Example of how to send server generated events to clients."""
    count = 0
    while True:
        socketio.sleep(10)
        count += 1
        socketio.emit(
            "my_response",
            {"data": "Server generated event", "count": count},
            namespace="/test",
        )


# @socketio.on("connect", namespace="/test")
# def test_connect():
#     # print("client connected")
#     emit("my_response", {"data": "Connected - hello client :)"})


# @socketio.on("disconnect", namespace="/test")
# def test_disconnect():
#     print("Client disconnected")


class MyNamespace(Namespace):
    def on_my_event(self, message):
        session["receive_count"] = session.get("receive_count", 0) + 1
        emit(
            "my_response", {"data": message["data"], "count": session["receive_count"]}
        )

    def on_my_broadcast_event(self, message):
        session["receive_count"] = session.get("receive_count", 0) + 1
        emit(
            "my_response",
            {"data": message["data"], "count": session["receive_count"]},
            broadcast=True,
        )

    def on_join(self, message):
        join_room(message["room"])
        session["receive_count"] = session.get("receive_count", 0) + 1
        emit(
            "my_response",
            {
                "data": "In rooms: " + ", ".join(rooms()),
                "count": session["receive_count"],
            },
        )

    def on_leave(self, message):
        leave_room(message["room"])
        session["receive_count"] = session.get("receive_count", 0) + 1
        emit(
            "my_response",
            {
                "data": "In rooms: " + ", ".join(rooms()),
                "count": session["receive_count"],
            },
        )

    def on_close_room(self, message):
        session["receive_count"] = session.get("receive_count", 0) + 1
        emit(
            "my_response",
            {
                "data": "Room " + message["room"] + " is closing.",
                "count": session["receive_count"],
            },
            room=message["room"],
        )
        close_room(message["room"])

    def on_my_room_event(self, message):
        session["receive_count"] = session.get("receive_count", 0) + 1
        emit(
            "my_response",
            {"data": message["data"], "count": session["receive_count"]},
            room=message["room"],
        )

    def on_disconnect_request(self):
        session["receive_count"] = session.get("receive_count", 0) + 1
        emit(
            "my_response", {"data": "Disconnected!", "count": session["receive_count"]}
        )
        disconnect()

    def on_my_ping(self):
        emit("my_pong")

    def on_connect(self):
        global thread
        with thread_lock:
            if thread is None:
                thread = socketio.start_background_task(background_thread)
        emit("my_response", {"data": "Connected", "count": 0})

    def on_disconnect(self):
        print("Client disconnected", request.sid)


socketio.on_namespace(MyNamespace("/test"))
