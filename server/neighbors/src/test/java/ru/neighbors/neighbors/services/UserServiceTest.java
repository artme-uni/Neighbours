package ru.neighbors.neighbors.services;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.TransactionDbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import ru.neighbors.neighbors.dto.AddressDto;
import ru.neighbors.neighbors.repositories.UserRepository;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@TestExecutionListeners({
        DependencyInjectionTestExecutionListener.class,
        TransactionDbUnitTestExecutionListener.class
})
@DatabaseSetup("/dataset.xml")
class UserServiceTest {
    @Autowired
    private BulletinService userRepository;

    @Test
    void whenInitializedByDbUnit_thenFindsByName() {
        var addressDto = new AddressDto();
        addressDto.setCity("Новосибирск");
        addressDto.setStreet("Пирогова");
        addressDto.setHouseNumber(2);
        assertThat(userRepository.findAll(addressDto), is(not(empty())));
    }
}