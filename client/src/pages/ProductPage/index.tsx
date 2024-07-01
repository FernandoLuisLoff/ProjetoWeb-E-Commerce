import { Alert, AlertDescription, AlertIcon, AlertTitle, VStack, Image, Text, Flex, useToast, Button } from '@chakra-ui/react'
import { FiShoppingCart } from "react-icons/fi";
import { IProduct } from "@/commons/interfaces";
import ProductService from "@/services/ProductService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [apiError, setApiError] = useState("");
    const toast = useToast();

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await ProductService.findById(parseInt(id!.toString()));
                if (response.status === 200) {
                    setProduct(response.data);
                } else {
                    setApiError("Falha ao carregar o produto!");
                }
            } catch (error) {
                setApiError("Falha ao carregar o produto!");
            }
        };

        loadData();
    }, [id]);

    const handleCart = (product: IProduct) => {
        try {
            let cart: (string | IProduct)[] = JSON.parse(localStorage.getItem("cart") || "[]");
        
            const isAlreadyInCart = cart.some(item => {
                if (typeof item === 'object' && item !== null) {
                return item.id === product.id;
                }
                return false;
            });
        
            if (isAlreadyInCart) {
                toast({
                title: "Item já está no seu carrinho!",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
                });
            } else {
                cart.push(product);
                localStorage.setItem("cart", JSON.stringify(cart));
                toast({
                title: "Produto adicionado ao carrinho!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right"
                });
            }
        } catch (error) {
            toast({
                title: "Erro ao adicionar produto ao carrinho!",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
        }
    };

    return (
        <>
        <main className="container row justify-content-center">
            {product && (
                <VStack>
                    <Flex>
                        <Image src={product.url_img} width="200px" alt={product.name} />
                        <VStack mt="5">
                            <Text>Bicicleta {product.name} - Categoria: {product.category.name}</Text>
                            <Text>Preço: R$ {product.price}</Text>
                            <Button className="btn btn-secondary shadow" onClick={() => handleCart(product)}>
                                <FiShoppingCart />Adicionar ao carrinho
                            </Button>
                        </VStack>
                    </Flex>
                    <Text ml="10">{product.description}</Text>
                </VStack>
            )}
            {apiError && (
                <Alert status="error" mt="4">
                <AlertIcon />
                <AlertTitle>Ocorreu um erro!</AlertTitle>
                <AlertDescription>{apiError}</AlertDescription>
                </Alert>
            )}
        </main>
        </>
    );
}
