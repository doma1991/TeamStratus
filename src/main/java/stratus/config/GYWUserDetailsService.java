package stratus.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import stratus.DAO.User;
import stratus.data.UserRepository;

import java.util.Collection;
import java.util.Collections;

@Service
public class GYWUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    //Responsible for logging in and getting the logged in user's role
    @Override
    public UserDetails loadUserByUsername(String login) {
        final User user = userRepository.findByLogin(login);

        if (user == null) {
            throw new UsernameNotFoundException(login);
        }

        System.out.println("login successful for user = " + login);

        //Returns the role of the user as a GrantedAuthority object which the security framework can use
        UserDetails ud = new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                GrantedAuthority ga = new GrantedAuthority() {
                    @Override
                    //Obtains the role in string form
                    public String getAuthority() {
                        return user.getRole();}
                };
                return Collections.singleton(ga);
            }

            public String getPassword() {
                return user.getPassword();
            }

            public String getUsername() {
                return user.getLogin();
            }

            public boolean isAccountNonExpired() {
                return true;
            }

            public boolean isAccountNonLocked() {
                return true;
            }

            public boolean isCredentialsNonExpired() {
                return true;
            }

            public boolean isEnabled() {
                return true;
            }
        };
        return ud;
    }
}
