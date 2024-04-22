package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.OrderItemsDto;
import br.edu.utfpr.pb.pw25s.server.model.OrderItems;
import br.edu.utfpr.pb.pw25s.server.service.ICrudService;
import br.edu.utfpr.pb.pw25s.server.service.IOrderItemsService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("order-items")
public class OrderItemsController extends CrudController<OrderItems, OrderItemsDto, Long> {

    private final IOrderItemsService service;
    private final ModelMapper modelMapper;

    public OrderItemsController(IOrderItemsService service, ModelMapper modelMapper) {
        super(OrderItems.class, OrderItemsDto.class);
        this.service = service;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<OrderItems, Long> getService() {
        return service;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }

}
