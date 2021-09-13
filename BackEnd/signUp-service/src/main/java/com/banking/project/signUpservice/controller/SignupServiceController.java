package com.banking.project.signUpservice.controller;

import com.banking.project.signUpservice.entity.Customer;
import com.banking.project.signUpservice.rabbitConfig.MQConfig;
import com.banking.project.signUpservice.repository.CustomerRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/signup")
public class SignupServiceController {

    private Logger logger = LoggerFactory.getLogger(SignupServiceController.class);

    @Autowired
    private RabbitTemplate template;

    @Autowired
    private CustomerRepository customerRepository;


    /**
     * Metodo di registrazione utente in cui vengono inseriti tutti
     * i campi relativi al entity customer e inviati alla chiamata post
     * succisivamente viene inviato tramite la configurazione di rabbit
     * sulla coda dei messaggi
     * @param theCustomer
     */

    @PostMapping("")
    @Operation(summary = "Registrazione Correntista ", description = "Compilazione dati correntista")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Request Body Customer", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Boolean.class))}),
            @ApiResponse(responseCode = "400", description = "Email già registrata", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Boolean.class))}),
    })

    public boolean registerCustomer(@RequestBody Customer theCustomer) {

        logger.info("Register Customer");

        if ((customerRepository.getCustomerByEmail(theCustomer.getEmail())) != null) {

            return false;
//			modifica response richiesta dal frontend (non più necessaria eccezione custom)
//			throw new CustomerAlreadyExistException("Esiste già un account con quest'email: " + theCustomer.getEmail(),
//					HttpStatus.BAD_REQUEST);

        }
        theCustomer.setRole("ROLE_C");
        customerRepository.save(theCustomer);

        template.convertAndSend(MQConfig.EXCHANGE, MQConfig.ROUTING_KEY,
                customerRepository.getCustomerByEmail(theCustomer.getEmail()));
        return true;

    }
}
