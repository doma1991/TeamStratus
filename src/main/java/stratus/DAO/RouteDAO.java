package stratus.DAO;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RouteDAO {
    public List<String> findAll();
    public boolean save(Route direction);
    public Route findRouteById(int id);
    public String updateCurrency(int id);

    //public Route findRouteById(int id)
}
