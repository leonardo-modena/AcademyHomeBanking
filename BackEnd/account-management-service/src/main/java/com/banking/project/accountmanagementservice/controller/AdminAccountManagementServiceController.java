package com.banking.project.accountmanagementservice.controller;

import com.banking.project.accountmanagementservice.entity.BankAccount;
import com.banking.project.accountmanagementservice.entity.BankAccountDTO;
import com.banking.project.accountmanagementservice.entity.Customer;
import com.banking.project.accountmanagementservice.exception.NotFoundException;
import com.banking.project.accountmanagementservice.exception.NotFoundResponse;
import com.banking.project.accountmanagementservice.repository.BankAccountRepository;
import com.banking.project.accountmanagementservice.repository.CustomerRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminAccountManagementServiceController {

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    private CustomerRepository customerRepository;




    @Operation(summary="Lista di conti con stato inattivo")
    @GetMapping(value = "/listInactiveAccounts")
    public List<BankAccountDTO> getInactive() {
        List<BankAccount> bankAccounts=bankAccountRepository.findInactive();

        List<BankAccountDTO> bankAccountDTOS=new ArrayList<>();
        for(BankAccount i:bankAccounts ){
            BankAccountDTO bankAccountDTO=new BankAccountDTO();
            bankAccountDTO.setId(i.getId());
            bankAccountDTO.setBalance(i.getBalance());
            bankAccountDTO.setAccount_status(i.getAccount_status());
            bankAccountDTO.setHolder(i.getHolder());
            bankAccountDTOS.add(bankAccountDTO);
        }
        return bankAccountDTOS;
    }

    @Operation(summary="Attivazione conto ", description="Dato un id conto viene attivato il conto ")
    @ApiResponses(value= {
            @ApiResponse(responseCode= "200", description = "Id valido, stato conto attivo "),
            @ApiResponse(responseCode="404", description = "Id conto non valido",content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = NotFoundResponse.class)) }),
    })

    @PutMapping(value = "/activeAccount/{accountId}")
    public void activeAccount(@PathVariable int accountId) {
        if(bankAccountRepository.existsById(accountId)) {
            bankAccountRepository.activeAccount(accountId);
        }
        else
            throw new NotFoundException("Conto non trovato", HttpStatus.NOT_FOUND);

    }

    @Operation(summary="Lista di conti con stato in chiusura")
    @GetMapping(value = "/listClosingAccounts")
    public List<BankAccountDTO> getClosing(){

        List<BankAccount> bankAccounts=bankAccountRepository.findClosing();
        List<BankAccountDTO>  bankAccount_DTOS=new ArrayList<>();


        for(BankAccount i:bankAccounts ){
            BankAccountDTO bankAccountDTO=new BankAccountDTO();
            bankAccountDTO.setId(i.getId());
            bankAccountDTO.setBalance(i.getBalance());
            bankAccountDTO.setAccount_status(i.getAccount_status());
            bankAccountDTO.setHolder(i.getHolder());
            bankAccount_DTOS.add(bankAccountDTO);
        }
        return bankAccount_DTOS;
    }


    @Operation(summary="Chiusura definitiva del conto ", description="Dato un id conto che è in stato di chiusura viene eliminato il conto ")
    @ApiResponses(value= {
            @ApiResponse(responseCode= "200", description = "Id valido, conto eliminato"),
            @ApiResponse(responseCode="404", description = "Id conto non valido",content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = NotFoundResponse.class)) }),
    })


    @DeleteMapping(value = "close/{accountId}")
    public void closeAccount(@PathVariable int accountId) {

        if(bankAccountRepository.existsById(accountId)) {
            BankAccount bankAccount = bankAccountRepository.getById(accountId);
            Customer customer = bankAccount.getHolder();
            if (bankAccountRepository.count(customer) == 1) {
                bankAccountRepository.deleteAccount(accountId);
                customerRepository.deleteAccount(customer);
            } else {
                bankAccountRepository.deleteAccount(accountId);
            }
        }
        else
            throw new NotFoundException("Conto non trovato", HttpStatus.NOT_FOUND);
    }

    @Operation(summary="Lista di correntisti ordinati in alfabetico")
    @GetMapping(value = "/listSortedCustomer")
    public List<Customer> getListCustomerSort() {

        return customerRepository.listSortCustomer();
    }

}
