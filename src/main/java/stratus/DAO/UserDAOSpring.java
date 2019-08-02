package stratus.DAO;

import org.springframework.beans.factory.annotation.Autowired;
import stratus.data.UserRepository;

import java.util.ArrayList;
import java.util.List;


public class UserDAOSpring implements UserDAO {
    @Autowired
    private UserRepository userRepository;

    public List<String> findAll() {
        ArrayList<String> allUsers = new ArrayList<String>();
        for (User u : userRepository.findAll()) {
            allUsers.add(u.getFirstName());}
        return allUsers;
    }

    public boolean save(User user) {
        userRepository.save(user);
        return true;
    }



    @Override
    public List<User> getAllUsers() {
        List<User> allUsers = new ArrayList<User>();
        for (User u : userRepository.findAll()) {
            allUsers.add(u);
        }
        return allUsers;
    }

    @Override
    public boolean insertUser(User user) {
       userRepository.save(user);
        return true;
    }

    @Override
    public boolean deleteUser(User user) {
        for (User u : getAllUsers()) {
            if (u.getId() == user.getId()) {
                userRepository.delete(user);
                return true;
            }
        }
        return false;
    }

    public User findByLogin(String login) {
        User u;
        u = userRepository.findByLogin(login);
        return u;
    }


    @Override
    public User getUserById(int id) {

        return userRepository.findById(id).get();
    }

    // update method - NEEDS WORK! currently overwrites all data instead of updating individual fields
    public boolean update(User user) {
        for (User u : getAllUsers()) {
            if (u.getId() == user.getId()) {
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }


}


