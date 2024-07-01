import { Alert, AlertDescription, AlertIcon, AlertTitle, SimpleGrid, Box, Image, Text, Menu, MenuButton, 
  MenuList, MenuItem, Button, Flex, Spacer } from '@chakra-ui/react'
import { IoChevronDown } from "react-icons/io5";
import { ICategory, IProduct } from "@/commons/interfaces";
import ProductService from "@/services/ProductService";
import CategoryService from "@/services/CategoryService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function HomePage() {
  const [data, setData] = useState<IProduct[]>([]);
  const [apiError, setApiError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.findAll();
        if (response.status === 200) {
          const allCategories = [{ id: 0, name: "Todos" }, ...response.data];
          setCategories(allCategories);
        } else {
          setApiError("Falha ao carregar as categorias!");
        }
      } catch (error) {
        setApiError("Falha ao carregar as categorias!");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const loadData = async (page: number, categoryId: number | undefined) => {
      try {
        let response;
        if (categoryId !== undefined && categoryId !== 0) {
          response = await ProductService.pageByCategory(page, categoryId);
        } else {
          response = await ProductService.page(page);
        }

        if (response.status === 200) {
          setData(response.data.content);
          setTotalPages(response.data.totalPages);
          setApiError("");
        } else {
          setApiError("Falha ao carregar a lista de produtos!");
        }
      } catch (error) {
        setApiError("Falha ao carregar a lista de produtos!");
      }
    };

    loadData(currentPage, selectedCategory?.id);
  }, [currentPage, selectedCategory]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleCategorySelect = async (category: ICategory) => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await ProductService.findAll();
    if (response.status === 200) {
      setData(response.data);
    } else {
      setApiError("Falha ao carregar a lista de produtos!");
    }
  };

  return (
    <>
      <main className="container">
        <div className="text-center">
          <h1 className="h3 mb-3 fw-normal">Produtos</h1>
          <Flex  mb="4">
            <Menu>
              <MenuButton as={Button} rightIcon={<IoChevronDown />}>
                {selectedCategory ? selectedCategory.name : "Todos"}
              </MenuButton>
              <MenuList>
                {categories.map((category) => (
                  <MenuItem key={category.id} onClick={() => handleCategorySelect(category)}>
                    {category.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Spacer />
            <Button onClick={handlePreviousPage} isDisabled={currentPage === 0} mr="2">
              Anterior
            </Button>
            <Text alignSelf="center">
              Página {currentPage + 1} de {totalPages}
            </Text>
            <Button onClick={handleNextPage} isDisabled={currentPage === totalPages - 1} ml="2">
              Próxima
            </Button>
          </Flex>
          <SimpleGrid columns={3} spacing={10}>
            {data.map((product: IProduct) => (
              <Box className='p-3 shadow' bg='white' height='400px'  display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                <Image src={product.url_img} width="200px" alt={product.name} />
                <Text>Categoria: {product.category.name}</Text>
                <Text>Preço: R$ {product.price.toFixed(2)}</Text>
                <Link className="btn btn-secondary shadow" to={`/products/${product.id}`}>
                  Bicicleta {product.name}
                </Link> 
              </Box>  
            ))}
          </SimpleGrid>
          {apiError && (
            <Alert status="error" mt="4">
              <AlertIcon />
              <AlertTitle>Ocorreu um erro!</AlertTitle>
              <AlertDescription>{apiError}</AlertDescription>
            </Alert>
          )}
        </div>
      </main>
    </>
  );
}