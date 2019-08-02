package stratus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import stratus.API.Maps;
import stratus.DAO.Route;
import stratus.DAO.RouteDAO;
import stratus.DAO.UserDAO;

@SpringBootApplication

public class Application {
    private UserDAO userDao;
    private RouteDAO routeDao;

    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);

        ApplicationContext ctx = new AnnotationConfigApplicationContext("stratus");
        UserDAO userDao = ctx.getBean(UserDAO.class);
        RouteDAO routeDao = ctx.getBean(RouteDAO.class);

//        User dom = new User("Dominika", "Malinowska", "246 Priory Road", "Birmingham",
//                "B28 0SU", "dom", "password", "do_ma1991@hotmail.com",
//                "07904295900", "Admin", "photoLocation.jpeg", null );
//        User issi = new User("Dom", "DE", "246 Priory Road", "Birmingham",
//                "B28 0SU", "farhan", "password", "do_ma1991@hotmail.com",
//                "07904295900", 'A', null );
//        userDao.save(dom);
//        userDao.save(issi);
//
//        System.out.println(userDao.findAll());
//
//        Route home = new Route("jsonString", "Happy Street", "International House",
//                LocalDate.of(2019,07,25), true, 'B' , "Startlong",
//                "EndLong", "Endlat", "StartLat", "GBP", "QA",
//                Arrays.asList(userDao.findByLogin("farhan")));

//        routeDao.save(home);
//

        Route routeMaps= Maps.makeRoute("London", "Cambridge", "now",'d');
        routeDao.save( routeMaps );
        System.out.println(routeDao.findAll());
    }

}


