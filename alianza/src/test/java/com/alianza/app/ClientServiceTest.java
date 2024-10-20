package com.alianza.app;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

import java.sql.Date;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


import com.alianza.app.exception.ResourceNotFoundException;
import com.alianza.app.model.dto.ClientDto;
import com.alianza.app.model.entities.ClientEntity;
import com.alianza.app.repository.ClientDao;
import com.alianza.app.services.impl.ClientServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class ClientServiceTest {

    @Mock
    private ClientDao clientDao;

    @Mock
    private ClientDao clientRepository; // Repositorio mockeado


    private ClientEntity clientEntity;


    @InjectMocks
    private ClientServiceImpl clientService;


    @BeforeEach
    public void setUp() {
        // Configuración previa antes de cada test
        clientEntity = new ClientEntity();
        clientEntity.setId(1);
        clientEntity.setSharedKey("santiago1");
        clientEntity.setName("Santiago Tellez");
        clientEntity.setPhone("2208-441625");
        clientEntity.setEmail("stellez@mail.co");
        clientEntity.setStartDate(java.sql.Date.valueOf("2022-01-01"));
        clientEntity.setEndDate(null);
    }


    public void testFindAll() {
        // Datos de prueba
        ClientEntity clientEntity1 = new ClientEntity();
        clientEntity1.setSharedKey("JPEREZ");
        clientEntity1.setEmail("jperez@mail.co");

        ClientEntity clientEntity2 = new ClientEntity();
        clientEntity2.setSharedKey("PLIMA");
        clientEntity2.setEmail("pablolima@mail.co");

        List<ClientEntity> clientEntityList = Arrays.asList(clientEntity1, clientEntity2);

        // Configurar el comportamiento del mock
        when(clientDao.findAll()).thenReturn(clientEntityList);

        // Llamar al método que se está probando
        List<ClientDto> result = clientService.findAll();

        // Verificar el resultado
        assertThat(result).isNotNull(); // Asegurarse de que el resultado no sea null
        assertThat(result).hasSize(2); // Verificar el tamaño de la lista
        assertThat(result.get(0).getSharedKey()).isEqualTo("JPEREZ"); // Verificar los valores de los DTO
        assertThat(result.get(0).getEmail()).isEqualTo("jperez@mail.co");
        assertThat(result.get(1).getSharedKey()).isEqualTo("PLIMA");
        assertThat(result.get(1).getEmail()).isEqualTo("pablolima@mail.co");
    }


    public void testFindBySharedKey() {
        // Datos de prueba
        String sharedKey = "testSharedKey";
        ClientEntity clientEntity = new ClientEntity();
        clientEntity.setSharedKey("testSharedKey");
        clientEntity.setName("Test Client");
        clientEntity.setSharedKey(sharedKey);

        // Configurar el comportamiento del mock
        when(clientDao.findBySharedKey(sharedKey)).thenReturn(Optional.of(clientEntity));

        // Llamar al método que se está probando
        Optional<ClientDto> result = clientService.findBySharedKey(sharedKey);

        // Verificar el resultado
        assertThat(result).isNotNull(); // Asegurarse de que el resultado no sea nulo
        assertThat(result.get().getSharedKey()).isEqualTo("testSharedKey"); // Verificar el ID esperado
        assertThat(result.get().getName()).isEqualTo("Test Client"); // Verificar el nombre esperado
    }


    public void testFindBySharedKey_NotFound() {
        // Datos de prueba
        String sharedKey = "nonExistentSharedKey";

        // Configurar el comportamiento del mock
        when(clientDao.findBySharedKey(sharedKey)).thenReturn(Optional.empty());

        // Llamar al método que se está probando
        Optional<ClientDto> result = clientService.findBySharedKey(sharedKey);

        // Verificar el resultado
        assertThat(result).isEmpty(); // Esperamos que sea null cuando no se encuentra ninguna entidad
    }


    public void testDeleteClientBySharedKey_ClientFound() {
        ClientEntity clientEntity = new ClientEntity();
        clientEntity.setSharedKey("santiago1");  // Asegúrate de que el sharedKey sea el mismo que pasas en el mock
        clientEntity.setEmail("santiago@mail.co");
        clientEntity.setName("Santiago Tellez");
        clientEntity.setPhone("2208-441625");
        clientEntity.setStartDate(Date.valueOf("2022-01-01"));
        clientEntity.setEndDate(null);

        // Configura el mock para devolver el cliente cuando se busca por sharedKey
        when(clientRepository.findBySharedKey("santiago1")).thenReturn(Optional.of(clientEntity));

        // Ejecuta el método delete
        clientService.deleteClientBySharedKey("santiago1");

        // Verifica que el método delete fue llamado una vez con el cliente correcto
        verify(clientRepository, times(1)).delete(clientEntity);
    }


    public void testDeleteClientBySharedKey_ClientNotFound() {
        // Configuramos el comportamiento del mock para que no encuentre el cliente
        when(clientRepository.findBySharedKey("nonExistentSharedKey")).thenReturn(Optional.empty());

        // Ejecutamos el método y verificamos que la excepción se lanza
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            clientService.deleteClientBySharedKey("nonExistentSharedKey");
        });

        // Verificamos el mensaje de la excepción
        assertThat("Cliente con sharedKey 'nonExistentSharedKey' no encontrado.");
    }

}
