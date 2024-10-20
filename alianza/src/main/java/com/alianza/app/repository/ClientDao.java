package com.alianza.app.repository;

import com.alianza.app.model.dto.ClientDto;
import com.alianza.app.model.entities.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.Optional;


public interface ClientDao extends JpaRepository<ClientEntity, Integer> {

    Optional<ClientEntity> findBySharedKey(String sharedKey);

    void deleteById(Integer id);
    

}
