package dev.rfj.datasti.user.impl;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.security.jpa.Password;
import io.quarkus.security.jpa.Roles;
import io.quarkus.security.jpa.UserDefinition;
import io.quarkus.security.jpa.Username;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Optional;

@Entity
@Table(name = "\"datasti_user\"")
@UserDefinition
class LoginEntity extends PanacheEntity {

    @Username
    public String username;
    @Password
    public String password;
    @Roles
    public String role;
    public String firstname;
    public String lastname;

    public static Optional<LoginEntity> findByUserName(String username) {
        return LoginEntity.find("username", username).firstResultOptional();
    }
}
