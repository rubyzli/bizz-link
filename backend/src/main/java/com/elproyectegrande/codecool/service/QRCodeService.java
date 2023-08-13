package com.elproyectegrande.codecool.service;

import com.elproyectegrande.codecool.auth.QRCodeResponse;
import com.elproyectegrande.codecool.model.User;
import com.elproyectegrande.codecool.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QRCodeService {
    private final UserRepository repository;
    private final JwtService jwtService;

    public ResponseEntity<QRCodeResponse> generate(String username){
        Optional<User> user = repository.findUserByUsernameIgnoreCase(username);
        User actualUser = user.get();
        QRCodeResponse response = new QRCodeResponse();
        response.setFirstname(actualUser.getFirstName());
        response.setLastname(actualUser.getLastName());
        response.setEmail(actualUser.getEmail());
        response.setPicture(actualUser.getPicture());
        response.setLinkedin(actualUser.getLinkedin());
        response.setFacebook(actualUser.getFacebook());

        String token = jwtService.generateToken(actualUser);
        response.setToken(token);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
