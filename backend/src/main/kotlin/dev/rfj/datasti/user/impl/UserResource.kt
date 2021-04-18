package dev.rfj.datasti.user.impl

import dev.rfj.datasti.error.NameConflictException
import dev.rfj.datasti.user.api.User
import dev.rfj.datasti.user.api.UserService
import dev.rfj.datasti.user.exception.CredentialsInvalidException
import dev.rfj.datasti.util.TokenGenerationService
import io.quarkus.security.identity.SecurityIdentity
import java.net.URI
import javax.annotation.security.PermitAll
import javax.annotation.security.RolesAllowed
import javax.enterprise.context.RequestScoped
import javax.ws.rs.*
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.NewCookie
import javax.ws.rs.core.Response

@Path("/user")
@RequestScoped
class UserResource(
        val userService: UserService,
        val tokenGenerationService: TokenGenerationService,
        var identity: SecurityIdentity
) {

    @Path("/token")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    fun generateToken(): Response {
        return try {
            Response.ok(tokenGenerationService.generateJWTUserToken(identity.principal.name)).build()
        } catch (e: CredentialsInvalidException) {
            Response.status(400).build();
        }
    }

    @Path("/register")
    @POST
    @PermitAll
    fun registerUser(
            @FormParam("firstname") firstname: String?,
            @FormParam("lastname") lastname: String?,
            @FormParam("username") username: String?,
            @FormParam("password") password: String?
    ): Response {
        if (isBlank(firstname) ||
                isBlank(lastname) ||
                isBlank(username) ||
                isBlank(password))
            return invalidRequest()

        return try {
            userService.register(User(
                firstname = firstname!!,
                lastname = lastname!!,
                username = username!!,
                password = password!!
            ))

            Response.status(302)
                .location(URI.create("/login"))
                .build()

        } catch (ex: NameConflictException) {
            Response.status(409).build()
        }
    }

    private fun isBlank(input: String?): Boolean {
        return input == null || input.isBlank()
    }

    private fun unauthorized(): Response {
        return Response.status(401).build()
    }

    private fun invalidRequest(): Response {
        return Response.status(400).build()
    }
}
