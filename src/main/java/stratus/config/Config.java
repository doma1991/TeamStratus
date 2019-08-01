package stratus.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalEntityManagerFactoryBean;
import stratus.DAO.RouteDAO;
import stratus.DAO.RouteDAOSpring;
import stratus.DAO.UserDAO;
import stratus.DAO.UserDAOSpring;

@Configuration
@EnableJpaRepositories("stratus.data")
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class})

public class Config {

    @Bean
    public UserDAO memberDao() { return new UserDAOSpring(); }

    @Bean
    public RouteDAO routeDao() { return (RouteDAO) new RouteDAOSpring(); }

    @Bean
    public LocalEntityManagerFactoryBean entityManagerFactory() {
        LocalEntityManagerFactoryBean em
                = new LocalEntityManagerFactoryBean();
        em.setPersistenceUnitName("users");
        return em;
    }

    @Bean
    public JpaTransactionManager transactionManager() {
        JpaTransactionManager manager = new JpaTransactionManager();
        return manager;
    }
}


//Do we need MI to show business value??