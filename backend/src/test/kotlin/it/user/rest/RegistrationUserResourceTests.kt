package it.user.rest

import dev.rfj.datasti.error.NameConflictException
import dev.rfj.datasti.user.api.UserService
import io.quarkus.test.junit.QuarkusTest
import io.quarkus.test.junit.mockito.InjectMock
import io.restassured.RestAssured
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.Mockito.times
import util.randomUser

@QuarkusTest
class RegistrationUserResourceTests {

    @InjectMock
    lateinit var mockUserService: UserService

    @Test
    fun testUserRegistration() {

        val user = randomUser()

        RestAssured.given()
                .param("username", user.username)
                .param("password", user.password)
                .param("firstname", user.firstname)
                .param("lastname", user.lastname)
                .`when`().post("/user/register")
                .then()
                .statusCode(302)

        Mockito.verify(mockUserService, times(1))
                .register(user)
    }

    @Test
    fun whenUserIdIsAlreadyRegisteredReturn409Conflict() {

        val user = randomUser()

        Mockito.`when`(mockUserService.register(user))
                .thenThrow(NameConflictException())

        RestAssured.given()
                .param("username", user.username)
                .param("password", user.password)
                .param("firstname", user.firstname)
                .param("lastname", user.lastname)
                .`when`().post("/user/register")
                .then()
                .statusCode(409)
    }

    @Test
    fun testThatMissingParamReturns400() {
        RestAssured.given()
                .param("username", "admin")
                // no password
                .`when`().post("/user/register")
                .then()
                .statusCode(400)

        RestAssured.given()
                // no username
                .param("password", "admin")
                .`when`().post("/user/register")
                .then()
                .statusCode(400)
    }
}
