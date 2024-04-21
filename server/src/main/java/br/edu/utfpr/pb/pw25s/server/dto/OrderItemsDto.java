package br.edu.utfpr.pb.pw25s.server.dto;

import br.edu.utfpr.pb.pw25s.server.model.Order;
import br.edu.utfpr.pb.pw25s.server.model.Product;

import java.math.BigDecimal;

public class OrderItemsDto {

    private Long id;

    private BigDecimal totalValue;

    private BigDecimal amount;

    private Order order;

    private Product product;

}
