package stratus.data;

import org.springframework.data.repository.CrudRepository;
import stratus.DAO.User;

public interface UserRepository extends CrudRepository<User, Integer> {
    public User findByLogin(String login);
}
