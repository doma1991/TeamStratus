package stratus.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import stratus.DAO.User;
import stratus.DAO.UserDAO;

import java.util.List;

// Different routes specified using the @RequestMapping notation, GET requests can be done by visiting the URL as a user
// Browsers are incapble of POST and DELETE requests therefore a http request is required.
@RestController
public class UserController {

    @Autowired
    private UserDAO userDAO;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userDAO.getAllUsers();

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/users/restrict")
    public List<User> getSecureUsers() {
        return userDAO.getAllUsers();

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/users/register")
    @ResponseStatus(HttpStatus.CREATED)
    User newUser(@RequestBody User newUser) {
        System.out.println(newUser);
        newUser.encryptPassword(newUser.getPassword());
        userDAO.insertUser(newUser);

        return newUser;
    }


//    @DeleteMapping("users/{id}")
//    public void deleteUser(@PathVariable int id) {
//        try {
//            User u = userDAO.getUserById(id);
//            userDAO.deleteUser(u);
//        } catch (RuntimeException e) {
//            System.out.println(e.getMessage() + "No such user with ID " + id);
//        }
//
//    }
}
