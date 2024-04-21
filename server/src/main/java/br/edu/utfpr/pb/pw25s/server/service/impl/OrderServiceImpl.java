package br.edu.utfpr.pb.pw25s.server.service.impl;

import br.edu.utfpr.pb.pw25s.server.model.Order;
import br.edu.utfpr.pb.pw25s.server.repository.OrderRepository;
import br.edu.utfpr.pb.pw25s.server.service.IOrderService;
import org.springframework.data.jpa.repository.JpaRepository;

public class OrderServiceImpl extends CrudServiceImpl<Order, Long>
        implements IOrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    protected JpaRepository<Order, Long> getRepository() {
        return orderRepository;
    }
}
