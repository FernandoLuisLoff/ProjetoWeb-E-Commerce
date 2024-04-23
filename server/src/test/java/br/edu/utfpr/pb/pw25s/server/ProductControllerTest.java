package br.edu.utfpr.pb.pw25s.server;

import br.edu.utfpr.pb.pw25s.server.model.Category;
import br.edu.utfpr.pb.pw25s.server.model.Product;
import br.edu.utfpr.pb.pw25s.server.repository.CategoryRepository;
import br.edu.utfpr.pb.pw25s.server.repository.ProductRepository;
import br.edu.utfpr.pb.pw25s.server.shared.GenericResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class ProductControllerTest {
    private final String API_PRODUCTS = "/products";

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @BeforeEach
    public void cleanup() {
        productRepository.deleteAll();
        categoryRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postProduct_whenProductIsValid_receiveOk() {
        ResponseEntity<GenericResponse> response =
                testRestTemplate.postForEntity(
                        API_PRODUCTS,
                        createValidProduct(),
                        GenericResponse.class);
        assertThat(response.getBody().getMessage()).isNotNull();
    }

    private Product createValidProduct() {
        Category category = createValidCategory();
        categoryRepository.save(category);

        return Product.builder()
                .name("test-product")
                .category(category)
                .build();
    }

    private Category createValidCategory() {
        return Category.builder()
                .name("test-category")
                .build();
    }
}
