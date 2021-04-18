package dev.rfj.datasti.user.api

import dev.rfj.datasti.error.NameConflictException
import dev.rfj.datasti.error.UserUnknownException
import dev.rfj.datasti.user.exception.CredentialsInvalidException

interface UserService {

    /**
     * Register a given user id in the system
     * must be called before tokens may be generated
     *
     * @param user
     *  the input as User object
     * @throws NameConflictException
     *  if the user id is already in use
     */
    @Throws(NameConflictException::class)
    fun register(user: User)

    /**
     * Determine if a user with the given user id exists in the system
     *
     * @param username
     *  the user id to be queried
     * @return
     *  <code>true</code> it the user exists
     *  <code>false</code> otherwise
     */
    fun isUserRegistered(username: String): Boolean
}
