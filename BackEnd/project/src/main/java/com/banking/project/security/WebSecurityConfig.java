package com.banking.project.security;

import com.banking.project.dao.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
 
    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsServiceImpl();
    }
     
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
     
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
         
        return authProvider;
    }
 
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }
 
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	http.authorizeRequests()
		.antMatchers("/").permitAll()
		.antMatchers("/user").hasRole("C")
		.antMatchers("/admin").hasRole("D")
        .antMatchers("/home/bankAccount/accounts/**").hasRole("D")
        .antMatchers("/home/bankAccount/accounts/inactive").hasRole("D")
        .antMatchers("/home/bankAccount/accounts/closing").hasRole("D")
        .antMatchers("/home/bankAccount/myAccount/**").hasRole("C")
        .antMatchers("/account/**").hasAnyRole("D","C")
		.and()
		.formLogin().permitAll();
			//.loginPage("/login")
			//.loginProcessingUrl("")
//			.permitAll()
		//.and()
		//.logout().permitAll()
		//.and()
		//.exceptionHandling().accessDeniedPage(""");
	
}
}