package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.OrderItems;
import br.edu.utfpr.pb.pw25s.server.repository.OrderItemsRepository;
import br.edu.utfpr.pb.pw25s.server.service.IOrderItemsService;
import org.springframework.data.jpa.repository.JpaRepository;

public class OrderItemsService  extends CrudServiceImpl<OrderItems, Long>
        implements IOrderItemsService {

    private final OrderItemsRepository orderItemsRepository;

    public OrderItemsService(OrderItemsRepository orderItemsRepository) {
        this.orderItemsRepository = orderItemsRepository;
    }

    @Override
    protected JpaRepository<OrderItems, Long> getRepository() {
        return orderItemsRepository;
    }
}
