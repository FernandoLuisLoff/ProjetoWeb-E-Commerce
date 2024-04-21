package br.edu.utfpr.pb.pw25s.server.dto;

import br.edu.utfpr.pb.pw25s.server.model.User;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderDto {

    private Long id;

    private BigDecimal totalValue;

    private User user;

}
