package dev.rfj.datasti.container.impl

import dev.rfj.datasti.container.api.Container
import dev.rfj.datasti.container.api.ContainerService
import dev.rfj.datasti.container.repository.ContainerRepository
import dev.rfj.datasti.error.NameConflictException
import dev.rfj.datasti.error.UserUnknownException
import dev.rfj.datasti.user.api.UserService
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
internal class ContainerServiceImpl(
        private val containerRepository: ContainerRepository,
        private val userService: UserService
): ContainerService {

    override fun findByUserId(userId: String): Set<Container> {
        validateUserExists(userId)

        return containerRepository.findByUserId(userId)
    }

    override fun create(container: Container) {
        validateUserExists(container.userId)

        val existingContainers = containerRepository.findByUserId(container.userId)
        if (existingContainers.nameIsTaken(container.name))
            throw NameConflictException()

        containerRepository.save(container, container.userId)
    }

    private fun validateUserExists(userId: String) {
        if (!userService.isUserRegistered(userId))
            throw UserUnknownException(userId)
    }
}

private fun Set<Container>.nameIsTaken(name: String): Boolean {
    for (container in this) {
        if (container.name == name) return true
    }
    return false
}
