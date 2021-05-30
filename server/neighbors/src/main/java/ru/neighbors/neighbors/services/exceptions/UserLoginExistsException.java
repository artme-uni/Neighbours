package ru.neighbors.neighbors.services.exceptions;

public class UserLoginExistsException extends Exception{
    public UserLoginExistsException() {
    }

    public UserLoginExistsException(String message) {
        super(message);
    }

    public UserLoginExistsException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserLoginExistsException(Throwable cause) {
        super(cause);
    }
}
