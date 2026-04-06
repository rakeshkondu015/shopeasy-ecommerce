package com.ecommerce.controller;

import com.ecommerce.model.Cart;
import com.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<Cart>> getCart(Authentication auth) {
        return ResponseEntity.ok(cartService.getCartByUser(auth.getName()));
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestBody Map<String, Integer> body, Authentication auth) {
        Long productId = Long.valueOf(body.get("productId"));
        int quantity = body.getOrDefault("quantity", 1);
        return ResponseEntity.ok(cartService.addToCart(auth.getName(), productId, quantity));
    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<Cart> updateQuantity(@PathVariable Long cartItemId,
                                               @RequestBody Map<String, Integer> body,
                                               Authentication auth) {
        int quantity = body.get("quantity");
        return ResponseEntity.ok(cartService.updateQuantity(auth.getName(), cartItemId, quantity));
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<String> removeItem(@PathVariable Long cartItemId, Authentication auth) {
        cartService.removeFromCart(auth.getName(), cartItemId);
        return ResponseEntity.ok("Item removed");
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(Authentication auth) {
        cartService.clearCart(auth.getName());
        return ResponseEntity.ok("Cart cleared");
    }
}
