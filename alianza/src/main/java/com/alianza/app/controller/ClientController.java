package com.alianza.app.controller;

import com.alianza.app.exception.BadRequestException;
import com.alianza.app.exception.ResourceNotFoundException;
import com.alianza.app.model.dto.ClientDto;
import com.alianza.app.model.entities.ClientEntity;
import com.alianza.app.payload.MessageResponse;
import com.alianza.app.services.IClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.hibernate.query.sqm.tree.SqmNode.log;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ClientController {

    public static IClientService clientService;

    @Autowired

    public ClientController(IClientService clientService) {
        this.clientService = clientService;

    }

    @GetMapping("/clients")
    public ResponseEntity<MessageResponse> getClients() {
        List<ClientDto> getList = clientService.findAll();

        if (getList == null || getList.isEmpty()) {
            throw new ResourceNotFoundException("No hay registros de clientes en el sistema.");
        }

        MessageResponse response = MessageResponse.builder()
                .message("Clientes encontrados")
                .object(getList)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    /*
    @GetMapping("/fake")
    public List<ClientEntity> getFakeClients() {
        return (List<ClientEntity>) clientService.getFakeClients(10);
    }

    @GetMapping(path = "/sharedKey/{sharedKey}")
    public ResponseEntity<MessageResponse> getNumberDocument(@PathVariable String sharedKey) {
        ClientDto cliente = clientService.findBySharedKey(sharedKey);

        // Si el cliente no se encuentra, lanzamos una excepción personalizada
        if (cliente == null) {
            throw new ResourceNotFoundException("cliente", "número de documento: ", sharedKey);
        }

        // Modificar o formatear campos antes de devolverlos
        String formattedPhone = formatPhoneNumber(cliente.getPhone());  // Ejemplo de formato
        String startDateFormatted = formatDate(cliente.getStartDate());  // Formato de fecha
        String endDateFormatted = (cliente.getEndDate() != null) ? formatDate(cliente.getEndDate()) : null;

        // Construimos la respuesta MessageResponse con el cliente ya procesado
        MessageResponse response = MessageResponse.builder()
                .message("Cliente encontrado")
                .object(ClientDto.builder()
                        .sharedKey(cliente.getSharedKey())
                        .name(cliente.getName())
                        .email(cliente.getEmail())
                        .phone(formattedPhone)  // Campo modificado
                        .startDate(cliente.getStartDate())  // Campo modificado
                        .endDate(cliente.getEndDate())  // Campo modificado
                        .build())
                .build();

        return ResponseEntity.ok(response);
    }


     */

    // Método para formatear el número de teléfono
    private String formatPhoneNumber(String phone) {
        // Lógica de formato, por ejemplo, agregar guiones o un prefijo
        return phone.substring(0, 4) + "-" + phone.substring(4);
    }

    // Método para formatear la fecha (suponiendo que `startDate` y `endDate` son de tipo `Date`)
    private String formatDate(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(date);
    }


    @GetMapping("/clients/page/{page}")
    public Page<ClientEntity> index(@PathVariable Integer page) {
        Pageable pageable = PageRequest.of(page, 4);
        return clientService.findAll(pageable);
    }

    @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createClient(@RequestBody ClientDto clientDto) {
        ClientDto clientSave = null;

        try {
            // Generar el sharedKey basado en el nombre y el ID que se asignará en la base de datos
            String sharedKey = generateSharedKey(clientDto.getName());
            clientDto.setSharedKey(sharedKey);  // Asigna el sharedKey a tu DTO

            // Guardar el cliente
            clientSave = clientService.save(clientDto);

            log.info("Se creó correctamente el cliente");

            // Preparar la respuesta exitosa con el objeto guardado
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(MessageResponse.builder()
                            .message("Guardado correctamente")
                            .object(ClientDto.builder()
                                    .sharedKey(clientSave.getSharedKey())
                                    .name(clientSave.getName())
                                    .email(clientSave.getEmail())
                                    .phone(clientSave.getPhone())
                                    .startDate(clientSave.getStartDate())
                                    .endDate(clientSave.getEndDate())
                                    .build())
                            .build());
        } catch (DataAccessException exDt) {
            log.error("Error al intentar crear el cliente", exDt);
            throw new BadRequestException("Error al guardar el cliente: " + exDt.getMessage());
        }
    }

    @GetMapping("/findBySharedKey/{sharedKey}")
    public ResponseEntity<?> getClientBySharedKey(@PathVariable String sharedKey) {
        Optional<ClientDto> clientDtoOpt = clientService.findBySharedKey(sharedKey);

        if (clientDtoOpt.isPresent()) {
            // Si se encuentra el cliente, lo devolvemos
            return ResponseEntity.ok(clientDtoOpt.get());
        } else {
            // Si no se encuentra, respondemos con un error 404
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Cliente con sharedKey '" + sharedKey + "' no encontrado");
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")  // Reemplaza el puerto y origen según corresponda
    @DeleteMapping("/delete/{sharedKey}")
    public ResponseEntity<String> deleteClientBySharedKey(@PathVariable String sharedKey) {
        try {
            clientService.deleteClientBySharedKey(sharedKey);
            return ResponseEntity.ok("Cliente con sharedKey '" + sharedKey + "' eliminado correctamente.");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    public String generateSharedKey(String name) {
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("El nombre no puede ser vacío");
        }

        // Toma la primera letra del nombre en minúscula y concatena un número o un valor único
        String firstLetter = name.substring(0, 1).toLowerCase();
        String lastName = name.split(" ")[1].toLowerCase();  // Considera que el nombre tiene al menos dos partes
        int uniqueNumber = (int) (Math.random() * 100);  // Genera un número aleatorio para asegurar unicidad
        return firstLetter + lastName + uniqueNumber;  // Genera el sharedKey
    }


}
