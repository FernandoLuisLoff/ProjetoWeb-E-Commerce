import { SimpleGrid, Box, Image, Text } from '@chakra-ui/react'
import { IProduct } from "@/commons/interfaces";
import ProductService from "@/services/ProductService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function HomePage() {
  const [data, setData] = useState<IProduct[]>([]);
  const [apiError, setApiError] = useState("");

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
          <SimpleGrid columns={3} spacing={10}>
            {data.map((product: IProduct) => (
              <Box className='p-3 shadow' bg='white' height='400px'  display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                <Image src={product.url_img} width="200px" alt={product.name} />
                <Text>Categoria: {product.category.name}</Text>
                <Text>Preço: R$ {product.price}</Text>
                <Link className="btn btn-secondary shadow" to={`/products/${product.id}`}>
                  Bicicleta {product.name}
                </Link> 
              </Box>  
            ))}
          </SimpleGrid>
        </div>
      </main>
    </>
  );
}