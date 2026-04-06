package com.ecommerce.dto;

import lombok.Data;

@Data
public class ProductDTO {
    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private Integer stock;
    private String category;
}
