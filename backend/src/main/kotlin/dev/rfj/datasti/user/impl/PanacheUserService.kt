package dev.rfj.datasti.user.impl

import dev.rfj.datasti.error.NameConflictException
import dev.rfj.datasti.user.api.User
import dev.rfj.datasti.user.api.UserService
import io.quarkus.elytron.security.common.BcryptUtil
import javax.enterprise.context.ApplicationScoped
import javax.transaction.Transactional

@ApplicationScoped
@Transactional
class PanacheUserService : UserService {

    override fun register(user: User) {
        if (isUserRegistered(user.username))
            throw NameConflictException()

        val entity = LoginEntity()
        entity.role = "user"
        entity.username = user.username
        entity.password = BcryptUtil.bcryptHash(user.password)
        entity.firstname = user.firstname
        entity.lastname = user.lastname
        entity.persist()
    }

    override fun isUserRegistered(username: String): Boolean =
            LoginEntity.findByUserName(username).isPresent
}
