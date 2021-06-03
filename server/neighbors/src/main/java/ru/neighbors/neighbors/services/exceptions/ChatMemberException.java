package ru.neighbors.neighbors.services.exceptions;

public class ChatMemberException extends Exception{
    public ChatMemberException() {
    }

    public ChatMemberException(String message) {
        super(message);
    }

    public ChatMemberException(String message, Throwable cause) {
        super(message, cause);
    }

    public ChatMemberException(Throwable cause) {
        super(cause);
    }
}
