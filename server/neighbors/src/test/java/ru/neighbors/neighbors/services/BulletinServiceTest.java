package ru.neighbors.neighbors.services;

import com.github.springtestdbunit.TransactionDbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.transaction.annotation.Transactional;
import ru.neighbors.neighbors.dto.BulletinDto;
import ru.neighbors.neighbors.dto.BulletinUserDto;
import ru.neighbors.neighbors.repositories.BulletinRepository;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@TestExecutionListeners({
        DependencyInjectionTestExecutionListener.class,
        TransactionDbUnitTestExecutionListener.class
})
@DatabaseSetup("/dataset.xml")
@Transactional
class BulletinServiceTest {
    @Autowired
    private BulletinService bulletinService;
    @Autowired
    private BulletinRepository bulletinRepository;

    @Test
    void testFindingById() {
        long id = 42;
        var bulletinDto = bulletinService.findById(id);
        final var bulletinText = "Засорился мусоропровод  необходимо собрать коллективное пиьсмо в жкх";
        final var bulletinTitle = "Проблемы с мусоропроводом";
        assertEquals(bulletinText, bulletinDto.getText());
        assertEquals(bulletinTitle, bulletinDto.getTitle());
    }

    @Test
    void testCreation() {
        var bulletinDto = new BulletinDto();
        var bulletinUserDto = new BulletinUserDto();
        bulletinUserDto.setFirstName("Иванов");
        bulletinUserDto.setLastName("Иван");
        bulletinUserDto.setLogin("ivanov@ya.ru");
        bulletinDto.setOwner(bulletinUserDto);
        bulletinDto.setTitle("Тест-Объявление");
        bulletinDto.setText("Тест-Текст");
        bulletinService.create(bulletinDto);
        var isExistsBulletin = bulletinRepository.findAll()
                .stream()
                .anyMatch(bulletin -> bulletin.getTitle().equals("Тест-Объявление"));
        assertTrue(isExistsBulletin);
    }

    @Test
    void testUpdate() {
        var bulletinDto = new BulletinDto();
        var bulletinUserDto = new BulletinUserDto();
        bulletinDto.setId(42);
        bulletinUserDto.setFirstName("Иванов");
        bulletinUserDto.setLastName("Иван");
        bulletinUserDto.setLogin("ivanov@ya.ru");
        bulletinDto.setOwner(bulletinUserDto);
        bulletinDto.setTitle("Проблемы с мусоропроводом");
        bulletinDto.setText("Тест-Текст");
        bulletinService.update(bulletinDto);
        assertEquals("Тест-Текст", bulletinRepository.findById(42L).get().getText());
    }

    @Test
    void testDeletion() {
        long id = 42;
        bulletinService.deleteById(id);
        assertTrue(bulletinRepository.findById(id).isEmpty());
    }
}
