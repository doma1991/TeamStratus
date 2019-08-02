package stratus.DAO;

import java.util.List;

public interface UserDAO {
    public List<String> findAll();
    public boolean save(User user);
    public User findByLogin(String login);
    public List<User> getAllUsers();
    public boolean insertUser(User user);
    public boolean deleteUser(User user);
    public User getUserById(int id);
    public boolean update(User user);

}
