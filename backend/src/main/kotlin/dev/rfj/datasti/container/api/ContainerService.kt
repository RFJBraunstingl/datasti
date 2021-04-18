package dev.rfj.datasti.container.api

import dev.rfj.datasti.error.InsertionFailedException
import dev.rfj.datasti.error.NameConflictException
import dev.rfj.datasti.error.UserUnknownException

/**
 * Interface to manage [Container]s for a user in datasti
 */
interface ContainerService {

    /**
     * Find all containers for a given user id
     *
     * @return
     *  the containers connected to the given user account
     * @throws UserUnknownException
     *  if the given user id does not exist
     */
    @Throws(UserUnknownException::class)
    fun findByUserId(userId: String): Set<Container>

    /**
     * create a new container and connect it to the given user account
     *
     * @throws UserUnknownException
     *  if the given user id does not exist
     * @throws NameConflictException
     *  if the given name is already in use by a container of the user
     * @throws InsertionFailedException
     *  if the insertion was not processed correctly by the backend
     */
    @Throws(UserUnknownException::class, NameConflictException::class, InsertionFailedException::class)
    fun create(container: Container)
}