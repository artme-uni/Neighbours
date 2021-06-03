package ru.neighbors.neighbors.services.exceptions;

public class IllegalChatNameException extends Exception {
    public IllegalChatNameException() {
    }

    public IllegalChatNameException(String message) {
        super(message);
    }

    public IllegalChatNameException(String message, Throwable cause) {
        super(message, cause);
    }

    public IllegalChatNameException(Throwable cause) {
        super(cause);
    }
}
