package com.alianza.app.model.dto;

import com.alianza.app.model.entities.ClientEntity;
import jakarta.validation.constraints.Email;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ClientDto {

    private Integer id;
    private String sharedKey;
    private String name;
    private String phone;
    private String email;
    private Date startDate;
    private Date endDate;


    public ClientDto(String name, String phone, String email, Date startDate, Date endDate) {
    }
}
