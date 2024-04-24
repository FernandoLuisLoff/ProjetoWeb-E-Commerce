package br.edu.utfpr.pb.pw25s.server;

import br.edu.utfpr.pb.pw25s.server.model.*;
import br.edu.utfpr.pb.pw25s.server.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class OrderItemsControllerTest {
    private final String API_ORDERS = "/orders";

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @BeforeEach
    public void cleanup() {
        orderItemsRepository.deleteAll();
        orderRepository.deleteAll();
        userRepository.deleteAll();
        productRepository.deleteAll();
        categoryRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    @DisplayName("Espera retorno de itens do pedido inseridos para teste usando findAll")
    public void findAllOrderItemsTest() {
        User user = createValidUser();
        userRepository.save(user);

        Order order = createOrder(user);
        orderRepository.save(order);

        Category category = createCategory();
        categoryRepository.save(category);

        Product product = createProduct(category);
        productRepository.save(product);

        orderItemsRepository.save(OrderItems.builder().product(product).amount(BigDecimal.valueOf(3)).totalValue(BigDecimal.valueOf(25)).build());
        orderItemsRepository.save(OrderItems.builder().product(product).amount(BigDecimal.valueOf(1)).totalValue(BigDecimal.valueOf(75)).build());

        ResponseEntity<Order[]> response =
                testRestTemplate.getForEntity(
                        API_ORDERS,
                        Order[].class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody()).hasSize(2);
    }

    private User createValidUser() {
        return User.builder()
                .displayName("Name")
                .username("username")
                .password("password").build();
    }

    private Order createOrder(User user) {
        return Order.builder()
                .totalValue(BigDecimal.valueOf(100))
                .user(user).build();
    }

    private Category createCategory() {
        return Category.builder()
                .name("category").build();
    }

    private Product createProduct(Category category) {
        return Product.builder()
                .name("product1")
                .price(BigDecimal
                .valueOf(25))
                .category(category).build();
    }
}
