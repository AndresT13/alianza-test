package com.alianza.app.services;

import com.alianza.app.model.dto.ClientDto;
import com.alianza.app.model.entities.ClientEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IClientService {

    List<ClientDto> findAll();

    List<ClientEntity> getFakeClients(int count);

    Optional<ClientDto> findBySharedKey(String sharedKey);

    ClientDto save(ClientDto clientDto);

    ClientDto update(ClientDto clientDto);

    public Page<ClientEntity> findAll(Pageable pageable);

    void deleteClientBySharedKey(String sharedKey);

}
