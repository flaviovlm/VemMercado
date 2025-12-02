package api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig implements WebMvcConfigurer {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){

        return new BCryptPasswordEncoder();
    }

    //isso daqui vai ser para o front
    //ele serve para liberar as rotas, metodos etc. loucura
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**") //esse daqui significa que vai liberar tudo (la ele)
                .allowedOrigins("*") //esse libera para qualquer pessoa conseguir usar (la ele tambem)
                .allowedMethods("GET", "POST", "PUT", "DELETE"); //e esse libera todos o métodos (um pouco auto explicativo)
    }

    // esse daqui é oq Carlos ensinou para liberar (la ele) o acesso na pagina, pois o Spring pede senha quando abre
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) //aqui ele vai desabilitar o pedido da senha
                // e esse permite utilizar todas as telas (LOGIN, CADASTRO, PRODUTOS etc) ta pesado :(
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }


}
