package it.rest

import com.google.gson.Gson
import dev.rfj.datasti.container.api.Container
import dev.rfj.datasti.container.api.ContainerService
import dev.rfj.datasti.error.UserUnknownException
import dev.rfj.datasti.util.TokenGenerationService
import io.quarkus.test.junit.QuarkusTest
import io.quarkus.test.junit.mockito.InjectMock
import io.restassured.RestAssured
import io.restassured.http.ContentType
import io.restassured.parsing.Parser
import io.restassured.specification.RequestSpecification
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.Mockito.times
import util.randomContainer
import util.randomContainers
import util.toJson
import javax.inject.Inject

@QuarkusTest
class ContainerResourceTests {

    @InjectMock
    private lateinit var containerService: ContainerService

    @Inject
    private lateinit var tokenGenerationService: TokenGenerationService

    @BeforeEach
    fun setup() {
        RestAssured.defaultParser = Parser.JSON
    }

    @Test
    fun testGetContainers() {
        val randomContainers = randomContainers()

        Mockito.`when`(containerService.findByUserId("user"))
                .thenReturn(randomContainers)

        createAuthenticatedRequest("user")
                .`when`().get("/container")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
    }

    @Test
    fun testUnauthorizedAccessIsDenied() {
        RestAssured.given()
                .auth().none()
                .`when`().get("/container")
                .then()
                .statusCode(401)
    }

    private fun createAuthenticatedRequest(userId: String): RequestSpecification {
        val token = tokenGenerationService.generateJWTUserToken(userId)

        return RestAssured.given()
                .header("Authorization", "Bearer $token")
                .header("Content-Type", "application/json")
    }

    @Test
    fun testUserUnknown() {
        Mockito.doThrow(UserUnknownException())
                .`when`(containerService)
                .findByUserId("unknown-user")

        createAuthenticatedRequest("unknown-user")
                .`when`().get("/container")
                .then()
                .statusCode(403)
    }

    @Test
    fun testPostingContainers() {
        val username = "user"
        val randomContainer = randomContainer().copy(userId = username)

        createAuthenticatedRequest(username)
                .body(randomContainer.toJson())
                .`when`().post("/container")
                .then()
                .statusCode(201)

        Mockito.verify(containerService, times(1))
                .create(randomContainer)
    }

    @Test
    fun testPostingAsUnknownUser() {
        val randomContainer = randomContainer()
        Mockito.doThrow(UserUnknownException())
                .`when`(containerService)
                .create(randomContainer.copy(userId = "unknown-user"))

        createAuthenticatedRequest("unknown-user")
                .body(randomContainer.toJson())
                .`when`().post("/container")
                .then()
                .statusCode(403)
    }

    @Test
    fun testContainerCreationNeedsAuthentication() {
        RestAssured.given()
                .auth().none()
                .header("Content-Type", "application/json")
                .`when`().post("/container")
                .then()
                .statusCode(401)
    }
}