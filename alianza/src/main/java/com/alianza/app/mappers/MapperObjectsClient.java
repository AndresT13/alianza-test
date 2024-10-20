package com.alianza.app.mappers;

import com.alianza.app.model.dto.ClientDto;
import com.alianza.app.model.entities.ClientEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface MapperObjectsClient {

    public static ClientDto clientEntityToClientDto(ClientEntity clientEntity) {
        if (clientEntity == null) {
            return null;
        }
        return ClientDto.builder()
                .id(clientEntity.getId())
                .sharedKey(clientEntity.getSharedKey())
                .name(clientEntity.getName())
                .email(clientEntity.getEmail())
                .phone(clientEntity.getPhone())
                .startDate(clientEntity.getStartDate())
                .build();
    }

    public static ClientEntity clientDtoToClientEntity(ClientDto clientDto) {
        if (clientDto == null) {
            return null;
        }
        return ClientEntity.builder()
                .id(clientDto.getId())
                .sharedKey(clientDto.getSharedKey())
                .name(clientDto.getName())
                .email(clientDto.getEmail())
                .phone(clientDto.getPhone())
                .startDate(clientDto.getStartDate())
                .build();
    }

    public static List<ClientDto> clientEntityToClientDtoList(List<ClientEntity> entities) {
        List<ClientDto> dtos = new ArrayList<>();
        for (ClientEntity entity : entities) {
            ClientDto dto = new ClientDto(
                    entity.getName(),
                    entity.getPhone(),
                    entity.getEmail(),
                    entity.getStartDate(),
                    entity.getEndDate()
            );
            dtos.add(dto);
        }
        return dtos;
    }

}
