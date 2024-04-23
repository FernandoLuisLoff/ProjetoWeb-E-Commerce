package br.edu.utfpr.pb.pw25s.server;

import br.edu.utfpr.pb.pw25s.server.dto.CategoryDto;
import br.edu.utfpr.pb.pw25s.server.error.ApiError;
import br.edu.utfpr.pb.pw25s.server.model.Category;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.CategoryRepository;
import br.edu.utfpr.pb.pw25s.server.shared.GenericResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class CategoryControllerTest {
    private final String API_CATEGORIES = "/categories";

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private CategoryRepository categoryRepository;

    @BeforeEach
    public void cleanup() {
        categoryRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postCategory_whenCategoryIsValid_receiveOk() {
        ResponseEntity<CategoryDto> response =
                testRestTemplate.postForEntity(
                        API_CATEGORIES,
                        createValidCategory(),
                        CategoryDto.class);
        assertThat(response.getBody().getName()).isNotNull();
    }

    private Category createValidCategory() {
        return Category.builder()
                .name("test-category")
                .build();
    }
}
