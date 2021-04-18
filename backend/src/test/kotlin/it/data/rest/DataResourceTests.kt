package it.data.rest

import dev.rfj.datasti.container.api.Container
import dev.rfj.datasti.data.api.DataService
import dev.rfj.datasti.error.ContainerNotFoundException
import dev.rfj.datasti.error.InsertionFailedException
import dev.rfj.datasti.error.UserUnknownException
import dev.rfj.datasti.util.TokenGenerationService
import io.quarkus.test.junit.QuarkusTest
import io.quarkus.test.junit.mockito.InjectMock
import io.restassured.RestAssured
import io.restassured.specification.RequestSpecification
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*
import util.randomContainer
import util.randomDataPoints
import util.randomDatapoint
import util.toJson
import javax.inject.Inject

const val VALID_CONTAINER_NAME = "test"
const val VALID_USER_NAME = "user"
val VALID_CONTAINER = Container().copy(
        name = VALID_CONTAINER_NAME,
        userId = VALID_USER_NAME
)

@QuarkusTest
class DataResourceTests {

    @InjectMock
    private lateinit var dataService: DataService

    @Inject
    private lateinit var tokenGenerationService: TokenGenerationService

    /* retrieve data - GET /container/$name */

    @Test
    fun testReceivingData() {
        val mockData = randomDataPoints()
        val container = randomContainer()

        `when`(dataService.getData(container))
                .thenReturn(mockData)

        createAuthenticatedRequest("user")
                .`when`().get("/container/${container.name}")
                .then()
                .statusCode(200)
    }

    private fun createAuthenticatedRequest(userId: String): RequestSpecification {
        val token = tokenGenerationService.generateJWTUserToken(userId)

        return RestAssured.given()
                .header("Authorization", "Bearer $token")
                .header("Content-Type", "application/json")
    }

    @Test
    fun testEmptyContainerNameReturns404() {
        createAuthenticatedRequest(VALID_USER_NAME)
                .`when`().get("/container//")
                .then()
                .statusCode(404)
    }

    @Test
    fun testUnauthenticatedRequestReturns401() {
        RestAssured.given()
                .auth().none()
                .`when`().get("/container/$VALID_CONTAINER_NAME")
                .then().statusCode(401)
    }

    @Test
    fun testUnknownUserResultsIn403() {
        val unknownContainer = Container().copy(
                name = VALID_CONTAINER_NAME,
                userId = VALID_USER_NAME
        )

        `when`(dataService.getData(unknownContainer))
                .thenThrow(UserUnknownException())

        createAuthenticatedRequest(VALID_USER_NAME)
                .`when`().get("/container/${unknownContainer.name}")
                .then().statusCode(403)
    }

    @Test
    fun testContainerNotFoundException() {
        val unknownContainer = Container().copy(
                name = "unknown",
                userId = VALID_USER_NAME
        )

        `when`(dataService.getData(unknownContainer))
                .thenThrow(ContainerNotFoundException())

        createAuthenticatedRequest(VALID_USER_NAME)
                .`when`().get("/container/${unknownContainer.name}")
                .then().statusCode(404)
    }

    @Test
    fun testInsertionFailureIsReturnedAs500() {
        val container = Container().copy(
                name = VALID_CONTAINER_NAME,
                userId = VALID_USER_NAME
        )

        `when`(dataService.getData(container))
                .thenThrow(InsertionFailedException())

        createAuthenticatedRequest(VALID_USER_NAME)
                .`when`().get("/container/${container.name}")
                .then().statusCode(500)
    }


    /* insert data - POST /container/$name */

    @Test
    fun testInsertWorksAndStripsID() {
        val data = randomDatapoint()
        val withoutID = data.copy(id = "")

        createAuthenticatedRequest(VALID_USER_NAME)
                .body(data.toJson())
                .`when`().post("/container/$VALID_CONTAINER_NAME")
                .then().statusCode(201)

        verify(dataService, times(1))
                .add(withoutID, VALID_CONTAINER)
    }

    @Test
    fun testUnauthenticatedReturns401() {
        RestAssured.given()
                .auth().none()
                .header("Content-Type", "application/json")
                .body(randomDatapoint().toJson())
                .`when`().post("/container/$VALID_CONTAINER_NAME")
                .then().statusCode(401)
    }

    @Test
    fun testEmptyBodyReturns400() {
        createAuthenticatedRequest(VALID_USER_NAME)
                .body("")
                .`when`().post("/container/$VALID_CONTAINER_NAME")
                .then().statusCode(400)
    }

    @Test
    fun testPostByUnknownUserResultsIn403() {
        val randomDatapoint = randomDatapoint().copy(id = "")
        val unknownContainer = Container().copy(
                name = VALID_CONTAINER_NAME,
                userId = VALID_USER_NAME
        )

        `when`(dataService.add(randomDatapoint, unknownContainer))
                .thenThrow(UserUnknownException())

        createAuthenticatedRequest(VALID_USER_NAME)
                .body(randomDatapoint.toJson())
                .`when`().post("/container/${unknownContainer.name}")
                .then().statusCode(403)
    }

    @Test
    fun testInvalidContainerIsNotFound() {
        val randomDatapoint = randomDatapoint().copy(id = "")
        val unknownContainer = Container().copy(
                name = "unknown",
                userId = VALID_USER_NAME
        )

        `when`(dataService.add(randomDatapoint, unknownContainer))
                .thenThrow(ContainerNotFoundException())

        createAuthenticatedRequest(VALID_USER_NAME)
                .body(randomDatapoint.toJson())
                .`when`().post("/container/${unknownContainer.name}")
                .then().statusCode(404)
    }
}