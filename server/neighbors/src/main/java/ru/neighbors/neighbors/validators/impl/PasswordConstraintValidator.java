package ru.neighbors.neighbors.validators.impl;

import org.passay.*;
import ru.neighbors.neighbors.validators.annotations.ValidPassword;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

public class PasswordConstraintValidator implements ConstraintValidator<ValidPassword, String> {
    private static final int MIN_LENGTH_PASSWORD = 8;
    private static final int MAX_LENGTH_PASSWORD = 30;
    private static final int UPPERCASE_CHARACTERS_AMOUNT = 1;
    private static final int DIGITS_CHARACTERS_AMOUNT = 1;
    private static final int SEQUENCE_ALPHABETIC_LENGTH = 5;
    private static final String DELIMITER = "";

    @Override
    public void initialize(ValidPassword arg0) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        PasswordValidator validator = new PasswordValidator(Arrays.asList(
                new LengthRule(MIN_LENGTH_PASSWORD, MAX_LENGTH_PASSWORD),
                new CharacterRule(EnglishCharacterData.UpperCase, UPPERCASE_CHARACTERS_AMOUNT),
                new CharacterRule(EnglishCharacterData.Digit, DIGITS_CHARACTERS_AMOUNT),
                new IllegalSequenceRule(EnglishSequenceData.Alphabetical, SEQUENCE_ALPHABETIC_LENGTH, false),
                new WhitespaceRule()));

        RuleResult result = validator.validate(new PasswordData(password));
        if (result.isValid()) {
            return true;
        }
        context.disableDefaultConstraintViolation();
        String message = String.join(DELIMITER, validator.getMessages(result));
        context.buildConstraintViolationWithTemplate(message)
                .addConstraintViolation();
        return false;
    }
}
